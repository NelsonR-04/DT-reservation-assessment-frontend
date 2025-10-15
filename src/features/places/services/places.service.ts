import { API_CONFIG } from '@/config/api';
import { httpClient } from '@/shared/services/http-client';
import { Place } from '@/shared/types/entities';

export class PlacesService {
  private readonly baseUrl = API_CONFIG.endpoints.places;

  async getAll(): Promise<Place[]> {
    const response = await httpClient.get<Place[]>(this.baseUrl);
    return response.data;
  }

  async getById(id: number): Promise<Place> {
    const response = await httpClient.get<Place>(`${this.baseUrl}/${id}`);
    return response.data;
  }

  async create(place: Omit<Place, 'id' | 'createdAt' | 'updatedAt'>): Promise<Place> {
    const response = await httpClient.post<Place>(this.baseUrl, place);
    return response.data;
  }

  async update(
    id: number,
    place: Partial<Omit<Place, 'id' | 'createdAt' | 'updatedAt'>>,
  ): Promise<Place> {
    const response = await httpClient.put<Place>(`${this.baseUrl}/${id}`, place);
    return response.data;
  }

  async delete(id: number): Promise<void> {
    await httpClient.delete(`${this.baseUrl}/${id}`);
  }
}

export const placesService = new PlacesService();
