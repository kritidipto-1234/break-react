import { useEffect, useState } from "react";

const Random = () => {

    const [show, setShow] = useState(true);

    useEffect(() => {
        // debugger;
        const i = setInterval(() => {
            // setShow(show=>!show);
        }, 2000);
        return () => clearInterval(i);
    }, []);
    return <div id="wrapper">
            { <div id="one">Hello 1</div>}
            {<div id="two">Hello 2</div>}
            <div id="three">Hello 3</div>
            <div id="four">Hello 4</div>
            {<div id="five">Hello 5</div>}  
        </div>
}

export default Random;