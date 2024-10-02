/* eslint-disable no-unused-vars */
import { useDispatch } from "react-redux"
import authService, { AuthService } from "../appwrite/auth"
import { logout } from "../store/authSlice"

function LogoutBtn(){
    const dispatch=useDispatch()

    const LogoutHandler=()=>{
        authService.logout()
            .then(()=>{
                dispatch(logout)
            })
    }
    return (
        <button
        className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
        onSubmit={LogoutHandler}>Logout</button>
    )
}

export default LogoutBtn