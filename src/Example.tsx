import React, { useRef, useEffect, useState } from 'react';

const MyInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ref}) => {
  return <input ref={ref} />;
};

const Example = () => {
  // Create a ref to hold a reference to a DOM element
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Create a ref to store a regular variable
  const renderCountRef = useRef<number>(0);
  
  // State to force re-render
  const [, setForceUpdate] = useState<object>({});

  useEffect(() => {
    // Focus the input element when the component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
    
    // Increment render count
    renderCountRef.current += 1;
  });

  const handleButtonClick = () => {
    // Access the current value of the input element
    if (inputRef.current) {
      alert(`Input value: ${inputRef.current.value}`);
    }
  };

  const handleForceUpdate = () => {
    setForceUpdate({});
  };

  return (
    <div>
      <h2>useRef Example</h2>
      <MyInput ref={inputRef} type="text" placeholder="Type something..." />
      <button onClick={handleButtonClick}>
        Show Input Value
      </button>
      <div>
        <p>Render Count: {renderCountRef.current}</p>
        <button onClick={handleForceUpdate}>Force Re-render</button>
      </div>
    </div>
  );
};

export default Example;
