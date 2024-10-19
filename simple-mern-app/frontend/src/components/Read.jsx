import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Read() {
  const [allData, setAllData] = useState([]);
  const [error, setError] = useState('');

  async function getData() {
    const response = await fetch("http://localhost:3000");
    const result = await response.json();

    if (!response.ok) {
      setError(result.error);
    } else {
      setAllData(result);
      setError('');
    }
  }

  const handleDelete=async(id)=>{
    const response=await fetch(`http://localhost:3000/${id}`,{
      method: "DELETE",
    })

    const result=await response.json();

    if (!response.ok) {
      setError(result.error);
    } else {
      setError('Deleted Successfully!!')

      setTimeout(()=>{
        setError("");
        getData();
      },1000);
    }
  }

  useEffect(() => {
    getData();
  }, [])


  return (
    <div>
      {error && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {error}
        </div>
        }
      <div className='flex flex-wrap'>
        {allData?.map((ele) => {
          return (
            <div key={ele._id} className="m-5">
              <div className="w-80 h-auto p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">{ele.name}</h5>
                <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                  Howdy!! {ele.name}, seems like you registered using {ele.email}, and your age is {ele.age}, which is quite great!!
                </p>
                <div className="flex space-x-5">
                  <Link to={`/${ele._id}`} className="font-medium text-blue-600 hover:underline">
                    Edit
                  </Link>
                  <button className="font-medium text-red-400 hover:underline" 
                    onClick={()=>handleDelete(ele._id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Read