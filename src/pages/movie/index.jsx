import { useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { useDispatch, useSelector } from "react-redux";
import { fetchTmdbConfig } from "../../redux/tmdbConfigReducer";
import { fetchTmdbGenres } from "../../redux/tmdbGenresReducer";
import { Link, useLocation, useParams, useSearchParams } from "react-router";
import { useDiscoverApi } from "../../hooks/useDiscoverApi";


export const Movie=()=>{
    const [searchParams, setSearchParams] = useSearchParams();
    const {pathname} = useLocation();
    const dispatch = useDispatch();
    const { tmdbConfig} = useSelector((state) => state.tmdbConfig);
    const { tmdbGenres} = useSelector((state) => state.tmdbGenres);
    const {movies, page, fetchMovie, sort_by} =useDiscoverApi(pathname);

    const handleFetchMoreMovie=()=>{
        const nextPage=page+1;
        dispatch(fetchMovie({
            page:nextPage,
            with_genres:searchParams.get('genreId')?.split(',').join(",") ?? '',
            sort_by:sort_by
        }))
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
        dispatch(fetchMovie({
            page:1,
            with_genres:searchParams.get('genreId')?.split(',').join(",") ?? '',
            sort_by:sort_by
        }))
    }

    const movieCard=movies?.map(movie=>{
        const date = new Date(movie.release_date);
        const formattedDate = date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
        const vote_average=Math.round(movie.vote_average*10);
        const title=movie.title;
        const movieID=movie.id;
        const postalPath=tmdbConfig?.images.base_url+tmdbConfig?.images.poster_sizes[2]+movie.poster_path;
        return(
            <Link to={"/movie/"+movieID} className="rounded-md shadow-sm overflow-hidden" key={movieID}>
                <img className="object-cover w-full h-[242px]" src={postalPath} alt="Not found" />
                <div className="h-[100px] flex flex-col justify-center relative pl-2">
                    <div className="absolute p-1 w-[35px] h-[35px] flex items-center justify-center rounded-full bg-black text-white text-sm font-bold top-[-20%] left-[5%] border-2 border-yellow-300">{vote_average}</div>
                    <h2 className="font-bold">{title}</h2>
                    <h3>{formattedDate}</h3>
                </div>
            </Link>
        )
    })
    
    const genresButton= tmdbGenres?.map(movieGenre=>{
        const selectedId=searchParams.get('genreId')?.split(',') ?? [];
        const isSelected=selectedId.filter(selectedGenre=> selectedGenre === movieGenre.id.toString())[0] ?? false;
        const genreName=movieGenre.name;
        const genreId=movieGenre.id;
        return(
            <button 
                key={genreId} 
                className={twMerge("px-4 py-1 border rounded-3xl ml-2 mb-1 text-[15px]",isSelected ? "border-blue-400 text-white bg-blue-400": "hover:border-blue-400 hover:bg-blue-400 hover:text-white")}
                onClick={()=>handleSelectGenre(genreId)}
            >{genreName}</button>
        )
    })

    useEffect(()=>{
        if(!tmdbConfig){
            dispatch(fetchTmdbConfig())
        }
    },[tmdbConfig])
    useEffect(()=>{
        if(movies.length ===0){
            dispatch(fetchMovie({
                page:1,
                with_genres:searchParams.get('genreId')?.split(',').join(",") ?? '',
                sort_by:sort_by
            }))
        }
    },[movies.length])
    useEffect(()=>{
        if(tmdbGenres.length=== 0){
            dispatch(fetchTmdbGenres())
        }
    },[tmdbGenres])
    useEffect(()=>{
        dispatch(fetchMovie({
            page:1,
            with_genres:searchParams.get('genreId')?.split(',').join(",") ?? '',
            sort_by:sort_by
        }))
    },[sort_by])
    
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