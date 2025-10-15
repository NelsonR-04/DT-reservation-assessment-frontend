import React from 'react';
import { Button } from '@/shared/components/ui/button';
import { Card } from '@/shared/components/ui/card';
import { Reservation } from '@/shared/types/entities';
import { formatDateLong, formatTime } from '@/shared/utils/format';

interface ReservationCardProps {
  reservation: Reservation;
  onDelete?: (id: number) => void;
  deleteLoading?: boolean;
}

const ReservationCard: React.FC<ReservationCardProps> = ({
  reservation,
  onDelete,
  deleteLoading = false,
}) => {
  const handleDelete = () => {
    if (onDelete) {
      onDelete(reservation.id);
    }
  };

  return (
    <Card>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {reservation.space?.name || `Espacio #${reservation.spaceId}`}
              </h3>
              <p className="text-sm text-gray-600">{reservation.clientEmail}</p>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-blue-600">ID: {reservation.id}</div>
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div>
              <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">Fecha</dt>
              <dd className="text-sm text-gray-900 mt-1">
                {formatDateLong(reservation.reservationDate)}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Hora de Inicio
              </dt>
              <dd className="text-sm text-gray-900 mt-1">{formatTime(reservation.startTime)}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Hora de Fin
              </dt>
              <dd className="text-sm text-gray-900 mt-1">{formatTime(reservation.endTime)}</dd>
            </div>
          </div>

          {/* Location */}
          {reservation.place && (
            <div className="mb-4">
              <p className="text-sm text-blue-600">📍 {reservation.place.location}</p>
            </div>
          )}

          {/* Space details */}
          {reservation.space && (
            <div className="mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.196-2.196M13 17.5h.01m-6.938 4.442c-.507-.507-.638-1.291-.65-2.442h-1c-.003-1.153-.143-1.935-.65-2.442C3.255 17.551 2.751 18 2 18v2h5v-.5zm0 0V21h2c.5 0 1.5-.5 1.5-1.5v-1c0-1-.5-1.5-1.5-1.5h-2z"
                  />
                </svg>
                Capacidad: {reservation.space.capacity} personas
              </div>
              {reservation.space.reference && (
                <p className="text-xs text-gray-500 mt-1">
                  Referencia: {reservation.space.reference}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Actions */}
        {onDelete && (
          <div className="mt-4 sm:mt-0 sm:ml-4">
            <Button
              size="sm"
              onClick={handleDelete}
              loading={deleteLoading}
              disabled={deleteLoading}
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Eliminar
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ReservationCard;
