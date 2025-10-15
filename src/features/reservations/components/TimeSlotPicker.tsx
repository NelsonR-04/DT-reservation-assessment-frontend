'use client';

import React, { useEffect, useState } from 'react';
import { Reservation } from '@/shared/types/entities';
import { ReservationsService } from '../services/reservations.service';

interface TimeSlot {
  hour: number;
  minute: number;
  time: string;
  available: boolean;
}

interface TimeSlotPickerProps {
  selectedDate: string;
  spaceId: string;
  startTime: string;
  endTime: string;
  onStartTimeChange: (time: string) => void;
  onEndTimeChange: (time: string) => void;
}

export const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({
  selectedDate,
  spaceId,
  startTime,
  endTime,
  onStartTimeChange,
  onEndTimeChange,
}) => {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    generateTimeSlots();
  }, []);

  useEffect(() => {
    if (selectedDate && spaceId) {
      fetchReservations();
    }
  }, [selectedDate, spaceId]);

  useEffect(() => {
    if (reservations.length > 0) {
      updateSlotAvailability();
    }
  }, [reservations]);

  const generateTimeSlots = () => {
    const slots: TimeSlot[] = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 60) {
        const timeString = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
        slots.push({
          hour,
          minute,
          time: timeString,
          available: true,
        });
      }
    }
    setTimeSlots(slots);
  };

  const fetchReservations = async () => {
    if (!spaceId || !selectedDate) return;

    setLoading(true);
    try {
      const response = await ReservationsService.getAll({ page: 1, limit: 1000 });
      const filteredReservations = response.data.filter(
        reservation =>
          reservation.spaceId === parseInt(spaceId) &&
          reservation.reservationDate.split('T')[0] === selectedDate,
      );
      setReservations(filteredReservations);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateSlotAvailability = () => {
    setTimeSlots(prevSlots =>
      prevSlots.map(slot => {
        const slotStartTime = new Date(`${selectedDate}T${slot.time}:00`);
        const slotEndTime = new Date(slotStartTime);
        slotEndTime.setHours(slotEndTime.getHours() + 1);

        const isReserved = reservations.some(reservation => {
          const reservationStart = new Date(reservation.startTime);
          const reservationEnd = new Date(reservation.endTime);
          return (
            (slotStartTime >= reservationStart && slotStartTime < reservationEnd) ||
            (slotEndTime > reservationStart && slotEndTime <= reservationEnd) ||
            (slotStartTime <= reservationStart && slotEndTime >= reservationEnd)
          );
        });

        return {
          ...slot,
          available: !isReserved,
        };
      }),
    );
  };

  const handleSlotClick = (slot: TimeSlot) => {
    if (!slot.available) return;

    if (slot.time === startTime) {
      onStartTimeChange('');
      onEndTimeChange('');
      return;
    }

    const endHour = (slot.hour + 1) % 24;
    const endTimeString = `${String(endHour).padStart(2, '0')}:00`;

    onStartTimeChange(slot.time);
    onEndTimeChange(endTimeString);
  };

  const resetSelection = () => {
    onStartTimeChange('');
    onEndTimeChange('');
  };

  const isSelected = (slot: TimeSlot) => slot.time === startTime;

  if (!selectedDate || !spaceId) {
    return (
      <div className="text-center text-gray-500 py-8">
        Selecciona una fecha y un espacio para ver la disponibilidad
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-900">Selecciona una hora</h3>
          {startTime && (
            <p className="text-xs text-gray-600 mt-1">Hora seleccionada: {startTime}</p>
          )}
        </div>
        {startTime && (
          <button
            type="button"
            onClick={resetSelection}
            className="text-xs text-blue-600 hover:text-blue-700"
          >
            Reiniciar
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <svg className="animate-spin w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24">
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
        </div>
      ) : (
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 max-h-96 overflow-y-auto">
          {timeSlots.map(slot => {
            const selected = isSelected(slot);

            return (
              <button
                key={slot.time}
                type="button"
                onClick={() => handleSlotClick(slot)}
                disabled={!slot.available}
                className={`
                  px-2 py-2 text-xs rounded-md transition-all
                  ${
                    !slot.available
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-50'
                      : selected
                        ? 'bg-blue-600 text-white font-bold ring-2 ring-blue-400'
                        : 'bg-blue-50 text-blue-700 hover:bg-blue-100 cursor-pointer border border-blue-200'
                  }
                `}
              >
                {slot.time}
              </button>
            );
          })}
        </div>
      )}

      <div className="flex items-center gap-4 text-xs text-gray-600 pt-2 border-t">
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-blue-50 border border-blue-200 rounded" />
          <span>Disponible</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-gray-100 rounded opacity-50" />
          <span>Reservado</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-blue-600 rounded" />
          <span>Seleccionado</span>
        </div>
      </div>
    </div>
  );
};
