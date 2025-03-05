import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router"
import { fetchTmdbConfig } from "../../redux/tmdbConfigReducer";
import { useEffect, useState } from "react";
import { MovieDetailApi } from "../../services/movieDetailApi";
import { Heart } from "lucide-react";
import { fetchAccountInfo } from "../../redux/tmdbAccountReducer";
import { accountApi } from "../../services/accountApi";

export const DetailMovie=()=>{
    const {movieId}= useParams();
    const dispatch = useDispatch();
    const { tmdbConfig} = useSelector((state) => state.tmdbConfig);
    const { tmdbAccount, loading_tmdbAccount} = useSelector((state) => state.tmdbAccount);
    const [ movieDetail, setMovieDetail]=useState(undefined);
    const handleFetchMovie=async()=>{
        const response=await MovieDetailApi.getMovieGenres(movieId)
        if(response){
            console.log(response)
            setMovieDetail(response)
        }
    }
    const handleAddToFavorite=async()=>{
        const {id: movieID }=tmdbAccount;
        const body={
            "media_type": "movie",
            "media_id": movieId, 
            "favorite": true
        }
        const response=await accountApi.addToFavorite(movieID,body)
        if(!response.success){
            alert('fail to add to favorite')
        }
    }
    useEffect(()=>{
        if(!tmdbConfig){
            dispatch(fetchTmdbConfig())
        }
        if(!movieDetail){
            handleFetchMovie()
        }
        if(!tmdbAccount){
            dispatch(fetchAccountInfo())
        }
    },[tmdbConfig,movieDetail,tmdbAccount])
    
    if(movieDetail && tmdbConfig){
        const year=new Date(movieDetail.release_date).getFullYear();
        const vote_average=Math.round(movieDetail.vote_average*10);
        const postalPath=tmdbConfig.images.base_url+tmdbConfig.images.backdrop_sizes[0]+movieDetail.poster_path;
        const originalTitle=movieDetail.original_title;
        const backDrop_path=tmdbConfig.images.base_url+tmdbConfig.images.backdrop_sizes[3]+movieDetail.backdrop_path;
        
        const genres=movieDetail.genres.map((genre,genreIndex)=>
            <>
                <span>{genre.name}</span>{genreIndex !== movieDetail.genres.length-1 && <>,</>}
            </>
        )
        return(
            <div 
                className='relative w-full py-[30px] bg-purple-500 bg-opacity-50'
                style={{
                    backgroundImage: `url(${backDrop_path})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center 30%",
                    backgroundBlendMode: "multiply",
                }}
            >
                <div className="container mx-auto flex gap-3">
                    <img className="rounded-md" src={postalPath} alt="" />
                    <div className="flex flex-col gap-2">
                        <div className="text-white">
                            <span className="font-bold text-[25px]">{originalTitle}</span>
                            <span className="text-[25px] ml-2">({year})</span>
                        </div>
                        <div className="text-white">{genres}</div>
                        <div className="text-white">
                            <div className="p-1 w-[50px] h-[50px] flex items-center justify-center rounded-full bg-black text-white text-[20px] font-bold top-[-20%] left-[5%] border-2 border-yellow-300">{vote_average}</div>
                        </div>
                        <div>
                            <button className="bg-[#032541] p-2 rounded-full" onClick={()=>handleAddToFavorite()}><Heart fill="white"/></button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
