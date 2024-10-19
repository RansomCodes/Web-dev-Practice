/* eslint-disable no-unused-vars */
import { useState } from "react";
import useFetchWeather from "../hooks/useFetchWeather";
import useGeolocation from "../hooks/useGeolocation"

export default function Weather()
{
    const {loading,error,data: geoData} =useGeolocation();
    const [city,setCity] = useState('');
    const [searchQuery,setSearchQuery]=useState('');
    const {data: weatherData,error:apiError,isLoading:apiLoading}=useFetchWeather(geoData);

    if(loading || apiLoading){
        return(
            <p className="text-blue-500 text-lg font-semibold">Loading...</p>
        )
    }

    if(error){
        return (
            <p className="text-red-500 text-lg font-semibold">Error: {error.message}</p>
        )
    }

    if (apiError) {
        return (
            <p className="text-red-500 text-lg font-semibold">API Error: {apiError.message}</p>
        );
    }

    const { currentWeather }= weatherData||{};

    const handleSearch=(e)=>{
        e.preventDefault();
        if(city.trim()){
            console.log(city);
            setSearchQuery(city.trim());
        }
    }

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input 
                    type="text" 
                    placeholder="Enter city name" 
                    className="p-2 border border-gray-300 rounded"
                    value={city}
                    onChange={(e)=>setCity(e.target.value)}
                />
                <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded">Search</button>
            </form>
            { currentWeather ?(
                <div className="mb-8 text-center">
                    <h2 className="text-xl font-semibold mb-2">
                        Current Weather for {currentWeather.name}
                    </h2>
                    <p className="text-2xl font-bold">{Math.round(currentWeather.main.temp)}&deg;C</p>
                    <p className="capitalize">{currentWeather.weather[0].description}</p>
                </div>
            ): (
                <p>No weather Data available</p>
            )}
        </div>
    )
}