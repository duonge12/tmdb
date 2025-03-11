import { instance } from "./axios";

export const trendingApi={
    getTrendingMovie:async(params)=>{  
        const {time_window,language}=params
        return instance.get(`/trending/movie/${time_window}`,{ params:{
            language:language
        }});
    }
}