import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/features/auth/store/authSlice';
import placesReducer from '@/features/places/store/placesSlice';
import reservationsReducer from '@/features/reservations/store/reservationsSlice';
import spacesReducer from '@/features/spaces/store/spacesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    places: placesReducer,
    spaces: spacesReducer,
    reservations: reservationsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
