import React, { useState, useEffect } from 'react';

// This HOC adds a loading state to a component
function withLoading<P>(WrappedComponent: React.ComponentType<P>) {
  return function WithLoading(props: P) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      // Simulate an API call
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);

      // Cleanup the timer
      return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props as JSX.IntrinsicAttributes & P} />;
};
}

// A simple functional component
const MyComponent = () => (
  <div>My Component</div>
);

// Using the HOC
const EnhancedComponent = withLoading(MyComponent);

function WithLoadingWrapper({ children, ...props }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      // Simulate an API call
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);

      // Cleanup the timer
      return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    return <>{children}</>;
};

// In your app
function HOC() {
  return (
    <div>
      <EnhancedComponent />
      <WithLoadingWrapper>
        <MyComponent />
      </WithLoadingWrapper>
    </div>
  );
}

export default HOC;