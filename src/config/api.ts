export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  apiKey: process.env.NEXT_PUBLIC_API_KEY || '',
  endpoints: {
    spaces: '/espacios',
    reservations: '/reservas',
    places: '/lugares',
    health: '/health',
  },
} as const;

export const API_HEADERS = {
  'Content-Type': 'application/json',
  'x-api-key': API_CONFIG.apiKey,
};
