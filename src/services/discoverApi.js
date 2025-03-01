import { instance } from "./axios";

export const discoverApi={
    getMovie:async(params)=>{
        try{
            const response=await instance.get("/discover/movie",{ params:params});
            return response.data
        }catch(err){
            throw err
        }
    },
}