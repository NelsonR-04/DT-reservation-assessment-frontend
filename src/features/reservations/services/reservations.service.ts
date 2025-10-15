import { API_CONFIG } from '@/config/api';
import { httpClient } from '@/shared/services/http-client';
import type { PaginatedResponse, PaginationParams } from '@/shared/types/api';
import type {
  CreateReservationRequest,
  Reservation,
  UpdateReservationRequest,
} from '@/shared/types/entities';

export class ReservationsService {
  static async getAll(params?: PaginationParams): Promise<PaginatedResponse<Reservation>> {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.limit) searchParams.set('limit', params.limit.toString());

    const endpoint = `${API_CONFIG.endpoints.reservations}${
      searchParams.toString() ? `?${searchParams.toString()}` : ''
    }`;

    const response = await httpClient.get<PaginatedResponse<Reservation>>(endpoint);
    return response.data;
  }

  static async getById(id: number): Promise<Reservation> {
    const response = await httpClient.get<Reservation>(
      `${API_CONFIG.endpoints.reservations}/${id}`,
    );
    return response.data;
  }

  static async create(reservation: CreateReservationRequest): Promise<Reservation> {
    const response = await httpClient.post<Reservation>(
      API_CONFIG.endpoints.reservations,
      reservation,
    );
    return response.data;
  }

  static async update(
    id: string,
    reservation: Partial<UpdateReservationRequest>,
  ): Promise<Reservation> {
    const response = await httpClient.put<Reservation>(
      `${API_CONFIG.endpoints.reservations}/${id}`,
      reservation,
    );
    return response.data;
  }

  static async delete(id: number): Promise<void> {
    await httpClient.delete(`${API_CONFIG.endpoints.reservations}/${id}`);
  }
}
