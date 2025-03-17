import { instance } from "./axios";

export const moviesApi={
    getMovieDetail:async(movie_id)=>{
        try{
            const response= await instance.get(`/movie/${movie_id}`);
            if(response){
                return response.data;
            }
        }catch(error){
            throw error;
        }
    },
    getMovieCredits:async(movie_id)=>{
        try{
            const response= await instance.get(`/movie/${movie_id}/credits`);
            if(response){
                return response.data;
            }
        }catch(error){
            throw error;
        }
    },
    getKeyWords:async(movie_id)=>{
        try{
            const response= await instance.get(`/movie/${movie_id}/keywords`);
            if(response){
                return response.data;
            }
        }catch(error){
            throw error;
        }
    },
    getRecommendation:async(movie_id)=>{
        try{
            const response= await instance.get(`/movie/${movie_id}/recommendations`);
            if(response){
                return response.data;
            }
        }catch(error){
            throw error;
        }
    },
}