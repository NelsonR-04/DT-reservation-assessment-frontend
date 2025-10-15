import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Place } from '@/shared/types/entities';
import { placesService } from '../services/places.service';

interface PlacesState {
  places: Place[];
  loading: boolean;
  error: { message: string; code: string } | null;
}

const initialState: PlacesState = {
  places: [],
  loading: false,
  error: null,
};

// Async thunks
export const fetchPlaces = createAsyncThunk<Place[], void, { rejectValue: { message: string; code: string } }>(
  'places/fetchPlaces',
  async (_, { rejectWithValue }) => {
    try {
      const places = await placesService.getAll();
      return places;
    } catch (error: any) {
      return rejectWithValue({
        message: error.message || 'Error fetching places',
        code: error.code
      });
    }
  },
);

export const fetchPlaceById = createAsyncThunk<Place, number, { rejectValue: { message: string; code: string } }>(
  'places/fetchPlaceById',
  async (id: number, { rejectWithValue }) => {
    try {
      const place = await placesService.getById(id);
      return place;
    } catch (error: any) {
      return rejectWithValue({
        message: error.message || 'Error fetching place',
        code: error.code
      });
    }
  },
);

const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      // fetchPlaces
      .addCase(fetchPlaces.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlaces.fulfilled, (state, action) => {
        state.loading = false;
        state.places = action.payload;
      })
      .addCase(fetchPlaces.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || { message: 'Error fetching places' };
      })
      // fetchPlaceById
      .addCase(fetchPlaceById.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlaceById.fulfilled, (state, action) => {
        state.loading = false;
        // Update or add the place in the array
        const existingIndex = state.places.findIndex(p => p.id === action.payload.id);
        if (existingIndex >= 0) {
          state.places[existingIndex] = action.payload;
        } else {
          state.places.push(action.payload);
        }
      })
      .addCase(fetchPlaceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || { message: 'Error fetching place' };
      });
  },
});

export const { clearError, setLoading } = placesSlice.actions;
export default placesSlice.reducer;
