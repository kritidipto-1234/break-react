import React, { useState } from 'react';
import { Form } from './Form';
import HOC from './HOC';
import SuspenseComponent from './SuspenseComponent';
import TransitionComponent from './TransitionComponent';
import { ContextApp } from './useHookContext';
import { PromiseApp } from './useHookPromise';
import { WithOptimistic, WithoutOptimistic } from './useOptimistic';
import { ReduxExample } from './ReduxExample';
// import Example from './Example';
import LazyComponent from './LazyComponent.tsx';
import UseMemoExample from './customHooks/useMemo';
import Random from './Random.tsx';
import StateMangement from './globalState';
import { BreakReact } from './BreakReact.tsx';
import Order from './Order';
import UseCallbackComparison from './customHooks/useCallback.tsx';
import ChildrenComponent from './ChildrenComponenet.tsx';
import UseLayoutHook from './useLayoutHook.tsx';

const App: React.FC = () => {
  const [show, setShow] = useState(true);

  // debugger;
  return (
      <>
        {/* <WithoutOptimistic /> */}
        {/* <WithOptimistic /> */}
        {/* <HOC /> */}
        {/* <ChildrenComponent /> */}
        {/* <PromiseApp /> */}
        {/* <Example /> */}
        {/* <UseMemoExample /> */}
        {/* <UseCallbackComparison /> */}
        {/* <LazyComponent /> */}
        {/* <ReduxExample /> */}
        {/* <StateMangement /> */}
        {/* <BreakReact /> */}
        {/* <Order /> */}
        {/* <Random /> */}
        <UseLayoutHook />
      </>
  );
};

export default App;
