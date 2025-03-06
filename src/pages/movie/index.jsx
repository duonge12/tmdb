
import { useState } from "react";
import { useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { useDispatch, useSelector } from "react-redux";
import { fetchTmdbConfig } from "../../redux/tmdbConfigReducer";
import { fetchTmdbDiscover, resetDiscover } from "../../redux/tmdbDiscoverReducer";
import { fetchTmdbGenres } from "../../redux/tmdbGenresReducer";
import { Link } from "react-router";

export const Movie=()=>{
    const dispatch = useDispatch();
    const { tmdbConfig} = useSelector((state) => state.tmdbConfig);
    const { tmdbDiscover} = useSelector((state) => state.tmdbDiscover);
    const { tmdbGenres} = useSelector((state) => state.tmdbGenres);
    const [selectedGenres, setSelectedGenres]=useState([])
    const discoverList=tmdbDiscover.reduce((accumulator, currentValue) => {
        return accumulator.concat(currentValue.results)
      }, []);
    const handleFetchMoreMovie=()=>{
        const currentPage=tmdbDiscover[tmdbDiscover.length-1].page;
        dispatch(fetchTmdbDiscover({
            page:currentPage+1,
            with_genres:selectedGenres.length !==0 ? selectedGenres.join(",") : ''
        }))
    } 
    const handleSelectGenre=(movieGenreId)=>{
        const movieGenre=selectedGenres.filter(selectedGenre=> selectedGenre===movieGenreId)[0]
        if(movieGenre){
            const selectedGenresFiltered=selectedGenres.filter(selectedGenre=> selectedGenre !== movieGenreId)
            setSelectedGenres(selectedGenresFiltered)
        }else{
            selectedGenres.push(movieGenreId);
            setSelectedGenres([...selectedGenres])
        }
    }
    const handleSearch=()=>{
        dispatch(resetDiscover())
    }
    const movieCard=discoverList?.map(movie=>{
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
        const isSelected=selectedGenres.filter(selectedGenre=> selectedGenre === movieGenre.id)[0] ?? false;
        const genreName=movieGenre.name;
        const genreId=movieGenre.id
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
        if(!tmdbDiscover[0]){
            dispatch(fetchTmdbDiscover({
                page:1,
                with_genres:selectedGenres.length !==0 ? selectedGenres.join(",") : ''
            }))
        }
    },[tmdbDiscover])
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