import { useState } from "react";
import styles from './Break.module.scss';

const destroyElement = () =>{
    const dest = document.querySelector("#random-element");
    if (dest) {
        dest.parentNode!.insertBefore(document.querySelector("#my-div")!, dest);
    }
}

console.log(styles);  

  export const BreakReact = () => {
    const [elementShown, updateElement] = useState(true);
  
    return (
      <div className={styles.Break} id='app'>
        <button onClick={() => destroyElement()}>
          Rearrange element
        </button>

      { elementShown ? <div id="my-div" className={styles.element+" "+styles.myDiv}>
        1.First element
        <button onClick={() => updateElement(false)}>
          Hide me via reactstate
        </button>
      </div> : null }
      <div id="random-container" >
        <div className={styles.element}>2.second element</div>
        <div id="random-element" className={styles.element}>3.Third element</div>
      </div>
      </div>
    );
  };
  