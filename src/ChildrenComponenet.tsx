import { useState } from "react";

const A = () => {

    return <div>
        <h2>A</h2>
        <B>
            <C/>
        </B>
    </div>
}

const B = ({children}: {children: React.ReactNode}) => {
    const [count, setCount] = useState(0);

    const incrementCount = () => {
        setCount(count + 1);
    };

    console.log("B render");
    return <div>
        <h2>B</h2>

        <button onClick={incrementCount}>Increment Count</button>
        {children}
        {/* <C /> */}
    </div>
}

const C = () => {
    console.log("C render");
    return <div>C</div>
}

export default A;