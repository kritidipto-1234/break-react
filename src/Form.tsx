import { useState } from "react";


const updateName = async (name: string): Promise<string | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (Math.random() < 0.9) {
        resolve("An error occurred while updating the name.");
      } else {
        resolve(null);
      }
    }, 1000);
  });
};


export function Form() {
    const [name, setName] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isPending, setIsPending] = useState(false);
    const [success, setSuccess] = useState(false);
  
    const handleSubmit = async () => {
      setIsPending(true);
      const error = await updateName(name);
      setIsPending(false);
      if (error) {
        setError(error);
        setSuccess(false);
        return;
      } 
      // Do something "reacty" on success
      setError(null);
      setSuccess(true);
    };
  
    return (
      <div>
        <input value={name} onChange={(event) => setName(event.target.value)} />
        <button onClick={handleSubmit} disabled={isPending}>
          Update
        </button>
        {!isPending && error && <p>{error}</p>}
        {isPending && <p>Your name is {name}</p>}
        {success && <p>Your name is {name}</p>}
      </div>
    );
  }

// import {  useActionState } from "react";

// // Using <form> Actions and useActionState
// export function Form({  }) {
//     const [name, setName] = useState("");
//     const [error, submitAction, isPending] = useActionState(
//       async (previousState:any, formData:FormData) => {
//         const newName = formData.get("name") as string;
//         setName(newName);
//         console.log(newName,error);
//         const err = await updateName(newName);
//         if (err) {
//           return err;
//         }
//         setName(newName);
//         return null;
//       },
//       null,
//     );
  
//     return (
//       <form action={submitAction}>
//         <input type="text" name="name" defaultValue={name} />
//         <button type="submit" disabled={isPending}>Update</button>
//         {error && <p>{error}</p>}
//         {!error && name && <p>Name updated to: {name}</p>}
//       </form>
//     );
//   }