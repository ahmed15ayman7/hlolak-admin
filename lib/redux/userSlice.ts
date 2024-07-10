"use client";
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(`${localStorage.getItem("user")}`), // Initial state for user
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const selectUser = (state: { user: { user: any; }; }) => state.user.user;

export default userSlice.reducer;