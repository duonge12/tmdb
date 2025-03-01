import { instance } from "./axios";

export const configApi={
    getImageConfig:async()=>{
        try{
            const response=await instance.get("/configuration");
            return response.data.images
        }catch(err){
            throw err
        }
    }
}