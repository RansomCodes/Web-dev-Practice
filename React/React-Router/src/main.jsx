/* eslint-disable no-unused-vars */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import Layout from './Layout'
import Home from './components/Home/Home'
import About from './components/About/About'
import Contact from './components/ContactUs/Contact'
import User from './components/User/User'
import GitHub, { githubInfoLoader } from './components/Github/Github'

// let router=createBrowserRouter([
//   {
//     path:'/',
//     element: <Layout/>,
//     children: [
//       {
//         path:'',
//         element: <Home/>
//       },
//       {
//         path:'About',
//         element: <About/>
//       },
//       {
//         path:'Contact',
//         element: <Contact/>
//       }
//     ]
//   }
// ])

const router= createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout/>}>
      <Route path="" element={<Home/>}></Route>
      <Route path="contact" element={<Contact/>}></Route>
      <Route path="about" element={<About/>}></Route>
      <Route path="user/:userid" element={<User/>}></Route>
      <Route 
      loader={githubInfoLoader}
      path="github" 
      element={<GitHub/>}>
      </Route>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
