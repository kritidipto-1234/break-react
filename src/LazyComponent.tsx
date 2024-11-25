import React from 'react';
import { useAppSelector } from './store/reduxStore.tsx';

const LazyComponent: React.FC = () => {
  const theme = useAppSelector((state) => state.theme.current);

  return (
    <div>
      <h2> Lazy Component</h2>
      <p>Current Theme: {theme}</p>
    </div>
  );
};

type ExampleComponentProps = {
  asProp?: React.ElementType;
  children: React.ReactNode;
  [key: string]: unknown;
};



const ExampleComponent: React.FC<ExampleComponentProps> = ({ asProp, children, ...props }) => {
  const Component = asProp || 'mycustelement';
  return <Component {...props}>{children}</Component>;
};
function App() {
  const but = "button";
  return (
    <div>
      <ExampleComponent>This will be a div</ExampleComponent>
      <ExampleComponent asProp="div">This will be a fiv</ExampleComponent>
      <ExampleComponent asProp={but} onClick={() => alert('Clicked!')}>
        This will be a button
      </ExampleComponent>
    </div>
  );
}

export default App;