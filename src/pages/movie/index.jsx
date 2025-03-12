import { useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { useDispatch, useSelector } from "react-redux";
import { fetchTmdbConfig } from "../../redux/tmdbConfigReducer";
import { fetchTmdbGenres } from "../../redux/tmdbGenresReducer";
import { Link, useLocation, useSearchParams } from "react-router";
import { fetchTmdbDiscover } from "../../redux/tmdbDiscoverReducer";
import { handleSortBy } from "../../utils/handleUrl";
import { MovieCard } from "./movieCard";
import { Genre } from "../../components/genres";




export const Movie=()=>{
    const [searchParams, setSearchParams] = useSearchParams();

    const dispatch = useDispatch();
    const {pathname}=useLocation();
    const { tmdbConfig} = useSelector((state) => state.tmdbConfig);
    const { tmdbGenres} = useSelector((state) => state.tmdbGenres);
    const { tmdbDiscover, currentPage} = useSelector((state) => state.tmdbDiscover);

    const imgBaseUrl=tmdbConfig?.images.base_url;
    const imgSizes=tmdbConfig?.images.poster_sizes;

    const handleFetchMoreMovie=()=>{
        const params={
            page:currentPage+1,
            with_genres:searchParams.get('genreId')?.split(',').join(",") ?? '',
            sort_by:handleSortBy(pathname)
        }
        dispatch(fetchTmdbDiscover(params))
    } 

    const handleSearch=()=>{
        const params={
            page:1,
            with_genres:searchParams.get('genreId')?.split(',').join(",") ?? '',
            sort_by:handleSortBy(pathname)
        }
        dispatch(fetchTmdbDiscover(params))
    }

    useEffect(()=>{
        if(!tmdbConfig){
            dispatch(fetchTmdbConfig())
        }
    },[tmdbConfig])

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

    useEffect(()=>{
        if(tmdbGenres.length=== 0){
            dispatch(fetchTmdbGenres())
        }
    },[tmdbGenres])
  
    return(
        <div>
            <div className="container mx-auto">
                <h1 className="font-[600] text-[1.6rem]">Now playing movies</h1>
                <div className="flex">
                    <div className="w-[300px] rounded-lg shadow-md">
                        <div>{tmdbGenres?.map(genre=> <Genre genre={genre} key={genre.id}/>)}</div>
                        <button 
                            className="w-full bg-[#01b4e4] text-white rounded-md mt-2 font-bold text-[20px]"
                            onClick={()=>handleSearch()}
                        >Search</button>
                    </div>
                    <div className="p-3">
                        <div className="grid grid-cols-5 gap-6">
                        {tmdbDiscover?.map(movie=> <MovieCard movie={movie} imgBaseUrl={imgBaseUrl} imgSizes={imgSizes}/>)}
                        </div>
                        <button className="w-full bg-[#01b4e4] rounded-md text-white font-bold text-[25px] mt-2" onClick={()=>handleFetchMoreMovie()}>LOAD MORE</button>
                    </div>
                </div>
            </div>
        </div>
    )
}