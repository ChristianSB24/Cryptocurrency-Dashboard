import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../features/postsSlice';
import pricesReducer from '../features/pricesSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    prices: pricesReducer
  },
});
