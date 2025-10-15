export const formatDateShort = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

export const formatDateLong = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatDateWithWeekday = (dateString: string): string => {
  if (!dateString) return 'Selecciona una fecha';
  const date = new Date(dateString + 'T00:00:00');
  return date.toLocaleDateString('es-ES', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

export const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatTimeFromString = (timeString: string): string => timeString.slice(0, 5);

export const formatDateForInput = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

export const dateToISOString = (date: Date): string => date.toISOString().split('T')[0];

export const combineDateAndTime = (dateString: string, timeString: string): Date =>
  new Date(`${dateString}T${timeString}:00`);

export const createDateAtMidnight = (dateString: string): Date =>
  new Date(dateString + 'T00:00:00');

export const getTodayAtMidnight = (): Date => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

export const formatCapacity = (capacity: number): string =>
  `${capacity} ${capacity === 1 ? 'persona' : 'personas'}`;
