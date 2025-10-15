export * from '@/shared/types/entities';

export interface SpaceFormData {
  nombre: string;
  lugarId: string;
  referencia?: string;
  capacidad: number;
  descripcion?: string;
}

export interface SpaceFilters {
  lugarId?: string;
  capacidadMin?: number;
  capacidadMax?: number;
  search?: string;
}
