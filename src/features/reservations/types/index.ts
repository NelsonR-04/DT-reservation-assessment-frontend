import { Reservation } from '@/shared/types/entities';

export interface ReservationFormData {
  espacioId: string;
  emailCliente: string;
  fechaReserva: string;
  horaInicio: string;
  horaFin: string;
}

export interface ReservationFilters {
  espacioId?: string;
  emailCliente?: string;
  fechaInicio?: string;
  fechaFin?: string;
}

export interface ReservationsState {
  reservations: Reservation[];
  selectedReservation: Reservation | null;
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  } | null;
  loading: boolean;
  error: { message: string; code: string } | null;
  createLoading: boolean;
  deleteLoading: boolean;
}