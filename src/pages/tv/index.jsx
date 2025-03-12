import { useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { useDispatch, useSelector } from "react-redux";
import { fetchTmdbConfig } from "../../redux/tmdbConfigReducer";
import { fetchTmdbGenres } from "../../redux/tmdbGenresReducer";
import { Link, useLocation, useSearchParams } from "react-router";
import { handleSortBy } from "../../utils/handleUrl";
import { fetchTmdbTV } from "../../redux/tmdbTvReducer";


export const TV=()=>{
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();
    const {pathname}=useLocation();
    const { tmdbConfig} = useSelector((state) => state.tmdbConfig);
    const { tmdbGenres} = useSelector((state) => state.tmdbGenres);
    const { tmdbTV, currentPage} = useSelector((state) => state.tmdbTV);

    const imgBaseUrl=tmdbConfig?.images.base_url;
    const imgSizes=tmdbConfig?.images.poster_sizes;
    const handleFetchMoreMovie=()=>{
        const params={
            page:currentPage+1,
            with_genres:searchParams.get('genreId')?.split(',').join(",") ?? '',
            sort_by:handleSortBy(pathname)
        }
        dispatch(fetchTmdbTV(params))
    } 
    const updateURLParams = (updatedGenres) => {
        const params={...searchParams}
        if (updatedGenres.length) {
            setSearchParams({...params,genreId: updatedGenres.join(",") });
        } else {
            setSearchParams({...params});
        }
    };
    const handleSelectGenre=(movieGenreId)=>{
        const genreId=movieGenreId.toString()
        
        const selectedGenres=searchParams.get('genreId')?.split(',') ?? []
        let updatedGenres=[]
        if(selectedGenres.length ===0){
            updatedGenres= [...selectedGenres, genreId]
        }
        else if(selectedGenres.includes(genreId)){
            updatedGenres=selectedGenres.filter((id) => id !== genreId)
        }
        else{
            updatedGenres=[...selectedGenres, genreId];
        }
        updateURLParams(updatedGenres);
    }
    const handleSearch=()=>{
        const params={
            page:1,
            with_genres:searchParams.get('genreId')?.split(',').join(",") ?? '',
            sort_by:handleSortBy(pathname)
        }
        dispatch(fetchTmdbTV(params))
    }
    const movieCard=tmdbTV?.map(movie=>{
        const {first_air_date,vote_average, name, id, poster_path }=movie
        const formattedDate = new Date(first_air_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
        const formattedVoteAverage=Math.round(vote_average*10);
        const postalPath=imgBaseUrl+imgSizes[2]+poster_path;
        return(
            <Link to={`/movie/detail/${id}`} className="rounded-md shadow-sm overflow-hidden" key={id}>
                <img className="object-cover w-full h-[242px]" src={postalPath} alt="Not found" />
                <div className="h-[100px] flex flex-col justify-center relative pl-2">
                    <div className="absolute p-1 w-[35px] h-[35px] flex items-center justify-center rounded-full bg-black text-white text-sm font-bold top-[-20%] left-[5%] border-2 border-yellow-300">{formattedVoteAverage}</div>
                    <h2 className="font-bold">{name}</h2>
                    <h3>{formattedDate}</h3>
                </div>
            </Link>
        )
    })
    
    const genresButton= tmdbGenres?.map(movieGenre=>{
        const {id,name }=movieGenre;
        const selectedId=searchParams.get('genreId')?.split(',') ?? [];
        const isSelected=selectedId.filter(selectedGenre=> selectedGenre === id.toString())[0] ?? false;
        return(
            <button 
                key={id} 
                className={twMerge("px-4 py-1 border rounded-3xl ml-2 mb-1 text-[15px]",isSelected ? "border-blue-400 text-white bg-blue-400": "hover:border-blue-400 hover:bg-blue-400 hover:text-white")}
                onClick={()=>handleSelectGenre(id)}
            >{name}</button>
        )
    })

    useEffect(()=>{
        if(!tmdbConfig){
            dispatch(fetchTmdbConfig())
        }
    },[tmdbConfig])
    useEffect(()=>{
        if(tmdbTV.length ===0){
            const params={
                page:1,
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
                        <div>{genresButton}</div>
                        <button 
                            className="w-full bg-[#01b4e4] text-white rounded-md mt-2 font-bold text-[20px]"
                            onClick={()=>handleSearch()}
                        >Search</button>
                    </div>
                    <div className="p-3">
                        <div className="grid grid-cols-5 gap-6">
                        {movieCard}
                        </div>
                        <button className="w-full bg-[#01b4e4] rounded-md text-white font-bold text-[25px] mt-2" onClick={()=>handleFetchMoreMovie()}>LOAD MORE</button>
                    </div>
                </div>
            </div>
        </div>
    )
}