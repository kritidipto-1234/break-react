import { useMyMemo } from "./useMemo";
import ReactMemo from "./ReactMemo";
export function useMyCallback<T extends (...args: unknown[]) => unknown>(
    callback: T,
    deps: React.DependencyList
  ): T {
    return useMyMemo(() => callback, deps);
  }


import React, { useState, useCallback } from 'react';

const UseCallbackExample: React.FC = () => {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(0);

  const incrementCount = useCallback(() => {
    setCount(count + 1);
  }, [count]);  

  return (
    <div>
      <h2>useCallback Example</h2>
      <p>Count: {count}</p>
      <p>Other State: {otherState}</p>
      <ChildComponent incrementCount={incrementCount} />
      <button onClick={() => setOtherState(otherState + 1)}>Change Other State</button>
    </div>
  );
};

const ChildComponent: React.FC<{ incrementCount: () => void }> =ReactMemo(({ incrementCount }) => {
  console.log('Child component re-rendered');
  return <button onClick={incrementCount}>Increment Count</button>;
});

const UseCallbackCounterpart: React.FC = () => {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(0);

  const incrementCount = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <h2>useCallback Counterpart Example</h2>
      <p>Count: {count}</p>
      <p>Other State: {otherState}</p>
      <ChildComponent incrementCount={incrementCount} />
      <button onClick={() => setOtherState(otherState + 1)}>Change Other State</button>
    </div>
  );
};


export default function UseCallbackComparison() {
  return (
    <div>
      <UseCallbackExample />
      <UseCallbackCounterpart />
    </div>
  );
}


//TO do React.memo polyfill
//useSekector