import { instance } from "./axios";

export const MovieDetailApi={
    getMovieGenres:async(movie_id)=>{
        try{
            const response= await instance.get(`/movie/${movie_id}`);
            if(response){
                return response.data;
            }
        }catch(error){
            throw error;
        }
    }
}