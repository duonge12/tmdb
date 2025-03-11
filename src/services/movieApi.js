import { instance } from "./axios";

export const movieApi={
    getMovieGenres:async(movie_id)=>{
        try{
            const response= await instance.get(`/movie/${movie_id}`);
            if(response){
                return response.data;
            }
        }catch(error){
            throw error;
        }
    },
    getMovieVideo:async(movie_id)=>{
        try{
            const response= await instance.get(`/movie/${movie_id}/videos`);
            if(response){
                return response.data;
            }
        }catch(error){
            throw error;
        }
    }
}