import { configureStore, createSlice, PayloadAction, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector, Provider } from 'react-redux';
import React from 'react';
import { resetCounterAndTheme, CounterState } from './Common';

// Create a new action using createAction
export const resetCounter = createAction<number>('counter/reset');


const initialCounterState: CounterState = {
  value: 0,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState: initialCounterState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
  // Add an extra reducer to handle the reset action
  extraReducers: (builder) => {
    builder.addCase(resetCounter, (state, action) => {
      state.value = action.payload;
    });
    builder.addCase(resetCounterAndTheme, (state, action) => {
      state.value = action.payload.counterValue;
    });
  },
});

export  default counterSlice;