/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { useLoaderData } from "react-router-dom"

function GitHub(){
    const data=useLoaderData();
    // const [data,setData]=useState([])

    // useEffect(()=>{

    //     const fetchData=async ()=>{
    //         try{
    //             const res=await fetch('https://api.github.com/users/RansomCodes')
    //             const data=await res.json()
    //             console.log(data)
    //             setData(data)
    //         } catch(err)
    //         {
    //             console.error("Error fetching data: ",err)
    //         }
    //     };

    //     fetchData();
    // },[])

    return (
        <>
            <div className="flex justify-around p-2 px-6 h-60 bg-gray-500">
                <img src={data.avatar_url} alt="" />
                <div className="text-center m-4 bg-gray-500 text-white p-4 text-3xl">GitHub Followers: {data.followers}</div>
            </div>
        </>
    )
}


export const githubInfoLoader=async()=>{
    const res=await fetch('https://api.github.com/users/RansomCodes')
    return res.json();
}

export default GitHub