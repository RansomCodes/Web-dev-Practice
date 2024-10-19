import { useQuery } from "@tanstack/react-query";
import { fetchWeatherByCity, fetchWeatherByCoords } from "../services/api";

export default function useFetchWeather(geoData, searchQuery){
    const { data,error,isLoading } = useQuery({
        queryKey: ['weather',searchQuery || geoData],
        queryFn: () => searchQuery 
            ? fetchWeatherByCity(searchQuery) 
            : fetchWeatherByCoords(geoData),
        enabled: (!!geoData?.latitude || !!geoData.longitude) || !!searchQuery,
    })
    console.log(data);
    return {data,error, isLoading};
}