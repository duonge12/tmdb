import { useDispatch, useSelector } from "react-redux";
import { Genre } from "../../../components"
import { fetchTmdbGenres } from "../../../redux/tmdbGenresReducer";
import { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router";
import { handleSortBy, handlFetch } from "../../../utils/handleUrl";
export const FilterPanel=()=>{
    const dispatch = useDispatch();
    const { tmdbGenres} = useSelector((state) => state.tmdbGenres);
    const {pathname}=useLocation();
    const [params]=useSearchParams();

    const handleSearch=()=>{
        const filterParams={
            page:1,
            with_genres:params.get('genreId')?.split(',').join(",") ?? '',
            sort_by:handleSortBy(pathname)
        }
        const filterFunction=handlFetch(pathname);
        dispatch(filterFunction(filterParams))
    }
    
    useEffect(()=>{
            if(tmdbGenres.length=== 0){
                dispatch(fetchTmdbGenres())
            }
    },[tmdbGenres])
    return(
        <div className="w-[300px] rounded-lg shadow-md">
            <div>{tmdbGenres?.map(genre=> <Genre genre={genre} key={genre.id}/>)}</div>
            <button 
                className="w-full bg-[#01b4e4] text-white rounded-md mt-2 font-bold text-[20px]"
                onClick={handleSearch}
            >Search</button>
        </div>
    )
}