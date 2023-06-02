import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './apiSlice';
// import userReducer from './feature/user/authSlice';
// import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    // user: userReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
    // auth: authReducer,
  },

  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
})