import { instance } from "./axios";

export const genresApi={
    getMovieGenres:async()=>{
        try{
            const response=await instance.get("/genre/movie/list");
            return response.data
        }catch(err){
            throw err
        }
    },
}