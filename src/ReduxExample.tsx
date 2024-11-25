import React, { useState } from 'react';
import { useAppSelector, useAppDispatch, increment, decrement, incrementByAmount,toggleThemeAndUpdateCounter, toggleTheme, toggleThemeAndSave, resetCounter, resetCounterAndTheme } from './store/reduxStore';

const ThemeSwitcher: React.FC = () => {
  const theme = useAppSelector((state) => state.theme.current);
  const dispatch = useAppDispatch();

  const handleThemeChange = () => {
    dispatch(toggleThemeAndSave());
  };

  return (
    <div>
      <button onClick={() => dispatch(toggleTheme())}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
      </button>
      <button onClick={handleThemeChange}>
        Toggle Theme and Save
      </button>
      <button onClick={() => dispatch(toggleThemeAndUpdateCounter())}>
        Toggle Theme and Update Counter
      </button>
    </div>
  );
};

export const ReduxExample: React.FC = () => {
  const count = useAppSelector((state) => state.counter.value);
  const theme = useAppSelector((state) => state.theme.current);
  const dispatch = useAppDispatch();

  return (
    <div>
      <h2>Redux Counter Example</h2>
      <p>Count: {count}</p>
      <p>Current Theme: {theme}</p>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>Add 5</button>
      <div>

        <button onClick={() => dispatch(resetCounterAndTheme({ theme:'light', counterValue: 0 }))}>
          Reset Counter and Theme
        </button>
      </div>
      <ThemeSwitcher />
    </div>
  );
};
