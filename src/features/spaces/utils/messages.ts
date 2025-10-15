import { ERROR_MESSAGES, getErrorMessage, Language } from '@/shared/utils/errorMessages';

export const SPACE_MESSAGES = {
  ERRORS: {
    NOT_FOUND: ERROR_MESSAGES.SPACE_NOT_FOUND,
    CREATE_FAILED: ERROR_MESSAGES.SPACE_CREATE_FAILED,
    UPDATE_FAILED: ERROR_MESSAGES.SPACE_UPDATE_FAILED,
    DELETE_FAILED: ERROR_MESSAGES.SPACE_DELETE_FAILED,
    FETCH_FAILED: ERROR_MESSAGES.SPACE_FETCH_FAILED,
    MISSING_FIELDS: ERROR_MESSAGES.SPACE_MISSING_FIELDS,
  },
  SUCCESS: {
    CREATED: { en: 'Space created successfully', es: 'Espacio creado exitosamente' },
    UPDATED: { en: 'Space updated successfully', es: 'Espacio actualizado exitosamente' },
    DELETED: { en: 'Space deleted successfully', es: 'Espacio eliminado exitosamente' },
  },
} as const;

export const getSpaceErrorMessage = (code: string, lang: Language = 'es'): string =>
  getErrorMessage(code, lang);
