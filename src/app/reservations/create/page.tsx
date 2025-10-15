'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { TimeSlotPicker } from '@/features/reservations/components/TimeSlotPicker';
import {
  clearError as clearReservationsError,
  createReservation,
} from '@/features/reservations/store/reservationsSlice';
import { clearError as clearSpacesError, fetchSpaces } from '@/features/spaces/store/spacesSlice';
import { Button } from '@/shared/components/ui/button';
import { Calendar } from '@/shared/components/ui/calendar';
import { Card } from '@/shared/components/ui/card';
import { Field, FieldContent, FieldError, FieldLabel } from '@/shared/components/ui/field';
import { Input } from '@/shared/components/ui/input';
import { EMAIL_REGEX } from '@/shared/const/regex';
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';
import { CreateReservationRequest } from '@/shared/types/entities';
import {
  combineDateAndTime,
  createDateAtMidnight,
  dateToISOString,
  formatDateWithWeekday,
  getTodayAtMidnight,
} from '@/shared/utils/format';
import { getReservationErrorMessage } from '@/features/reservations/utils/messages';

interface FormData {
  spaceId: string;
  clientEmail: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
}

interface FormErrors {
  spaceId?: string;
  clientEmail?: string;
  startDate?: string;
  startTime?: string;
  endDate?: string;
  endTime?: string;
  general?: string;
}

