import React, { useEffect, useLayoutEffect, useState, useRef, FC } from 'react';


// ... interface definition ...

// Replace the synchronous pause with an async delay function
const syncDelay = (ms: number) => {
    let start = Date.now();
    while (Date.now() - start < ms) {
        // Busy-wait loop
    }
}
const Layout= () => {
    const ref = useRef(null);
  const [name, setName] = useState('layout');
  syncDelay(120);

  useLayoutEffect(() => {
    setName('Pope Francis uses layout');
  }, []);

  return <div ref={ref}>{name}</div>;
};

const Effect= () => {
    const ref = useRef(null);
    const [name, setName] = useState('effect');
    syncDelay(120);

    useEffect(() => {
        setName('Pope Francis uses Effect');
    }, []);
  
    return <div ref={ref}>{name}</div>;
  };

function App() {
    const [showEffect, setShowEffect] = useState(false);
    const [showLayout, setShowLayout] = useState(false);

    return <div>
        {showEffect && <Effect />}
        {showLayout && <Layout />}
        <button onClick={() => setShowEffect(prev => !prev)}>Toggle Effect</button>
        <button onClick={() => setShowLayout(prev => !prev)}>Toggle Layout</button>
    </div>
}

  export default App;


  const timeout = setTimeout(() => {
    const span = document.createElement('span');
    document.body.appendChild(span);
    span.textContent = 'started';
    // debugger;
    span.textContent = 'Pope Francis uses layout';
  }, 100);
