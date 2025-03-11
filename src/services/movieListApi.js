import { instance } from "./axios";

export const movieListApi={
    getPopularMovie:async(params)=>{
        return instance.get("/movie/popular",{ params:params});
    },
    
}