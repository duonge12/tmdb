import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router"
import { useEffect, useState } from "react";
import { fetchAccountInfo } from "../../redux/tmdbAccountReducer";
import { moviesApi } from "../../services/moviesApi";
import { DetailMovieBanner } from "./banner";
import { TopBillCast } from "./topBillCast";
import { SideInformation } from "./sideInfromation";
import { Recommendation } from "./recommendation";
import { Social } from "./social";

export const DetailMovie=()=>{
    const {movieId}= useParams();
    const dispatch = useDispatch();
    const { tmdbAccount} = useSelector((state) => state.tmdbAccount);
    const [ movieDetail, setMovieDetail]=useState(undefined);

    const handleFetchMovie=async()=>{
        const response=await moviesApi.getMovieDetail(movieId)
        if(response){
            setMovieDetail(response)
        }
    }
    
    useEffect(()=>{
        if(!movieDetail){
            handleFetchMovie()
        }
    },[movieDetail])

    useEffect(()=>{
        
        handleFetchMovie()
       
    },[movieId])
    
    useEffect(()=>{
        if(!tmdbAccount){
            dispatch(fetchAccountInfo())
        }
    },[tmdbAccount])

    
    if(movieDetail && tmdbAccount){
        return(
            <div>
                <DetailMovieBanner 
                    movieId={movieId}
                    accountId={tmdbAccount.id}
                    movieDetail={movieDetail}
                />
                <div className="w-full">
                    <div className="container mx-auto flex">
                        <div>
                            <TopBillCast movieID={movieId}/>
                            <Social/>
                            <Recommendation movieID={movieId}/>
                        </div>
                        <div>
                            <SideInformation 
                                movieId={movieId}
                                movieDetail={movieDetail}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
