import { configureStore, createSlice, PayloadAction, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector, Provider } from 'react-redux';
import React from 'react';
import { postsSlice, addOptimisticPost, removeOptimisticPost, fetchPosts, createPost } from './Post';
import { resetCounter } from './Counter';
import counterSlice from './Counter';
import themeSlice , { saveTheme, toggleThemeAndSave } from './Theme';
import { resetCounterAndTheme } from './Common';
import { api } from './api';

// This is the thunk
function toggleThemeAndUpdateCounterThunk(dispatch: AppDispatch, getState: () => RootState) {
  const currentTheme = getState().theme.current;
  dispatch(toggleTheme());
  if (currentTheme === 'dark') {
    dispatch(decrement());
  }
  else {
    // dispatch(increment());
  }
}

// This is the action creator
function toggleThemeAndUpdateCounter() {
  return toggleThemeAndUpdateCounterThunk;
}


// Store
export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    theme: themeSlice.reducer,
    posts: postsSlice.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

// Hooks
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Provider
interface ReduxProviderProps {
  children: React.ReactNode;
}

export const ReduxProvider: React.FC<ReduxProviderProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

// Update exports
export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export const { toggleTheme } = themeSlice.actions;
export { resetCounter , resetCounterAndTheme};
export { saveTheme, toggleThemeAndSave };
export { toggleThemeAndUpdateCounter };
export { addOptimisticPost, removeOptimisticPost , fetchPosts, createPost };


console.log(increment(),saveTheme('light'), toggleThemeAndUpdateCounter());