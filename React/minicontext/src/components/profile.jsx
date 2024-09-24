/* eslint-disable no-unused-vars */
import React,{useContext} from 'react'
import UserContext from '../context/UserContext'

function Profile(){
    const {user}=useContext(UserContext)
    if(!user) return <>Please Login</>
    else return <>Welcome, {user.username}</>
}

export default Profile