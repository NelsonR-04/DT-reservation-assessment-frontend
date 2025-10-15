/**
 * Validation utility functions
 */

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate date is not in the past
 */
export const isValidFutureDate = (dateString: string): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const selectedDate = new Date(dateString);
  return selectedDate >= today;
};

/**
 * Validate time format (HH:mm)
 */
export const isValidTimeFormat = (time: string): boolean => {
  const timeRegex = /^([01]?\d|2[0-3]):[0-5]\d$/;
  return timeRegex.test(time);
};

/**
 * Validate that end time is after start time
 */
export const isValidTimeRange = (startTime: string, endTime: string): boolean => {
  const start = new Date(`2000-01-01T${startTime}:00`);
  const end = new Date(`2000-01-01T${endTime}:00`);
  return end > start;
};