const CreateReservationPage = () => {
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [showStartCalendar, setShowStartCalendar] = useState(false);

  const { push } = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  const {
    spaces,
    loading: spacesLoading,
    error: spacesError,
  } = useAppSelector(state => state.spaces);
  const { createLoading, error: reservationError } = useAppSelector(state => state.reservations);

  const [formData, setFormData] = useState<FormData>({
    spaceId: searchParams.get('spaceId') || '',
    clientEmail: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
  });

  useEffect(() => {
    dispatch(fetchSpaces());

    return () => {
      dispatch(clearSpacesError());
      dispatch(clearReservationsError());
    };
  }, [dispatch]);

  useEffect(() => {
    if (spacesError) {
      toast.error(getReservationErrorMessage(spacesError.code, 'es'));
    }
  }, [spacesError]);

  const validateEmail = (email: string): boolean => EMAIL_REGEX.test(email);

  const validateForm = (): FormErrors => {
    const errors: FormErrors = {};

    if (!formData.spaceId) {
      errors.spaceId = 'Selecciona un espacio';
    }

    if (!formData.clientEmail) {
      errors.clientEmail = 'El email es requerido';
    } else if (!validateEmail(formData.clientEmail)) {
      errors.clientEmail = 'Ingresa un email válido';
    }

    if (!formData.startDate) {
      errors.startDate = 'La fecha de inicio es requerida';
    }

    if (!formData.startTime) {
      errors.startTime = 'Selecciona una hora para la reserva';
    }

    if (formData.startDate && formData.startTime) {
      const startDateTime = combineDateAndTime(formData.startDate, formData.startTime);
      const now = new Date();

      if (startDateTime < now) {
        errors.startDate = 'La fecha de inicio debe ser futura';
      }
    }

    return errors;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Clear specific field error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleStartDateSelect = (date: Date | undefined) => {
    if (date) {
      const dateString = dateToISOString(date);
      handleInputChange('startDate', dateString);
      handleInputChange('endDate', dateString);
      setShowStartCalendar(false);
      handleInputChange('startTime', '');
      handleInputChange('endTime', '');
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('[data-calendar-container]')) {
        setShowStartCalendar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const errors = validateForm();
    setFormErrors(errors);

    try {
      const startDateTime = combineDateAndTime(formData.startDate, formData.startTime);
      const endDateTime = combineDateAndTime(formData.startDate, formData.endTime);

      const reservationData: CreateReservationRequest = {
        spaceId: parseInt(formData.spaceId),
        clientEmail: formData.clientEmail,
        reservationDate: formData.startDate,
        startTime: startDateTime.toISOString(),
        endTime: endDateTime.toISOString(),
      };

      await dispatch(createReservation(reservationData)).unwrap();

      toast.success('Reserva creada exitosamente');
      push('/reservations');
    } catch (error: any) {
      toast.error(getReservationErrorMessage(error.code, 'es') || 'Error al crear la reserva');
    }
  };

  const handleStartTimeChange = (time: string) => {
    handleInputChange('startTime', time);
    handleInputChange('startDate', formData.startDate);
    handleInputChange('endDate', formData.startDate);
  };

  const handleEndTimeChange = (time: string) => {
    handleInputChange('endTime', time);
    handleInputChange('endDate', formData.startDate);
  };

  const selectedSpace = spaces.find(space => space.id === parseInt(formData.spaceId));

  const selectedCalendarDate = formData.startDate
    ? createDateAtMidnight(formData.startDate)
    : undefined;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <Button asChild variant="ghost" className="mb-4">
          <Link href="/reservations">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Volver a Reservas
          </Link>
        </Button>

        <h1 className="text-2xl font-bold text-gray-900">Nueva Reserva</h1>
        <p className="text-gray-600 mt-1">
          Completa la información para reservar un espacio de coworking
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">Información de la Reserva</h2>

            {/* Space Selection */}
            <Field data-invalid={!!formErrors.spaceId}>
              <FieldContent>
                <FieldLabel htmlFor="spaceId">Espacio *</FieldLabel>
                {spacesLoading ? (
                  <div className="flex items-center py-3 px-4 border border-gray-300 rounded-md bg-gray-50">
                    <svg
                      className="animate-spin w-4 h-4 text-gray-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span className="text-gray-600">Cargando espacios...</span>
                  </div>
                ) : (
                  <select
                    id="spaceId"
                    value={formData.spaceId}
                    onChange={e => handleInputChange('spaceId', e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                    required
                  >
                    <option value="">Selecciona un espacio</option>
                    {spaces.map(space => (
                      <option key={space.id} value={space.id}>
                        {space.name} - {space.place.location} (Capacidad: {space.capacity})
                      </option>
                    ))}
                  </select>
                )}
                <FieldError>{formErrors.spaceId}</FieldError>
              </FieldContent>
            </Field>

            {/* Selected Space Info */}
            {selectedSpace && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-medium text-blue-900">{selectedSpace.name}</h3>
                <p className="text-sm text-blue-700 mt-1">
                  📍 {selectedSpace.place.location} • Capacidad: {selectedSpace.capacity} personas
                </p>
                {selectedSpace.description && (
                  <p className="text-sm text-blue-600 mt-2">{selectedSpace.description}</p>
                )}
              </div>
            )}

            {/* Client Email */}
            <Field data-invalid={!!formErrors.clientEmail}>
              <FieldContent>
                <FieldLabel htmlFor="clientEmail">Email del Cliente *</FieldLabel>
                <Input
                  id="clientEmail"
                  type="email"
                  value={formData.clientEmail}
                  onChange={e => handleInputChange('clientEmail', e.target.value)}
                  placeholder="cliente@ejemplo.com"
                  required
                />
                <FieldError>{formErrors.clientEmail}</FieldError>
              </FieldContent>
            </Field>

            {/* Date Selection */}
            <Field data-invalid={!!formErrors.startDate}>
              <FieldContent>
                <FieldLabel htmlFor="startDate">Fecha de Reserva *</FieldLabel>
                <div className="relative" data-calendar-container>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowStartCalendar(!showStartCalendar)}
                    className={`w-full justify-start text-left font-normal ${
                      !formData.startDate && 'text-muted-foreground'
                    }`}
                  >
                    <svg
                      className="mr-2 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {formatDateWithWeekday(formData.startDate)}
                  </Button>
                  {showStartCalendar && (
                    <div className="absolute top-full left-0 mt-2 z-50 rounded-md border bg-popover p-0 shadow-lg">
                      <Calendar
                        mode="single"
                        selected={selectedCalendarDate}
                        onSelect={handleStartDateSelect}
                        disabled={date => date < getTodayAtMidnight()}
                      />
                    </div>
                  )}
                </div>
              </FieldContent>
            </Field>

            {/* Time Slot Picker */}
            {formData.startDate && formData.spaceId && (
              <div className="border rounded-lg p-4 bg-gray-50">
                <TimeSlotPicker
                  selectedDate={formData.startDate}
                  spaceId={formData.spaceId}
                  startTime={formData.startTime}
                  endTime={formData.endTime}
                  onStartTimeChange={handleStartTimeChange}
                  onEndTimeChange={handleEndTimeChange}
                />
              </div>
            )}

            {/* Duration Info */}
            {formData.startDate && formData.startTime && formData.endTime && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <p className="text-sm text-gray-600">
                  <strong>Duración:</strong> 1 hora
                </p>
              </div>
            )}
          </div>
        </Card>

        {/* Submit Actions */}
        <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
          <Button asChild variant="secondary" className="sm:w-auto">
            <Link href="/reservations">Cancelar</Link>
          </Button>
          <Button type="submit" disabled={createLoading || spacesLoading} className="sm:w-auto">
            {createLoading ? (
              <>
                <svg className="animate-spin w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Creando Reserva...
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Crear Reserva
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateReservationPage;
