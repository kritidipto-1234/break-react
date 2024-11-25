import { useState } from "react";
import random from 'lodash.random';
import { addNumbers } from "./lib.js";

console.log("yo",addNumbers(21, 3));



const floatResult = random(1.5, 3);


import { useRef,useOptimistic } from "react";

async function addTodoServer(): Promise<string | null> {
    let ab;
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.5) {
                reject("An error occurred during the operation.");
            } else {
                resolve("Operation successful.");
            }
        }, 1000);
    });
}


function WithoutOptimistic() {
    const [todo, setTodo] = useState(["one", "two", "three"]);
    const newTodoRef = useRef<HTMLInputElement>(null);

    async function addTodo() {
        if (newTodoRef.current) {
            try {
                setTodo([...todo, newTodoRef.current.value]);
                await addTodoServer();
                console.log("Added todo:", newTodoRef.current.value);
                setTodo([...todo, newTodoRef.current.value]);
                newTodoRef.current.value = "";
            } catch (error) {
                console.log("Failed to add todo:", newTodoRef.current.value);
                setTodo([...todo]);
                console.error(error);
            }
        }
    }

    return (
        <div>
            <ul>
                {todo.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            <input 
                type="text" 
                ref={newTodoRef} 
                placeholder="Add new todo"
            />
            <button onClick={addTodo}>Add Todo</button>
        </div>
    );
}

type Todo = {
    value: string;
    pending?: boolean;
  };
 
function WithOptimistic() {
    const [todo, setTodo] = useState<Todo[]>([{value:"one"},{value:"two"},{value:"three"}]);
    const [optimisticTodos, addOptimisticTodo] = useOptimistic(
        todo,
        (currentTodos: Todo[], newTodo: Todo) => [...currentTodos, newTodo]
    );
    const newTodoRef = useRef<HTMLInputElement>(null);


    async function addTodo() {
        if (newTodoRef.current?.value) {
            const newTodo = newTodoRef.current.value;
            // startTransition(() => {
            addOptimisticTodo({value:newTodo,pending:true});
            // });
            try {
                await addTodoServer();
                console.log("Added todo:", newTodo);
                setTodo(current => [...current, {value:newTodo}]);
            } catch (error) {
                console.log("Failed to add todo:", newTodo);
                console.error(error);
            }
            newTodoRef.current.value = "";
        }
    }

    return (
        <div>
            <ul>
                {optimisticTodos.map((item, index) => (
                    <li key={index} style={{ color: item.pending ? 'grey' : 'black' }}>{item.value}</li>
                ))}
            </ul>
            <form action={addTodo}>
                <input 
                    type="text" 
                    ref={newTodoRef} 
                    placeholder="Add new todo"
                />
                <button type="submit">Add Todo</button>
            </form>
        </div>
    );
}

export {WithoutOptimistic,WithOptimistic};

// export default useOptimistic;