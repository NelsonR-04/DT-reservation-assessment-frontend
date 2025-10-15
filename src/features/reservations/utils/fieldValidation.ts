import { CreateReservationRequest } from '@/shared/types/entities';
import { EMAIL_REGEX } from '@/shared/const/regex';

export const validateReservationForm = (formData: CreateReservationRequest): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!formData.spaceId) {
    errors.spaceId = 'Selecciona un espacio';
  }

  if (!formData.clientEmail) {
    errors.clientEmail = 'El email es requerido';
  } else if (!EMAIL_REGEX.test(formData.clientEmail)) {
    errors.clientEmail = 'Email inválido';
  }

  if (!formData.reservationDate) {
    errors.reservationDate = 'La fecha es requerida';
  } else {
    const selectedDate = new Date(formData.reservationDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      errors.reservationDate = 'La fecha no puede ser en el pasado';
    }
  }

  if (!formData.startTime) {
    errors.startTime = 'La hora de inicio es requerida';
  }

  if (!formData.endTime) {
    errors.endTime = 'La hora de fin es requerida';
  }

  if (formData.startTime && formData.endTime) {
    const start = new Date(`2000-01-01T${formData.startTime}`);
    const end = new Date(`2000-01-01T${formData.endTime}`);
    if (end <= start) {
      errors.endTime = 'La hora de fin debe ser posterior a la de inicio';
    }
  }

  return errors;
};