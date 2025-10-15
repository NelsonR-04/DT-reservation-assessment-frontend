import { ERROR_MESSAGES, getErrorMessage, Language } from '@/shared/utils/errorMessages';

export const RESERVATION_MESSAGES = {
  ERRORS: {
    RESERVATION_NOT_FOUND: ERROR_MESSAGES.RESERVATION_NOT_FOUND,
    RESERVATION_CREATE_FAILED: ERROR_MESSAGES.RESERVATION_CREATE_FAILED,
    RESERVATION_UPDATE_FAILED: ERROR_MESSAGES.RESERVATION_UPDATE_FAILED,
    RESERVATION_DELETE_FAILED: ERROR_MESSAGES.RESERVATION_DELETE_FAILED,
    RESERVATION_FETCH_FAILED: ERROR_MESSAGES.RESERVATION_FETCH_FAILED,
    RESERVATION_SCHEDULING_CONFLICT: ERROR_MESSAGES.RESERVATION_SCHEDULING_CONFLICT,
    RESERVATION_MAX_LIMIT_REACHED: ERROR_MESSAGES.RESERVATION_MAX_LIMIT_REACHED,
    RESERVATION_INVALID_TIME: ERROR_MESSAGES.RESERVATION_INVALID_TIME,
    RESERVATION_MISSING_FIELDS: ERROR_MESSAGES.RESERVATION_MISSING_FIELDS,
  },
  SUCCESS: {
    CREATED: { en: 'Reservation created successfully', es: 'Reserva creada exitosamente' },
    UPDATED: { en: 'Reservation updated successfully', es: 'Reserva actualizada exitosamente' },
    DELETED: { en: 'Reservation deleted successfully', es: 'Reserva eliminada exitosamente' },
  },
} as const;

export const getReservationErrorMessage = (code: string, lang: Language = 'es'): string =>
  getErrorMessage(code, lang);
