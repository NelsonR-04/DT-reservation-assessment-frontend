// Entity types based on backend models - matching actual API responses
export interface Place {
  id: number;
  name: string;
  location: string;
  createdAt: string;
  updatedAt: string;
}

export interface Space {
  id: number;
  placeId: number;
  name: string;
  reference?: string;
  capacity: number;
  description?: string;
  place: Place;
  createdAt: string;
  updatedAt: string;
}

export interface Reservation {
  id: number;
  spaceId: number;
  placeId?: number;
  clientEmail: string;
  reservationDate: string;
  startTime: string;
  endTime: string;
  space?: Space;
  place?: Place;
  createdAt: string;
  updatedAt: string;
}

export interface CreateReservationRequest {
  spaceId: number;
  clientEmail: string;
  reservationDate: string;
  startTime: string;
  endTime: string;
}

export interface UpdateReservationRequest extends Partial<CreateReservationRequest> {
  id: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ApiError {
  error: string;
}
