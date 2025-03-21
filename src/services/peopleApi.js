import { instance } from "./axios";

export const peopleApi={
    getPeopleDetail:async(peopleId)=>{
        try{
            const response= await instance.get(`/person/${peopleId}`);
            if(response){
                return response.data;
            }
        }catch(error){
            throw error;
        }
    },
    getCombinedCredit:async(peopleId)=>{
        try{
            const response= await instance.get(`/person/${peopleId}/combined_credits`);
            if(response){
                return response.data;
            }
        }catch(error){
            throw error;
        }
    },
    getMovieCredits:async(peopleId)=>{
        try{
            const response= await instance.get(`/person/${peopleId}/movie_credits`);
            if(response){
                return response.data;
            }
        }catch(error){
            throw error;
        }
    },
    getTVCredits:async(peopleId)=>{
        try{
            const response= await instance.get(`/person/${peopleId}/tv_credits`);
            if(response){
                return response.data;
            }
        }catch(error){
            throw error;
        }
    },
}