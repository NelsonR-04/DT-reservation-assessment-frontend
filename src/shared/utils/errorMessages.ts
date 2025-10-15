export const ERROR_MESSAGES = {
  RESERVATION_NOT_FOUND: {
    en: 'Reservation not found',
    es: 'Reserva no encontrada',
  },
  RESERVATION_CREATE_FAILED: {
    en: 'Failed to create reservation',
    es: 'Error al crear la reserva',
  },
  RESERVATION_UPDATE_FAILED: {
    en: 'Failed to update reservation',
    es: 'Error al actualizar la reserva',
  },
  RESERVATION_DELETE_FAILED: {
    en: 'Failed to delete reservation',
    es: 'Error al eliminar la reserva',
  },
  RESERVATION_FETCH_FAILED: {
    en: 'Failed to fetch reservations',
    es: 'Error al obtener las reservas',
  },
  RESERVATION_SCHEDULING_CONFLICT: {
    en: 'There is a scheduling conflict for this space',
    es: 'Existe un conflicto de horario para este espacio',
  },
  RESERVATION_MAX_LIMIT_REACHED: {
    en: 'Client has reached the maximum reservations per week',
    es: 'El cliente ha alcanzado el máximo de reservas por semana',
  },
  RESERVATION_INVALID_TIME: {
    en: 'End time must be after start time',
    es: 'La hora de fin debe ser posterior a la hora de inicio',
  },
  RESERVATION_MISSING_FIELDS: {
    en: 'Required fields are missing',
    es: 'Faltan campos requeridos',
  },

  SPACE_NOT_FOUND: {
    en: 'Space not found',
    es: 'Espacio no encontrado',
  },
  SPACE_CREATE_FAILED: {
    en: 'Failed to create space',
    es: 'Error al crear el espacio',
  },
  SPACE_UPDATE_FAILED: {
    en: 'Failed to update space',
    es: 'Error al actualizar el espacio',
  },
  SPACE_DELETE_FAILED: {
    en: 'Failed to delete space',
    es: 'Error al eliminar el espacio',
  },
  SPACE_FETCH_FAILED: {
    en: 'Failed to fetch spaces',
    es: 'Error al obtener los espacios',
  },
  SPACE_MISSING_FIELDS: {
    en: 'Required fields are missing',
    es: 'Faltan campos requeridos',
  },

  PLACE_NOT_FOUND: {
    en: 'Place not found',
    es: 'Lugar no encontrado',
  },
  PLACE_CREATE_FAILED: {
    en: 'Failed to create place',
    es: 'Error al crear el lugar',
  },
  PLACE_UPDATE_FAILED: {
    en: 'Failed to update place',
    es: 'Error al actualizar el lugar',
  },
  PLACE_DELETE_FAILED: {
    en: 'Failed to delete place',
    es: 'Error al eliminar el lugar',
  },
  PLACE_FETCH_FAILED: {
    en: 'Failed to fetch places',
    es: 'Error al obtener los lugares',
  },
  PLACE_MISSING_FIELDS: {
    en: 'Required fields are missing',
    es: 'Faltan campos requeridos',
  },

  INTERNAL_ERROR: {
    en: 'An unexpected error occurred',
    es: 'Ocurrió un error inesperado',
  },

  NETWORK_ERROR: {
    en: 'Network error. Please check your connection',
    es: 'Error de red. Por favor verifica tu conexión',
  },

  UNAUTHORIZED: {
    en: 'You are not authorized to perform this action',
    es: 'No estás autorizado para realizar esta acción',
  },

  FORBIDDEN: {
    en: 'Access forbidden',
    es: 'Acceso prohibido',
  },

  UNKNOWN_ERROR: {
    en: 'An unknown error occurred',
    es: 'Ocurrió un error desconocido',
  },
} as const;

export type ErrorCode = keyof typeof ERROR_MESSAGES;
export type Language = 'en' | 'es';

export const getErrorMessage = (code: string, lang: Language = 'es'): string => {
  const errorCode = code as ErrorCode;
  if (errorCode in ERROR_MESSAGES) {
    return ERROR_MESSAGES[errorCode][lang];
  }
  return ERROR_MESSAGES.UNKNOWN_ERROR[lang];
};

export const HTTP_STATUS_MESSAGES = {
  200: { en: 'Success', es: 'Éxito' },
  201: { en: 'Created successfully', es: 'Creado exitosamente' },
  204: { en: 'Deleted successfully', es: 'Eliminado exitosamente' },
  400: { en: 'Bad request', es: 'Solicitud inválida' },
  401: { en: 'Unauthorized', es: 'No autorizado' },
  403: { en: 'Forbidden', es: 'Prohibido' },
  404: { en: 'Not found', es: 'No encontrado' },
  409: { en: 'Conflict', es: 'Conflicto' },
  500: { en: 'Server error', es: 'Error del servidor' },
} as const;

export const getHttpStatusMessage = (status: number, lang: Language = 'es'): string => {
  if (status in HTTP_STATUS_MESSAGES) {
    return HTTP_STATUS_MESSAGES[status as keyof typeof HTTP_STATUS_MESSAGES][lang];
  }
  return HTTP_STATUS_MESSAGES[500][lang];
};
