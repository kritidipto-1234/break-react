import { useEffect } from 'react';
import { useState } from 'react';
// import { Link, Routes, Route, BrowserRouter } from 'react-router-dom';
import { Link, Route, BrowserRouter } from './customReactRouter';

const Counter = function() {
    const [state, setState] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setState(state => state + 1);
        }, 300);
        return () => clearInterval(interval);
    }, []);
    return (
        <div>
            <h1>Counter: {state}</h1>
        </div>
    );
}


function Home() {
    return <h2>Home Page</h2>;
}

function About() {
    return <h2>About Page</h2>;
}

// function ReactRouterDemo() {
//     return (
//         <div>
//             <BrowserRouter>
//                 <Counter />
//                 <nav>
//                     <ul>
//                         <li><Link to="/home">Home</Link></li>
//                         <li><Link to="/about">About</Link></li>
//                         <li><Link to="/">Back</Link></li>
//                         <a onClick={e=>e.preventDefault()} href="/back">Back</a>
//                     </ul>
//                 </nav>

//                 <Routes>
//                     <Route path="/home" element={<Home />} />
//                     <Route path="/about" element={<About />} />
//                 </Routes>
//             </BrowserRouter>
//         </div>
//     );
// }

function ReactRouterDemo() {
    return (
        <div>
            <BrowserRouter>
                <Counter />
                <nav>
                    <ul>
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/">Back</Link></li>
                        <a onClick={e=>e.preventDefault()} href="/back">Back</a>
                    </ul>
                </nav>
                    <Route path="/" element={<div>Default</div>} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/about" element={<About />} />
            </BrowserRouter>
        </div>
    );}

export default ReactRouterDemo;