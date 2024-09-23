// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Card from './components/card'

function App() {

  return (
    <>
    <h1 className="bg-green-500 text-black rounded-xl">Tailwind Test</h1>
    <Card username="Manmeet" btnText="Click Me"></Card>
    <Card username="Mannu"></Card>
    </>
  )
}

export default App
