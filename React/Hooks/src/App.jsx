import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [counter,setCounter] = useState(15)

  const addValue=()=>{
    if(counter==20) return;
    setCounter(counter+1)
    console.log("VALUE ADDED",counter);
  }

  const removeValue=()=>{
    if(counter==0) return;
    setCounter(counter-1);
  }

  return (
    <>
    <h1>Chai aur React</h1>
    <h2>Counter value: {counter}</h2>
    <button onClick={addValue}>Add value {counter}</button>
    <br />
    <button onClick={removeValue}>Remove Value {counter}</button>
    </>
  )
}

export default App
