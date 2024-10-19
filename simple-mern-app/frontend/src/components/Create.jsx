import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

function Create() {
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [age,setAge]=useState('');
  const [error,setError]=useState('');

  const navigate=useNavigate();

  const handleEdit= async(e)=>{
    e.preventDefault();
    const addUser={name,email,age};
    const response=await fetch("http://localhost:3000",{
      method: "POST",
      body: JSON.stringify(addUser),
      headers:{
        "Content-Type":"application/json",
      }
    });

    const result=await response.json();
    if(!response.ok){
      setError(result.error);
      console.log(result.error); 
    }

    if(response.ok){
      setError('');
      setAge('');
      setName('');
      setEmail('');
      navigate('/all')
    }
  }

  return (
    <div>
      { error && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        {error}
        </div>
      }
      <form 
        className="max-w-sm mx-auto mt-8"
        onSubmit={handleEdit}
        >
        <div className="mb-5">
        <div className="text-3xl font-bold p-4 text-pink-600">Enter new Data</div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
          <input 
            type="text" 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="Navin Reddy"
            value={name}
            onChange={(e)=>setName(e.target.value)} 
            required 
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
          <input 
            type="email" 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="name@flowbite.com"
            value={email}
            onChange={(e)=>setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Age</label>
          <input 
            type="number" 
            id="password" 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="18"
            value={age}
            onChange={(e)=>setAge(e.target.value)} 
          />
        </div>
        <button 
          type="submit" 
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Submit
        </button>
      </form>
    </div>
  )
}

export default Create