"use client";
import { createSlice } from '@reduxjs/toolkit';


const initialState = 0

export const LoadSlice = createSlice({
  name: 'load',
  initialState,
  reducers: {
    setLoad: (state, action) => {
      
      return action.payload;
    },
  },
});

export const { setLoad } = LoadSlice.actions;

export const selectLoad = (state: { load: any; }) => state.load;

export default LoadSlice.reducer;
