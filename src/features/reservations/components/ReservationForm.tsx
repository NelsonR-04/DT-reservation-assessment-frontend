import React, { useEffect, useState } from 'react';
import { Button } from '@/shared/components/ui/button';
import { Card } from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import { CreateReservationRequest, Space } from '@/shared/types/entities';
import { validateReservationForm } from '../utils/fieldValidation';

interface ReservationFormProps {
  spaces: Space[];
  onSubmit: (data: CreateReservationRequest) => void;
  loading?: boolean;
  error?: string | { message: string; code: string } | null;
  initialSpaceId?: number;
}

const ReservationForm: React.FC<ReservationFormProps> = ({
  spaces,
  onSubmit,
  loading = false,
  error,
  initialSpaceId,
}) => {
  const [formData, setFormData] = useState<CreateReservationRequest>({
    spaceId: initialSpaceId || 0,
    clientEmail: '',
    reservationDate: '',
    startTime: '',
    endTime: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialSpaceId) {
      setFormData(prev => ({ ...prev, spaceId: initialSpaceId }));
    }
  }, [initialSpaceId]);

  const validateForm = (): boolean => {
    const newErrors = validateReservationForm(formData);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Convert time to full datetime strings
      const reservationDate = new Date(formData.reservationDate);
      const [startHour, startMinute] = formData.startTime.split(':');
      const [endHour, endMinute] = formData.endTime.split(':');

      const startDateTime = new Date(reservationDate);
      startDateTime.setHours(parseInt(startHour), parseInt(startMinute), 0, 0);

      const endDateTime = new Date(reservationDate);
      endDateTime.setHours(parseInt(endHour), parseInt(endMinute), 0, 0);

      onSubmit({
        spaceId: formData.spaceId,
        clientEmail: formData.clientEmail,
        reservationDate: reservationDate.toISOString(),
        startTime: startDateTime.toISOString(),
        endTime: endDateTime.toISOString(),
      });
    }
  };

  const handleChange =
    (field: keyof CreateReservationRequest) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = field === 'spaceId' ? parseInt(e.target.value) : e.target.value;
      setFormData(prev => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: '' }));
      }
    };

  const selectedSpace = spaces.find(space => space.id === formData.spaceId);

  return (
    <Card>
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Nueva Reserva</h2>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{typeof error === 'string' ? error : error?.message}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Space Selection */}
        <div>
          <label htmlFor='spaceId' className="block text-sm font-medium text-gray-700 mb-2">Espacio *</label>
          <select
            id="spaceId"
            value={formData.spaceId}
            onChange={handleChange('spaceId')}
            className={`block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.spaceId ? 'border-red-300' : 'border-gray-300'
            }`}
          >
            <option value={0}>Selecciona un espacio</option>
            {spaces.map(space => (
              <option key={space.id} value={space.id}>
                {space.name} - {space.place.location} (Capacidad: {space.capacity})
              </option>
            ))}
          </select>
          {errors.spaceId && <p className="mt-1 text-sm text-red-600">{errors.spaceId}</p>}
        </div>

        {/* Selected Space Details */}
        {selectedSpace && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">{selectedSpace.name}</h4>
            <div className="text-sm text-blue-800 space-y-1">
              <p>📍 {selectedSpace.place.location}</p>
              <p>👥 Capacidad: {selectedSpace.capacity} personas</p>
              {selectedSpace.reference && <p>🔗 Ref: {selectedSpace.reference}</p>}
              {selectedSpace.description && <p>📝 {selectedSpace.description}</p>}
            </div>
          </div>
        )}

        {/* Client Email */}
        <div>
          <label htmlFor='email' className="block text-sm font-medium text-gray-700 mb-2">Email del Cliente *</label>
          <Input
            id="email"
            type="email"
            value={formData.clientEmail}
            onChange={handleChange('clientEmail')}
            placeholder="cliente@ejemplo.com"
            aria-invalid={!!errors.clientEmail}
          />
          {errors.clientEmail && <p className="mt-1 text-sm text-red-600">{errors.clientEmail}</p>}
        </div>

        {/* Reservation Date */}
        <div>
          <label htmlFor='date' className="block text-sm font-medium text-gray-700 mb-2">Fecha de Reserva *</label>
          <Input
            id="date"
            type="date"
            value={formData.reservationDate}
            onChange={handleChange('reservationDate')}
            min={new Date().toISOString().split('T')[0]}
            aria-invalid={!!errors.reservationDate}
          />
          {errors.reservationDate && <p className="mt-1 text-sm text-red-600">{errors.reservationDate}</p>}
        </div>

        {/* Time Range */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor='time' className="block text-sm font-medium text-gray-700 mb-2">Hora de Inicio *</label>
            <Input
              id="time"
              type="time"
              value={formData.startTime}
              onChange={handleChange('startTime')}
              aria-invalid={!!errors.startTime}
            />
            {errors.startTime && <p className="mt-1 text-sm text-red-600">{errors.startTime}</p>}
          </div>
          <div>
            <label htmlFor='end-time' className="block text-sm font-medium text-gray-700 mb-2">Hora de Fin *</label>
            <Input
              id="end-time"
              type="time"
              value={formData.endTime}
              onChange={handleChange('endTime')}
              aria-invalid={!!errors.endTime}
            />
            {errors.endTime && <p className="mt-1 text-sm text-red-600">{errors.endTime}</p>}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-3">
          <Button type="submit" loading={loading} disabled={loading} size="lg">
            Crear Reserva
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default ReservationForm;
