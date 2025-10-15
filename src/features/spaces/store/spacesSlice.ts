import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Space } from '@/shared/types/entities';
import * as spacesApi from '../api/spaces';

interface SpacesState {
  spaces: Space[];
  selectedSpace: Space | null;
  loading: boolean;
  error: { message: string; code: string } | null;
}

const initialState: SpacesState = {
  spaces: [],
  selectedSpace: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchSpaces = createAsyncThunk<Space[], void, { rejectValue: { message: string; code: string } }>(
  'spaces/fetchSpaces',
  async (_, { rejectWithValue }) => {
    try {
      return await spacesApi.getAllSpaces();
    } catch (error: any) {
      return rejectWithValue({
        message: error.message || 'Failed to fetch spaces',
        code: error.code
      });
    }
  },
);

export const fetchSpaceById = createAsyncThunk<Space, number, { rejectValue: { message: string; code: string } }>(
  'spaces/fetchSpaceById',
  async (id, { rejectWithValue }) => {
    try {
      return await spacesApi.getSpaceById(id);
    } catch (error: any) {
      return rejectWithValue({
        message: error.message || 'Failed to fetch space',
        code: error.code
      });
    }
  },
);

const spacesSlice = createSlice({
  name: 'spaces',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
    clearSelectedSpace: state => {
      state.selectedSpace = null;
    },
  },
  extraReducers: builder => {
    builder
      // Fetch all spaces
      .addCase(fetchSpaces.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSpaces.fulfilled, (state, action: PayloadAction<Space[]>) => {
        state.loading = false;
        state.spaces = action.payload;
      })
      .addCase(fetchSpaces.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || { message: 'Failed to fetch spaces' };
      })
      // Fetch space by ID
      .addCase(fetchSpaceById.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSpaceById.fulfilled, (state, action: PayloadAction<Space>) => {
        state.loading = false;
        state.selectedSpace = action.payload;
      })
      .addCase(fetchSpaceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || { message: 'Failed to fetch space' };
      });
  },
});

export const { clearError, clearSelectedSpace } = spacesSlice.actions;
export default spacesSlice.reducer;
