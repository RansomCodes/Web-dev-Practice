import { createRoot } from 'react-dom/client'
import  React  from "react"

import App from './App.jsx'

function MyApp(){
    return (
        <>
        <h1>Custom App | DADDY</h1>
        </>
    )
}

const Ele=(
    <a href="https://google.com" target="_blank">Visit Google site</a>
)

const AnotherUser="chai aur react";

const reactEle=React.createElement(
    'a',
    {
        href:'https://google.com',
        target: '_blank'
    },
    'Click Me to visit Google',
    AnotherUser
);


createRoot(document.getElementById('root')).render(
    reactEle
)
