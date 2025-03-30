import { Heart } from "lucide-react";
import { accountApi } from "../../../services/accountApi";
import { useDispatch, useSelector } from "react-redux";
import { fetchTmdbConfig } from "../../../redux/tmdbConfigReducer";
import { useEffect, useState } from "react";
import { fetchFavoriteListInfo } from "../../../redux/tmdbAccountFavoriteMovieReducer";
import { moviesApi } from "../../../services/moviesApi";

export const DetailMovieBanner=({
    movieId,
    movieDetail
})=>{
    const dispatch = useDispatch();
    const { tmdbConfig} = useSelector((state) => state.tmdbConfig);
    const { tmdbAccount} = useSelector((state) => state.tmdbAccount);
    const [crews, setCrews]=useState()
    const handleFetchCrew=async()=>{
        const response=await moviesApi.getMovieCredits(movieId)
        if(response){
            setCrews(response.crew)
        }
    }
    const handleAddToFavorite=async()=>{
        const {id}=tmdbAccount
        const body={
            "media_type": "movie",
            "media_id": movieId, 
            "favorite": true
        }
        const response=await accountApi.postToFavorite(id,body)
        if(response.success){
            const params={ page:1, with_genres:'' }
            dispatch(fetchFavoriteListInfo(id,params))
        }
    }
    const handleFilterDirector=()=>{
        if(crews){
            const directorId=crews.filter(crew=>crew.department ==="Directing").map(crew=> crew.id)
            const directorList= directorId.map(id=>{
                const director=crews.reduce((acc, curr)=>{
                    if(curr.id === id){
                        acc.name=curr.name
                        acc.jobs.push(curr.job);
                    }
                    return acc;
                },{ id:id, jobs:[]});
                return director
            })
            return directorList
        }
        return []
    }

    useEffect(()=>{
        if(!tmdbConfig){
            dispatch(fetchTmdbConfig())
        }
    },[tmdbConfig])
    useEffect(()=>{
        if(!crews){
            handleFetchCrew()
        }
    },[crews])
    useEffect(()=>{
        handleFetchCrew()
    },[movieId])

    if(tmdbConfig){
        const imgBaseUrl=tmdbConfig?.images.base_url ?? '';
        const imgSize=tmdbConfig?.images.backdrop_sizes ?? '';
        const {original_title,vote_average, release_date, poster_path, backdrop_path, genres, tagline, overview}=movieDetail
        const year=new Date(release_date).getFullYear();
        const formatedVoteAverage=Math.round(vote_average*10);
        const postalPath=imgBaseUrl+imgSize[0]+poster_path;
        const backDrop_path=imgBaseUrl+imgSize[3]+backdrop_path;
        return(
            <div 
                className='relative w-full py-[30px] bg-opacity-50'
                style={{
                    background:'oklch(0.627 0.265 303.9)',
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
                        <div className="text-white">
                            {genres.map((genre,genreIndex)=>
                                <>
                                    <span>{genre.name}</span>{genreIndex !== genres.length-1 && <>,</>}
                                </>
                            )}
                        </div>
                        <div className="text-white">
                            <div className="p-1 w-[50px] h-[50px] flex items-center justify-center rounded-full bg-black text-white text-[20px] font-bold top-[-20%] left-[5%] border-2 border-yellow-300">{formatedVoteAverage}</div>
                        </div>
                        <div>
                            {tmdbAccount ? 
                                <button className="bg-[#032541] p-2 rounded-full" onClick={()=>handleAddToFavorite()}><Heart fill="white"/></button>
                                :
                                <div className="bg-[#032541] p-2 rounded-full w-fit" title="need to login"><Heart fill="white"/></div>
                            }
                        </div>
                        <div className="text-gray-500">
                           {tagline}
                        </div>
                        <div className="text-white">
                            <div className="font-bold">Overview</div>
                            <div>{overview}</div>
                        </div>
                        <div className="flex text-white gap-5 flex-wrap">
                            {handleFilterDirector().length !==0 && handleFilterDirector().map(director=>{
                                const {name, id, jobs}=director
                                return(
                                    <div key={id}>
                                        <div className="font-bold">{name}</div>
                                        <div className="whitespace-nowrap">
                                            {jobs.join(', ')}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>    
            </div>
        )
    }
}