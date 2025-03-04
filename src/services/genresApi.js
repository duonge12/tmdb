import { instance } from "./axios";

export const genresApi={
    getMovieGenres:async()=>{
        return instance.get("/genre/movie/list");
    },
}