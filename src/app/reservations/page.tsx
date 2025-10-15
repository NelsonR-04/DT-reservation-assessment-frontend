'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {
  clearError,
  deleteReservation,
  fetchReservations,
  setPage,
} from '@/features/reservations/store/reservationsSlice';
import { Button } from '@/shared/components/ui/button';
import { Card } from '@/shared/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { PaginationControls } from '@/shared/components/ui/pagination-controls';
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';
import { formatDateLong, formatTime } from '@/shared/utils/format';

const ReservationsPage = () => {
  const dispatch = useAppDispatch();
  const {
    reservations,
    meta: pagination,
    loading,
    deleteLoading,
    error,
  } = useAppSelector(state => state.reservations);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedReservationId, setSelectedReservationId] = useState<number | null>(null);

  const currentPage = pagination?.page || 1;
  const itemsPerPage = pagination?.limit || 10;

  useEffect(() => {
    dispatch(fetchReservations({ page: currentPage, limit: itemsPerPage }));

    return () => {
      dispatch(clearError());
    };
  }, [dispatch, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
    dispatch(fetchReservations({ page, limit: itemsPerPage }));
  };

  const handleDeleteClick = (reservationId: number) => {
    setSelectedReservationId(reservationId);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedReservationId) {
      try {
        await dispatch(deleteReservation(selectedReservationId)).unwrap();
        setDeleteModalOpen(false);
        setSelectedReservationId(null);

        // Refetch data to update pagination if needed
        dispatch(fetchReservations({ page: currentPage, limit: itemsPerPage }));
      } catch (err) {
        console.error('Failed to delete reservation:', err);
      }
    }
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setSelectedReservationId(null);
  };

  const getStatusBadge = (startTime: string, endTime: string) => {
    const now = new Date();
    const start = new Date(startTime);
    const end = new Date(endTime);

    if (now < start) {
      return (
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
          Pendiente
        </span>
      );
    } else if (now >= start && now <= end) {
      return (
        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
          En Curso
        </span>
      );
    } else {
      return (
        <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
          Finalizada
        </span>
      );
    }
  };

  if (loading && reservations.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Mis Reservas</h1>
          <Button asChild>
            <Link href="/reservations/create">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Nueva Reserva
            </Link>
          </Button>
        </div>

        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <svg
              className="animate-spin w-8 h-8 text-blue-600 mx-auto mb-2"
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
            <p className="text-gray-600">Cargando reservas...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Mis Reservas</h1>
          <Button asChild>
            <Link href="/reservations/create">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Nueva Reserva
            </Link>
          </Button>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex">
            <svg
              className="w-6 h-6 text-red-400 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <h3 className="text-lg font-medium text-red-800">Error al cargar reservas</h3>
              <p className="text-sm text-red-700 mt-1">{typeof error === 'string' ? error : error?.message}</p>
              <div className="mt-4">
                <Button
                  onClick={() =>
                    dispatch(fetchReservations({ page: currentPage, limit: itemsPerPage }))
                  }
                  size="sm"
                  variant="secondary"
                >
                  Reintentar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mis Reservas</h1>
          {pagination && (
            <p className="text-sm text-gray-600 mt-1">
              {pagination.total} reserva{pagination.total !== 1 ? 's' : ''} en total
            </p>
          )}
        </div>
        <Button asChild>
          <Link href="/reservations/create">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Nueva Reserva
          </Link>
        </Button>
      </div>

      {/* Reservations List */}
      {reservations.length === 0 ? (
        <div className="text-center py-12">
          <svg
            className="w-12 h-12 text-gray-300 mx-auto mb-4"
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
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tienes reservas</h3>
          <p className="text-gray-600 mb-4">
            Comienza reservando un espacio para tu próxima reunión o evento.
          </p>
          <Button asChild>
            <Link href="/reservations/create">Crear mi primera reserva</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {reservations?.map(reservation => (
            <Card key={reservation.id}>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {reservation?.space?.name}
                    </h3>
                    {getStatusBadge(reservation.startTime, reservation.endTime)}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2"
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
                      <span>{formatDateLong(reservation.startTime)}</span>
                    </div>

                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>
                        {formatTime(reservation.startTime)} - {formatTime(reservation.endTime)}
                      </span>
                    </div>

                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span>{reservation.space?.place?.location}</span>
                    </div>

                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <span>Capacidad: {reservation.space?.capacity}</span>
                    </div>

                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <span>{reservation.clientEmail}</span>
                    </div>

                    <div className="flex items-center">
                      <span className="text-gray-500">ID: {reservation.id}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="ml-6 flex items-center space-x-2">
                  <Button asChild variant="secondary" size="sm">
                    <Link href={`/spaces/${reservation.spaceId}`}>Ver Espacio</Link>
                  </Button>
                  <Button
                    onClick={() => handleDeleteClick(reservation.id)}
                    variant="secondary"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    disabled={deleteLoading}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center">
          <PaginationControls
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Eliminación</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-gray-600">
              ¿Estás seguro de que deseas eliminar esta reserva? Esta acción no se puede deshacer.
            </p>
            <DialogFooter>
              <Button variant="secondary" onClick={handleCancelDelete} disabled={deleteLoading}>
                Cancelar
              </Button>
              <Button
                onClick={handleConfirmDelete}
                disabled={deleteLoading}
                className="bg-red-600 hover:bg-red-700"
              >
                {deleteLoading ? (
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
                    Eliminando...
                  </>
                ) : (
                  'Eliminar Reserva'
                )}
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReservationsPage;
