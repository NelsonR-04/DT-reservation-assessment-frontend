import Link from 'next/link';
import React from 'react';
import { Button } from '@/shared/components/ui/button';
import { Card } from '@/shared/components/ui/card';
import { Space } from '@/shared/types/entities';

interface SpaceCardProps {
  space: Space;
}

const SpaceCard: React.FC<SpaceCardProps> = ({ space }) => (
  <Card className="h-full transition-all duration-200 hover:shadow-md">
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{space.name}</h3>
            {space.reference && (
              <p className="text-sm text-gray-500 mb-2">Ref: {space.reference}</p>
            )}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.196-2.196M13 17.5h.01m-6.938 4.442c-.507-.507-.638-1.291-.65-2.442h-1c-.003-1.153-.143-1.935-.65-2.442C3.255 17.551 2.751 18 2 18v2h5v-.5zm0 0V21h2c.5 0 1.5-.5 1.5-1.5v-1c0-1-.5-1.5-1.5-1.5h-2z"
              />
            </svg>
            {space.capacity} personas
          </div>
        </div>

        {space.place && <p className="text-sm text-blue-600 mb-2">📍 {space.place.location}</p>}
      </div>

      {/* Description */}
      {space.description && (
        <div className="mb-4 flex-grow">
          <p className="text-sm text-gray-600 line-clamp-3">{space.description}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-2 mt-auto">
        <Button asChild variant="default" size="sm" className="flex-1">
          <Link href={`/spaces/${space.id}`}>Ver Detalles</Link>
        </Button>
        <Button asChild variant="secondary" size="sm" className="flex-1">
          <Link href={`/reservations/create?spaceId=${space.id}`}>Reservar</Link>
        </Button>
      </div>
    </div>
  </Card>
);

export default SpaceCard;
