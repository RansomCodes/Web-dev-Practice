/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import './App.css'
import { ToDoProvider, useToDo, ToDoContext } from './context'
import { stringify } from 'postcss'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

function App() {
  const [todos,setTodos]=useState([])

  const addTodo=(todo)=>{
    setTodos((prev)=>{
      return [{...todo},...prev]
    })
  }

  const updateTodo=(todo,id)=>{
    setTodos((prev)=>prev.map((prevTodo)=>{
      if(prevTodo.id===id){
        return todo
      } else {
        return prevTodo
      }
    }))
  }

  const deleteTodo=(id)=>{
    setTodos((prev)=>prev.filter((todo)=> todo.id!==id))
  }

  const toggleComplete=(id)=>{
    setTodos((prev)=>prev.map((prevTodo)=>{
      if(prevTodo.id===id){
        prevTodo.completed==true ? false: true
      }
      return prevTodo
    }))
  }

  useEffect(()=>{
    const todos= JSON.parse(localStorage.getItem("todos"))

    if(todos && todos.length>0){
      setTodos(todos) 
    }

  },[])

  useEffect(()=>{
    localStorage.setItem("todos",JSON,stringify(todos));
  },[todos])

  return (
    <ToDoProvider value={{todos,addTodo,deleteTodo,updateTodo,toggleComplete}}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            <TodoForm></TodoForm>
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo)=>{
              return <div key={todo.id}
              className='w-full'>
                <TodoItem todo={todo}/>
              </div>
            })}
          </div>
        </div>
      </div>
    </ToDoProvider>
  )
}

export default App
