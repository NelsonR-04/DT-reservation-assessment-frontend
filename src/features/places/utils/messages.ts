import { ERROR_MESSAGES, getErrorMessage, Language } from '@/shared/utils/errorMessages';

export const PLACE_MESSAGES = {
  ERRORS: {
    NOT_FOUND: ERROR_MESSAGES.PLACE_NOT_FOUND,
    CREATE_FAILED: ERROR_MESSAGES.PLACE_CREATE_FAILED,
    UPDATE_FAILED: ERROR_MESSAGES.PLACE_UPDATE_FAILED,
    DELETE_FAILED: ERROR_MESSAGES.PLACE_DELETE_FAILED,
    FETCH_FAILED: ERROR_MESSAGES.PLACE_FETCH_FAILED,
    MISSING_FIELDS: ERROR_MESSAGES.PLACE_MISSING_FIELDS,
  },
  SUCCESS: {
    CREATED: { en: 'Place created successfully', es: 'Lugar creado exitosamente' },
    UPDATED: { en: 'Place updated successfully', es: 'Lugar actualizado exitosamente' },
    DELETED: { en: 'Place deleted successfully', es: 'Lugar eliminado exitosamente' },
  },
} as const;

export const getPlaceErrorMessage = (code: string, lang: Language = 'es'): string =>
  getErrorMessage(code, lang);
