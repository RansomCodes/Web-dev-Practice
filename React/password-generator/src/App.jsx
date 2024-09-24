/* eslint-disable no-unused-vars */
import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {

  const [length,setLength]=useState(16);
  const [NumAllowed, setNumAllowed]=useState(false);
  const [charAllowed,setCharAllowed]=useState(false);
  const [pass,setPass]=useState("xyz");

  //ref hook
  const passwordRef=useRef(null);

  const generatePass=useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(NumAllowed) str+="0123456789"
    if(charAllowed) str+="~!@#$%^&*()-_+={}[]|\\:;'<>,.?/"

    let fin=str.length
    for(let i=0;i<length;i++){
      let randi=Math.floor(Math.random()*fin)
      pass+=str[randi]
    }

    setPass(pass)
  },[length,NumAllowed,charAllowed,setPass])

  const copyPassToClip=useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(pass)
  },[pass])

  useEffect(()=>{
    generatePass();
  },[length,NumAllowed,charAllowed,generatePass])

  return (
    <>
    <div className="flex flex-col justify-center min-w-32 bg-pink-400 mx-96 my-12 px-8 py-4 rounded-lg shadow-xl">
      <div className="mx-auto text-3xl">Password Generator</div>
      <div className="w-full flex justify-center items-center pl-4 my-2 rounded-lg py-2 text-lg">
        <input 
          type="text" 
          value={pass} 
          className="bg-white p-2 rounded-l-lg outline-none min-w-24" 
          readOnly 
          ref={passwordRef}/>
        <button 
          className="bg-blue-400 p-2 rounded-r-lg cursor-pointer" 
          onClick={copyPassToClip}>
            Copy
        </button>
      </div>
      <div className="flex justify-around">
        <div>
          <input type="range" 
          min="8" 
          max="25" 
          value={length} 
          className="mx-2 cursor-pointer" 
          onChange={(e)=>setLength(e.target.value)}/>
          <label htmlFor="slider">Length:{length}</label>
        </div>
        <div>
          <input type="checkbox" 
          name="numbers" 
          value="Initial value" 
          className="mx-2" 
          onChange={()=>{
              setNumAllowed((prev)=>!prev)
            }
          }/>    
          <label htmlFor="numbers">Numbers</label>
        </div>
        <div>
          <input type="checkbox" name="characters" value="Initial value" className="mx-2" onChange={()=>{
            setCharAllowed((prev)=>!prev)
          }
        }/>    
          <label htmlFor="characters">Special Characters</label>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
