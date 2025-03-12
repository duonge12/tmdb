import { instance } from "./axios";

export const movieListsApi={
    getPopularMovie:async(params)=>{
        return instance.get("/movie/popular",{ params:params});
    },
    
}