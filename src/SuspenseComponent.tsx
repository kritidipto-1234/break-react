import React, { useState, useTransition, Suspense } from 'react';

// Lazy load the child component

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const LazyComponent = React.lazy(() => 
    wait(2000).then(() => import('./LazyComponent.tsx'))
);

//here im using transition to avoid unwanted loaders
function SuspenseComponent() {
    const [showLazy, setShowLazy] = useState(false);
    const [isPending, startTransition] = useTransition();
  
    const handleClick = () => {
      startTransition(() => {
        setShowLazy(true);
      });
    };

    return (
        <div className="SuspenseComponent">
            <h1>Suspense Example</h1>
            <button onClick={handleClick} disabled={isPending}>
                Show Lazy Component
            </button>

            <Suspense fallback={<div>I am suspense fallback...</div>}>
                {showLazy?<LazyComponent />:<div>I am not lazy component</div>}
            </Suspense>

        </div>
    );
}

export default SuspenseComponent;