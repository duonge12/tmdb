import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router";
import { fetchTmdbDiscover } from "../../../redux/tmdbDiscoverReducer";
import { handleSortBy } from "../../../utils/handleUrl";
import { MovieCard } from "./movieCard";

export const Movie=()=>{
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const {pathname}=useLocation();
    const { tmdbDiscover, currentPage} = useSelector((state) => state.tmdbDiscover);

    const handleFetchMoreMovie=()=>{
        const params={
            page:currentPage+1,
            with_genres:searchParams.get('genreId')?.split(',').join(",") ?? '',
            sort_by:handleSortBy(pathname)
        }
        dispatch(fetchTmdbDiscover(params))
    } 

    useEffect(()=>{
        if(tmdbDiscover.length ===0){
            const params={
                page:1,
                with_genres:searchParams.get('genreId')?.split(',').join(",") ?? '',
                sort_by:handleSortBy(pathname)
            }
            dispatch(fetchTmdbDiscover(params))
        }
    },[tmdbDiscover.length])

    useEffect(()=>{
        const params={
            page:1,
            with_genres:searchParams.get('genreId')?.split(',').join(",") ?? '',
            sort_by:handleSortBy(pathname)
        }
        dispatch(fetchTmdbDiscover(params))
    },[pathname])
 
    return(
        <div className="p-3">
            <div className="grid grid-cols-5 gap-6">
                {
                    (tmdbDiscover && tmdbDiscover.length >0) ?
                        tmdbDiscover?.map(movie=> <MovieCard key={movie.id} movie={movie}/>) :
                        <span>No result</span>
                }
            </div>
            <button className="w-full bg-[#01b4e4] rounded-md text-white font-bold text-[25px] mt-2" onClick={()=>handleFetchMoreMovie()}>LOAD MORE</button>
        </div>
    )
}