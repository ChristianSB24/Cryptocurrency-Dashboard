import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../features/counter/postsSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});
