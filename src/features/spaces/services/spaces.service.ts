import { API_CONFIG } from '@/config/api';
import { httpClient } from '@/shared/services/http-client';
import type { Space } from '@/shared/types/entities';

export class SpacesService {
  static async getAll(): Promise<Space[]> {
    const response = await httpClient.get<Space[]>(API_CONFIG.endpoints.spaces);
    return response.data;
  }

  static async getById(id: string): Promise<Space> {
    const response = await httpClient.get<Space>(`${API_CONFIG.endpoints.spaces}/${id}`);
    return response.data;
  }

  static async create(space: Omit<Space, 'id'>): Promise<Space> {
    const response = await httpClient.post<Space>(API_CONFIG.endpoints.spaces, space);
    return response.data;
  }

  static async update(id: string, space: Partial<Space>): Promise<Space> {
    const response = await httpClient.put<Space>(`${API_CONFIG.endpoints.spaces}/${id}`, space);
    return response.data;
  }

  static async delete(id: string): Promise<void> {
    await httpClient.delete(`${API_CONFIG.endpoints.spaces}/${id}`);
  }
}
