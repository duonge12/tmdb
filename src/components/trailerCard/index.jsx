import { useEffect, useState } from "react"
import { movieApi } from "../../services/movieApi";

export const TrailerDialog=({movieId})=>{
    const [videos, setVideo]=useState();
    const youtubeKey=videos?.results.filter(result=> result.type === "Trailer")[0]?.key ?? ''
    const handleFetchVideos=async()=>{
        const response=await movieApi.getMovieVideo(movieId)
        if(response){
            console.log(response)
            setVideo(response)
        }
    }
    useEffect(()=>{
        if(!videos){
            handleFetchVideos()
        }
    },[])
    return(
       <div></div>
    )
}