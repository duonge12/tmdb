import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router"
import { fetchTmdbConfig } from "../../redux/tmdbConfigReducer";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { fetchAccountInfo } from "../../redux/tmdbAccountReducer";
import { accountApi } from "../../services/accountApi";
import { fetchFavoriteListInfo } from "../../redux/tmdbAccountFavoriteMovieReducer";
import { moviesApi } from "../../services/moviesApi";

export const DetailMovie=()=>{
    const {movieId}= useParams();
    const dispatch = useDispatch();
    const { tmdbConfig} = useSelector((state) => state.tmdbConfig);
    const { tmdbAccount} = useSelector((state) => state.tmdbAccount);
    const [ movieDetail, setMovieDetail]=useState(undefined);
    const handleFetchMovie=async()=>{
        const response=await moviesApi.getMovieDetail(movieId)
        if(response){
            setMovieDetail(response)
        }
    }
    const handleAddToFavorite=async()=>{
        const {id: movieID }=tmdbAccount ?? {};
        const body={
            "media_type": "movie",
            "media_id": movieId, 
            "favorite": true
        }
        const response=await accountApi.postToFavorite(movieID,body)
        if(response.success){
            const {id: accountId}=tmdbAccount
            const params={ page:1, with_genres:'' }
            dispatch(fetchFavoriteListInfo(accountId,params))
        }
    }
    const imgBaseUrl=tmdbConfig?.images.base_url ?? '';
    const imgSize=tmdbConfig?.images.backdrop_sizes ?? '';
    useEffect(()=>{
        if(!tmdbConfig){
            dispatch(fetchTmdbConfig())
        }
    },[tmdbConfig])
    useEffect(()=>{
        if(!movieDetail){
            handleFetchMovie()
        }
    },[movieDetail])
    useEffect(()=>{
        if(!tmdbAccount){
            dispatch(fetchAccountInfo())
        }
    },[tmdbAccount])

    
    if(movieDetail){
        const {original_title,vote_average, release_date, poster_path, backdrop_path}=movieDetail
        const year=new Date(release_date).getFullYear();
        const formatedVoteAverage=Math.round(vote_average*10);
        const postalPath=imgBaseUrl+imgSize[0]+poster_path;
        const backDrop_path=imgBaseUrl+imgSize[3]+backdrop_path;
        
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
                            <span className="font-bold text-[25px]">{original_title}</span>
                            <span className="text-[25px] ml-2">({year})</span>
                        </div>
                        <div className="text-white">{genres}</div>
                        <div className="text-white">
                            <div className="p-1 w-[50px] h-[50px] flex items-center justify-center rounded-full bg-black text-white text-[20px] font-bold top-[-20%] left-[5%] border-2 border-yellow-300">{formatedVoteAverage}</div>
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
