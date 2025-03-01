
import { useState } from "react";
import { configApi } from "../../services/configApi";
import { useEffect } from "react";
import { genresApi } from "../../services/genresApi";
import { discoverApi } from "../../services/discoverApi";
import { twMerge } from "tailwind-merge";

export const Movie=()=>{
    const [movies, setMovies]=useState();
    const [currentPage, setCurrentPage]=useState()
    const [selectedGenres, setSelectedGenres]=useState([])
    const [imgBaseURL, setImgBaseURL]=useState();
    const [movieGenres, setMovieGenres]=useState();
    const handleFetchMovie=async(params, refreshData)=>{
        const response=await discoverApi.getMovie(params);
        if(response){
            if(!refreshData){
                const result=[...movies,...response.results];
                setMovies(result)
            }else{
                setCurrentPage(1)
                setMovies(response.results)
            }
        }
    } 
    const handleFetchURL=async()=>{
        const configResponse=await configApi.getImageConfig();
        if(configResponse){
            const {base_url}=configResponse;
            setImgBaseURL(base_url)
        }
    } 
    const handleFetchMovieGenres=async()=>{
        const response=await genresApi.getMovieGenres();
        if(response){
           setMovieGenres(response.genres)
        }
    } 
    const handleFetchMoreMovie=()=>{
        setCurrentPage(currentPage+1);
        handleFetchMovie({
            page:currentPage+1, 
            with_genres:selectedGenres.length !==0 ? selectedGenres.join(",") : ''
        },false)
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
        handleFetchMovie({
            page:1, 
            with_genres:selectedGenres.length !==0 ? selectedGenres.join(",") : ''
        },true)
    }
    const movieCard=movies?.map(movie=>{
        const date = new Date(movie.release_date);
        const formattedDate = date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
        const vote_average=Math.round(movie.vote_average*10)
        return(
            <div className="rounded-md shadow-sm overflow-hidden" key={movie.id}>
                <img className="object-cover w-full h-[150px]" src={`${imgBaseURL}/w220_and_h330_face/${movie.backdrop_path}`} alt="Not found" />
                <div className="h-[100px] flex flex-col justify-center relative pl-2">
                    <div className="absolute p-1 w-[35px] h-[35px] flex items-center justify-center rounded-full bg-black text-white text-sm font-bold top-[-20%] left-[5%] border-2 border-yellow-300">{vote_average}</div>
                    <h2 className="font-bold">{movie.title}</h2>
                    <h3>{formattedDate}</h3>
                </div>
            </div>
        )
    })
    const genresButton=movieGenres?.map(movieGenre=>{
        const isSelected=selectedGenres.filter(selectedGenre=> selectedGenre === movieGenre.id)[0] ?? false;
        return(
            <button 
                key={movieGenre.id} 
                className={twMerge("px-4 py-1 border rounded-3xl ml-2 mb-1 text-[15px]",isSelected ? "border-blue-400 text-white bg-blue-400": "hover:border-blue-400 hover:bg-blue-400 hover:text-white")}
                onClick={()=>handleSelectGenre(movieGenre.id)}
            >{movieGenre.name}</button>
        )
    })
    useEffect(()=>{
        handleFetchMovie({},true);
        handleFetchMovieGenres();
    },[])
    useEffect(()=>{
        handleFetchURL()
    },[imgBaseURL])
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