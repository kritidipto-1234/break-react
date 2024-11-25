import { useState } from "react";

const destroyElement = () =>{
    const dest = document.querySelector("#random-element");
    if (dest) {
        dest.parentNode!.insertBefore(document.querySelector("#my-div")!, dest);
    }
}
  
  export const BreakReact = () => {
    const [elementShown, updateElement] = useState(true);
  
    return (
      <div id='app' style={{height: '100vh', width: '100vw'}}>
        <button onClick={() => destroyElement()}>
          Rearrange element via querySelector
        </button>
        <button onClick={() => updateElement(false)}>
          Hide first element via reactstate
        </button>
      { elementShown ? <div id="my-div" style={{backgroundColor: 'teal'}}>1.First element</div> : null }
      <div id="random-container" >
        <div>2.second element</div>
        <div id="random-element">3.Third element</div>
      </div>
      </div>
    );
  };
  