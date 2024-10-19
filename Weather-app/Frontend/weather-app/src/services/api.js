import axios from "axios";
const weatherUrl="https://api.openweathermap.org/data/2.5/weather?";
const apiKey = import.meta.env.VITE_API_KEY;

export const fetchWeatherByCoords=async(geoData)=>{
    if(!geoData?.latitude || !geoData?.longitude) return;

    const response=await axios.get(weatherUrl,{
        params: {
            lat: geoData.latitude, 
            lon: geoData.longitude,
            units: 'metric',
            appid: apiKey
        },
    })
    return {currentWeather: response.data};
}

export const fetchWeatherByCity=async(searchQuery)=>{
    if(!searchQuery) return;

    const response=await axios.get(weatherUrl,{
        params: {
            city: searchQuery,
            units: 'metric',
            appid: apiKey
        },
    })
    return {currentWeather: response.data};
}