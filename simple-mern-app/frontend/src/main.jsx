import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Create from './components/Create.jsx'
import Read from './components/Read.jsx'
import Update from './components/Update.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Routes>
        <Route path="/" element={<Create/>}/>
        <Route path="/all" element={<Read/>}/>
        <Route path="/:id" element={<Update/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
