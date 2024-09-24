import { useState, useContext } from "react"
import UserContext from "../context/UserContext"

function Login(){
    const [username,setUsername]=useState("");
    const [pass,setPass]=useState("");

    const {setUser}=useContext(UserContext);

    const handleSubmit=(e)=>{
        e.preventDefault()
        setUser({username,pass})
    }
    return (
        <div className="flex flex-col justify-center bg-gray-600 mx-20 my-4">
            <h2>Login</h2>
            <input type="text" placeholder="username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
            <input type="password" placeholder="password" value={pass} onChange={(e)=>setPass(e.target.value)}/>
            <button onClick={handleSubmit}> Submit</button>
        </div>
    )
}

export default Login