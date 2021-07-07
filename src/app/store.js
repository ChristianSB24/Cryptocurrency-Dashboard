import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/productsSlice';
import pastdataReducer from '../features/pastdataSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    pastdata: pastdataReducer
  },
});
