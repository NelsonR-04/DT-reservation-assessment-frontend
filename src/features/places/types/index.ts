export interface PlaceFilters {
  search?: string;
  location?: string;
}

export interface CreatePlaceRequest {
  name: string;
  location: string;
}
