import React, { useState, useMemo, useRef } from 'react';



export function useMyMemo<T>(factory: () => T, deps: React.DependencyList):T {
    const memoCacheRef = useRef<{
        value: T | null,
        deps: React.DependencyList
    }>({
        value: null,
        deps: []
    });

    const hasDepsChanged = () => {
        // Check if lengths are different
        if (deps.length !== memoCacheRef.current.deps.length) {
            return true;
        }
        
        // Compare each dependency
        return deps.some((dep, index) => {
            return !Object.is(dep, memoCacheRef.current.deps[index]);
        });
    }

    if ( memoCacheRef.current.value === null ||  hasDepsChanged()) {
        memoCacheRef.current.value = factory();
        memoCacheRef.current.deps = deps;
    }

    return memoCacheRef.current.value as T;
}

const UseMemoExample: React.FC = () => {
  const [count, setCount] = useState(13);
  const [otherState, setOtherState] = useState(0);

  // Using useMemo to memoize the expensive calculation
  const expensiveValue = useMyMemo(() => {
    for (let i = 0; i < 1000000000; i++) {
        // This loop does nothing but consume time
      }
    console.log('Expensive calculation performed');
    return count * 2;
  }, [count]);

    // const expensiveValue = count*2;
    // for (let i = 0; i < 1000000000; i++) {
    //     // This loop does nothing but consume time
    //   }
    // console.log('Expensive calculation performed');


  return (
    <div>
      <h2>useMemo Example</h2>
      <p>Count: {count}</p>
      <p>Other State: {otherState}</p>
      <p>Expensive Value: {expensiveValue}</p>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <button onClick={() => setOtherState(otherState + 1)}>Change Other State</button>
    </div>
  );
};

export default UseMemoExample;

