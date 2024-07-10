"use client";
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // Create this file later

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;