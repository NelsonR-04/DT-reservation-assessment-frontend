import { API_CONFIG, API_HEADERS } from '@/config/api';
import type { ApiError, ApiResponse } from '@/shared/types/api';
import { getErrorMessage } from '@/shared/utils/errorMessages';

class HttpClientError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public code: string,
    public response?: ApiError,
  ) {
    super(message);
    this.name = 'HttpClientError';
  }
}

class HttpClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseURL: string, defaultHeaders: Record<string, string> = {}) {
    this.baseURL = baseURL;
    this.defaultHeaders = defaultHeaders;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const config: RequestInit = {
      ...options,
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);

      if (response.status === 204) {
        return { data: {} as T, success: true };
      }

      const data = await response.json();

      if (!response.ok) {
        const errorCode = data.code || 'UNKNOWN_ERROR';
        const errorMessage = getErrorMessage(errorCode, 'es');
        throw new HttpClientError(errorMessage, response.status, errorCode, data);
      }

      return { data, success: true };
    } catch (error) {
      if (error instanceof HttpClientError) {
        throw error;
      }
      const networkErrorMessage = getErrorMessage('NETWORK_ERROR', 'es');
      throw new HttpClientError(networkErrorMessage, 0, 'NETWORK_ERROR');
    }
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async put<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const httpClient = new HttpClient(API_CONFIG.baseURL, API_HEADERS);
export { HttpClientError };
