import { instance } from "./axios";

export const discoverApi={
    getMovie:async(params)=>{
        return instance.get("/discover/movie",{ params:params});
    },
    getTV:async(params)=>{
        return instance.get("/discover/tv",{ params:params});
    },
}