"use client";
import Cookies from 'js-cookie';
import { createSlice } from '@reduxjs/toolkit';
let userJson = Cookies.get('user');
const initialState = {
  user: userJson?JSON.parse(`${userJson}`):null, // Initial state for user
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