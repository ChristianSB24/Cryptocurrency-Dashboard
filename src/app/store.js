import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../features/counter/postsSlice';
import pricesReducer from '../features/counter/pricesSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    prices: pricesReducer
  },
});
