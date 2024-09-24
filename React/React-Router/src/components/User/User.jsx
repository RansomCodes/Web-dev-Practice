import { useParams } from "react-router-dom"

function User(){
    const {userid}=useParams();
    return (
        <div className="bg-pink-500 p-2 flex justify-center items-center font-bold text-white text-xl">User: {userid}</div>
    )
}

export default User