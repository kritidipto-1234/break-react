import React, { useState,useTransition } from 'react';

//optimisation technique for interferable state updates
//using transition for interruptible state updates

function TransitionComponent() {
  const [input, setInput] = useState("");
  const [inputWithTransition, setInputWithTransition] = useState("");
  const [list, setList] = useState<string[]>([]);
  const [listWithTransition, setListWithTransition] = useState<string[]>([]);
  const [isPending,startTransition] = useTransition();

  const LIST_SIZE = 20000;
  console.log("rendered")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    const l = [];
    for (let i = 0; i < LIST_SIZE; i++) {
      l.push(e.target.value);
    }
    setList(l);
  };

  const handleChangeWithTransition = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputWithTransition(e.target.value);

    startTransition(() => {
      const l:string[] = [];
      for (let i = 0; i < LIST_SIZE; i++) {
        l.push(e.target.value);
      }
      setListWithTransition(l);
    });
  };

  return (
    <>
      <div>Without use transition</div>
      <input type="text" value={input} onChange={handleChange} />
      {list.map((item, index) => {
        return <div key={index}>{item}</div>;
      })}

      <hr></hr>
      <div>With use transition</div>
      <input type="text" value={inputWithTransition} onChange={handleChangeWithTransition} />
      {isPending ? <div>Loading...</div> : listWithTransition.map((item, index) => {
        return <div key={index}>{item}</div>;
      })}
    </>
  );
}

export default TransitionComponent;