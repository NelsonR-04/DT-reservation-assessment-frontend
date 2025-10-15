import { API_CONFIG, API_HEADERS } from '@/config/api';
import { Space } from '@/shared/types/entities';

const BASE_URL = `${API_CONFIG.baseURL}${API_CONFIG.endpoints.spaces}`;

export const getAllSpaces = async (): Promise<Space[]> => {
  const response = await fetch(BASE_URL, {
    method: 'GET',
    headers: API_HEADERS,
  });

  if (!response.ok) {
    const error = await response.json();
    throw error;
  }

  return response.json();
};

export const getSpaceById = async (id: number): Promise<Space> => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'GET',
    headers: API_HEADERS,
  });

  if (!response.ok) {
    const error = await response.json();
    throw error;
  }

  return response.json();
};
