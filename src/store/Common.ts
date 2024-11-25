import { configureStore, createSlice, PayloadAction, createAsyncThunk, createAction } from '@reduxjs/toolkit';


type Theme = 'light' | 'dark';
export type { Theme };
// Types
export type Post = {
    id: number;
    title: string;
    content: string;
    temp?: boolean;
}

export type RootState = {
    counter: CounterState;
    theme: ThemeState;
    posts: {
        data: Post[];
        loading: boolean;
        error: string | null;
        creating: boolean;
    };
}

export type ThemeState = {
    current: Theme;
    isSaving: boolean;
    error: string | null;
  }

// Counter Slice
export type CounterState = {
    value: number;
  }
  


// Modify the resetCounter action to include theme reset
export const resetCounterAndTheme = createAction<{ theme: Theme; counterValue: number }>('reset/counterAndTheme');

