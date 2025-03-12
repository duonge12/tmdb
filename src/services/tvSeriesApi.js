import { instance } from "./axios";

export const tvSeriesApi={
    getTVSeriesDetail:async(movie_id)=>{
        try{
            const response= await instance.get(`/tv/${movie_id}`);
            if(response){
                return response.data;
            }
        }catch(error){
            throw error;
        }
    },
}