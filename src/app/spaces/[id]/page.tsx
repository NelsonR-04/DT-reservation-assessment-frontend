'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import {
  clearError,
  clearSelectedSpace,
  fetchSpaceById,
} from '@/features/spaces/store/spacesSlice';
import { Button } from '@/shared/components/ui/button';
import { Card } from '@/shared/components/ui/card';
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';
import { formatDateShort } from '@/shared/utils/format';

const SpaceDetailsPage = () => {
  const params = useParams();
  const { back } = useRouter();
  const dispatch = useAppDispatch();
  const { selectedSpace, loading, error } = useAppSelector(state => state.spaces);

  const spaceId = parseInt(params.id as string);

  useEffect(() => {
    if (spaceId && !isNaN(spaceId)) {
      dispatch(fetchSpaceById(spaceId));
    }

    return () => {
      dispatch(clearSelectedSpace());
      dispatch(clearError());
    };
  }, [dispatch, spaceId]);

  const handleRetry = () => {
    if (spaceId && !isNaN(spaceId)) {
      dispatch(fetchSpaceById(spaceId));
    }
  };

  const handleBackClick = () => back();

  if (loading) {
    return (
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
          <p className="text-gray-600">Cargando detalles del espacio...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <Button onClick={handleBackClick} variant="ghost">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Volver
        </Button>

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
              <h3 className="text-lg font-medium text-red-800">Error al cargar el espacio</h3>
              <p className="text-sm text-red-700 mt-1">{typeof error === 'string' ? error : error?.message}</p>
              <div className="mt-4">
                <Button onClick={handleRetry} size="sm" variant="secondary">
                  Reintentar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!selectedSpace) {
    return (
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
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Espacio no encontrado</h3>
        <p className="text-gray-600">El espacio que buscas no existe o no está disponible.</p>
        <Button asChild className="mt-4">
          <Link href="/spaces">Ver Espacios Disponibles</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button onClick={handleBackClick} variant="ghost">
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Volver a Espacios
      </Button>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Space Details */}
        <div className="lg:col-span-2">
          <Card>
            <div className="space-y-6">
              {/* Header */}
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{selectedSpace.name}</h1>
                    {selectedSpace.reference && (
                      <p className="text-sm text-gray-500 mt-1">
                        Referencia: {selectedSpace.reference}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-blue-600">ID: {selectedSpace.id}</div>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center text-blue-600">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                <span className="font-medium">{selectedSpace.place.location}</span>
              </div>

              {/* Capacity */}
              <div className="flex items-center">
                <span className="text-gray-900">
                  Capacidad para <strong>{selectedSpace.capacity}</strong> personas
                </span>
              </div>

              {/* Description */}
              {selectedSpace.description && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Descripción</h3>
                  <p className="text-gray-600 leading-relaxed">{selectedSpace.description}</p>
                </div>
              )}

              {/* Place Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Información del Lugar</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">{selectedSpace.place.name}</h4>
                  <p className="text-sm text-gray-600">📍 {selectedSpace.place.location}</p>
                </div>
              </div>

              {/* Metadata */}
              <div className="border-t pt-4">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Información Adicional</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <span className="text-gray-500">Creado:</span>{' '}
                    {formatDateShort(selectedSpace.createdAt)}
                  </div>
                  <div>
                    <span className="text-gray-500">Actualizado:</span>{' '}
                    {formatDateShort(selectedSpace.updatedAt)}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Actions Sidebar */}
        <div className="space-y-4">
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Acciones</h3>
            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link href={`/reservations/create?spaceId=${selectedSpace.id}`}>
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
                  Reservar Ahora
                </Link>
              </Button>
              <Button asChild variant="secondary" className="w-full">
                <Link href="/spaces">
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
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  Ver Otros Espacios
                </Link>
              </Button>
            </div>
          </Card>

          {/* Quick Info */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Información Rápida</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Capacidad:</span>
                <span className="font-medium text-gray-900">{selectedSpace.capacity} personas</span>
              </div>
              {selectedSpace.reference && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Referencia:</span>
                  <span className="font-medium text-gray-900">{selectedSpace.reference}</span>
                </div>
              )}
              <div className="flex items-start justify-between">
                <span className="text-gray-600">Ubicación:</span>
                <span className="font-medium text-gray-900 text-right">
                  {selectedSpace.place.location}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SpaceDetailsPage;
