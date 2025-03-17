import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router";
import { fetchTmdbTV } from "../../../redux/tmdbTvReducer";
import { useEffect } from "react";
import { TvCard } from "./tvCard";
import { handleSortBy } from "../../../utils/handleUrl";

export const TV=()=>{
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const {pathname}=useLocation();
    const { tmdbTV, currentPage} = useSelector((state) => state.tmdbTV);
    
    const handleFetchMoreMovie=()=>{
        const params={
            page:currentPage+1,
            with_genres:searchParams.get('genreId')?.split(',').join(",") ?? '',
            sort_by:handleSortBy(pathname)
        }
        dispatch(fetchTmdbTV(params))
    } 

    useEffect(()=>{
        if(tmdbTV.length ===0){
            const params={
                page:searchParams.get('page') ?? 1,
                with_genres:searchParams.get('genreId')?.split(',').join(",") ?? '',
                sort_by:handleSortBy(pathname)
            }
            dispatch(fetchTmdbTV(params))
        }
    },[tmdbTV.length])

    useEffect(()=>{
        const params={
            page:1,
            with_genres:searchParams.get('genreId')?.split(',').join(",") ?? '',
            sort_by:handleSortBy(pathname)
        }
        dispatch(fetchTmdbTV(params))
    },[pathname])
    
    return(
        <div className="p-3">
            <div className="grid grid-cols-5 gap-6">
                {
                    (tmdbTV && tmdbTV.length >0) ?
                        tmdbTV?.map(tv=> <TvCard key={tv.id} tv={tv}/>) :
                        <span>No result</span>
                }
            </div>
            {tmdbTV.length >0 ?  <button className="w-full bg-[#01b4e4] rounded-md text-white font-bold text-[25px] mt-2" onClick={()=>handleFetchMoreMovie()}>LOAD MORE</button> : <></>}
        </div>
    )
}