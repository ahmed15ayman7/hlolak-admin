"use client";
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // Create this file later
import LoadReducer from './LoadSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    load: LoadReducer,
  },
});

export default store;