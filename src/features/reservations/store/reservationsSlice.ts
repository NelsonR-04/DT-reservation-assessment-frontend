import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PaginatedResponse } from '@/shared/types/api';
import { CreateReservationRequest, Reservation } from '@/shared/types/entities';
import { ReservationsService } from '../services/reservations.service';
import { ReservationsState } from '@/features/reservations/types';

const initialState: ReservationsState = {
  reservations: [],
  selectedReservation: null,
  meta: null,
  loading: false,
  error: null,
  createLoading: false,
  deleteLoading: false,
};

// Async thunks
export const fetchReservations = createAsyncThunk<
  PaginatedResponse<Reservation>,
  { page?: number; limit?: number },
  { rejectValue: { message: string; code: string } }
>('reservations/fetchReservations', async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
  try {
    const response = await ReservationsService.getAll({ page, limit });
    return response;
  } catch (error: any) {
    return rejectWithValue({
      message: error.message || 'Failed to fetch reservations',
      code: error.code
    });
  }
});

export const fetchReservationById = createAsyncThunk<Reservation, number, { rejectValue: { message: string; code: string } }>(
  'reservations/fetchReservationById',
  async (id, { rejectWithValue }) => {
    try {
      return await ReservationsService.getById(id);
    } catch (error: any) {
      return rejectWithValue({
        message: error.message || 'Failed to fetch reservation',
        code: error.code
      });
    }
  },
);

export const createReservation = createAsyncThunk<
  Reservation,
  CreateReservationRequest,
  { rejectValue: { message: string; code: string } }
>('reservations/createReservation', async (reservationData, { rejectWithValue }) => {
  try {
    return await ReservationsService.create(reservationData);
  } catch (error: any) {
    return rejectWithValue({
      message: error.message || 'Failed to create reservation',
      code: error.code
    });
  }
});

export const deleteReservation = createAsyncThunk<number, number, { rejectValue: { message: string; code: string } }>(
  'reservations/deleteReservation',
  async (id, { rejectWithValue }) => {
    try {
      await ReservationsService.delete(id);
      return id;
    } catch (error: any) {
      return rejectWithValue({
        message: error.message || 'Failed to delete reservation',
        code: error.code
      });
    }
  },
);

const reservationsSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
    clearSelectedReservation: state => {
      state.selectedReservation = null;
    },
    setPage: (state, action: PayloadAction<number>) => {
      if (state.meta) {
        state.meta.page = action.payload;
      }
    },
  },
  extraReducers: builder => {
    builder
      // Fetch reservations
      .addCase(fetchReservations.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchReservations.fulfilled,
        (state, action: PayloadAction<PaginatedResponse<Reservation>>) => {
          state.loading = false;
          state.reservations = action.payload.data;
          state.meta = action.payload.meta;
        },
      )
      .addCase(fetchReservations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? { message: 'Failed to fetch reservations', code: 'UNKNOWN' };
      })
      // Fetch reservation by ID
      .addCase(fetchReservationById.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReservationById.fulfilled, (state, action: PayloadAction<Reservation>) => {
        state.loading = false;
        state.selectedReservation = action.payload;
      })
      .addCase(fetchReservationById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? { message: 'Failed to fetch reservation', code: 'UNKNOWN' };
      })
      // Create reservation
      .addCase(createReservation.pending, state => {
        state.createLoading = true;
        state.error = null;
      })
      .addCase(createReservation.fulfilled, (state, action: PayloadAction<Reservation>) => {
        state.createLoading = false;
        state.reservations.unshift(action.payload);
        if (state.meta) {
          state.meta.total += 1;
        }
      })
      .addCase(createReservation.rejected, (state, action) => {
        state.createLoading = false;
        state.error = action.payload ?? { message: 'Failed to create reservation', code: 'UNKNOWN' };
      })
      // Delete reservation
      .addCase(deleteReservation.pending, state => {
        state.deleteLoading = true;
        state.error = null;
      })
      .addCase(deleteReservation.fulfilled, (state, action: PayloadAction<number>) => {
        state.deleteLoading = false;
        state.reservations = state.reservations.filter(
          reservation => reservation.id !== action.payload,
        );
        if (state.meta) {
          state.meta.total -= 1;
        }
      })
      .addCase(deleteReservation.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload ?? { message: 'Failed to delete reservation', code: 'UNKNOWN' };
      });
  },
});

export const { clearError, clearSelectedReservation, setPage } = reservationsSlice.actions;
export default reservationsSlice.reducer;
