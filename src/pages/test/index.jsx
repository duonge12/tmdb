
import { useDispatch } from "react-redux";

import { useLocation, useParams, useSearchParams } from "react-router";
import { useDiscoverApi } from "../../hooks/useDiscoverApi";
import { useEffect } from "react";
const popular="/movie";
const now_playing="/movie/now-playing";




export const Test=()=>{
    const obj=popular
    const [searchParams, setSearchParams] = useSearchParams();
    const {pathname} = useLocation();
    const dispatch = useDispatch();
    const {movie, page, fetchMovie, sort_by} =useDiscoverApi(obj);

    useEffect(()=>{
        console.log("movie\n",movie);
        if(movie.length ===0){
            const params={ page:1, with_genres:'', sort_by:sort_by}
            dispatch(fetchMovie(params))
        }
    },[movie])
    
    
    return(
        <div id="test">
            <p>{obj}</p>
        </div>
    )
}