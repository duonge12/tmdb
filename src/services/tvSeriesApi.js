import { instance } from "./axios";

export const tvSeriesApi={
    getTVSeriesDetail:async(tv_id)=>{
        try{
            const response= await instance.get(`/tv/${tv_id}`);
            if(response){
                return response.data;
            }
        }catch(error){
            throw error;
        }
    },
    getTVCredits:async(tv_id)=>{
        try{
            const response= await instance.get(`/tv/${tv_id}/credits`);
            if(response){
                return response.data;
            }
        }catch(error){
            throw error;
        }
    },
    getTVRecommendation:async(tv_id)=>{
        try{
            const response= await instance.get(`/tv/${tv_id}/recommendations`);
            if(response){
                return response.data;
            }
        }catch(error){
            throw error;
        }
    },
    getTVKeyWords:async(tv_id)=>{
        try{
            const response= await instance.get(`/tv/${tv_id}/keywords`);
            if(response){
                return response.data;
            }
        }catch(error){
            throw error;
        }
    },
}