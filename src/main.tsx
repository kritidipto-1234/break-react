import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
// import './index.css'
import { store, toggleTheme, incrementByAmount, ReduxProvider } from './store/reduxStore';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter } from 'react-router-dom'

const queryClient = new QueryClient()

setInterval(()=>{
  // console.log((queryClient).getQueryData(['posts']));
}, 1000);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReduxProvider>
        {/* <QueryClientProvider client={queryClient}> */}
          <App />
          {/* <ReactQueryDevtools initialIsOpen={true} /> */}
        {/* </QueryClientProvider> */}
    </ReduxProvider>
  </React.StrictMode>
)

// Get the current state

// setTimeout(()=>{

  // You can also dispatch actions
  // debugger;
  // store.dispatch(incrementByAmount(1000));
  // const currentState = store.getState();
  // console.log('Current theme:', currentState.theme.current);
  // console.log('Counter value:', currentState.counter.value);
// }, 1000);

// Subscribe to store changes
const unsubscribe = store.subscribe(() => {
  // This will run any time the store state changes
  const newState = store.getState();
  console.log('Store state changed:');
  console.log('  Theme:', newState.theme.current);
  console.log('  Counter value:', newState.counter.value);
});


// Don't forget to unsubscribe when you're done listening to changes
// unsubscribe();

class Student {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  speak() {
    console.log(`${this.name} is speaking. I am a rat`);
  }
}

const student = new Student('John', 20);
const proxyStudent = new Proxy(student, {})
// student.speak();
console.log(student, proxyStudent instanceof Student);
