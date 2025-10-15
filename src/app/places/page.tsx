'use client';

import React, { useEffect } from 'react';
import PlaceCard from '@/features/places/components/PlaceCard';
import { clearError, fetchPlaces } from '@/features/places/store/placesSlice';
import { Button } from '@/shared/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';

const LugaresPage = () => {
  const dispatch = useAppDispatch();
  const { places, loading, error } = useAppSelector(state => state.places);

  useEffect(() => {
    dispatch(fetchPlaces());

    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleRetry = () => dispatch(fetchPlaces());

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Lugares Disponibles</h1>
          <p className="text-gray-600 mt-2">
            Gestiona y explora todas las ubicaciones de CoWork Space
          </p>
        </div>
        <Button onClick={handleRetry} disabled={loading}>
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Actualizar
        </Button>
      </div>

      {loading && (
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
            <p className="text-gray-600">Cargando lugares...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <svg
              className="w-5 h-5 text-red-400 mr-2"
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
              <h3 className="text-sm font-medium text-red-800">Error al cargar lugares</h3>
              <p className="text-sm text-red-700 mt-1">{typeof error === 'string' ? error : error?.message}</p>
              <div className="mt-3">
                <Button onClick={handleRetry} size="sm" variant="secondary">
                  Reintentar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {!loading && !error && places?.length === 0 && (
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
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hay lugares disponibles</h3>
          <p className="text-gray-600">No se encontraron lugares para mostrar en este momento.</p>
        </div>
      )}

      {!loading && !error && places?.length > 0 && (
        <div>
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              Mostrando {places.length} lugar{places.length !== 1 ? 'es' : ''}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {places.map(place => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LugaresPage;
