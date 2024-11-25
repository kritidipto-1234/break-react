import { configureStore, createSlice, PayloadAction, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector, Provider } from 'react-redux';
import React from 'react';
import counterSlice from './Counter';
import { Theme, resetCounterAndTheme, ThemeState,RootState } from './Common';



const initialThemeState: ThemeState = {
  current: 'light',
  isSaving: false,
  error: null,
};

// Simulated API call
const saveThemeToServer = async (theme: Theme): Promise<void> => {
  return new Promise((resolve) => setTimeout(() => resolve(), 1000));
};

// Async thunk for saving theme
const saveTheme = createAsyncThunk(
  'theme/saveTheme',
  async (theme: Theme) => {
    await saveThemeToServer(theme);
    return theme;
  }
);

// New action creator for toggling theme and saving
const toggleThemeAndSave = createAsyncThunk(
  'theme/toggleThemeAndSave',
  async (_: void, { getState, dispatch }) => {
    const state = getState() as RootState;
    const newTheme: Theme = state.theme.current === 'light' ? 'dark' : 'light';
    
    // Toggle the theme immediately
    // dispatch(toggleTheme());
    
    // Save the new theme to the server
    await saveThemeToServer(newTheme);
    return newTheme;
  }
);

const themeSlice = createSlice({
  name: 'theme',
  initialState: initialThemeState,
  reducers: {
    toggleTheme: (state) => {
      state.current = state.current === 'light' ? 'dark' : 'light';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveTheme.pending, (state) => {
        state.isSaving = true;
        state.error = null;
      })
      .addCase(saveTheme.fulfilled, (state, action) => {
        state.isSaving = false;
        state.current = action.payload;
      })
      .addCase(saveTheme.rejected, (state, action) => {
        state.isSaving = false;
        state.error = action.error.message || 'Failed to save theme';
      })
      .addCase(toggleThemeAndSave.pending, (state) => {
        state.isSaving = true;
        state.error = null;
      })
      .addCase(toggleThemeAndSave.fulfilled, (state, action) => {
        state.isSaving = false;
        state.current = action.payload;
        // We don't need to set the theme here because it's already set by toggleTheme
      })
      .addCase(toggleThemeAndSave.rejected, (state, action) => {
        state.isSaving = false;
        state.error = action.error.message || 'Failed to save theme';
      })
      .addCase(resetCounterAndTheme, (state, action) => {
        state.current = action.payload.theme;
        state.isSaving = false;
        state.error = null;
      });
  },
});


// Update exports
export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export const { toggleTheme } = themeSlice.actions;
export { saveTheme, toggleThemeAndSave };
export default themeSlice;