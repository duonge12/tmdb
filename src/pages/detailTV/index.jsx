import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router"
import { useEffect, useState } from "react";
import { fetchAccountInfo } from "../../redux/tmdbAccountReducer";
import { tvSeriesApi } from "../../services/tvSeriesApi";
import { DetailTVBanner } from "./banner";
import { SeriesCast } from "./seriesCast";
import { Recommendation } from "./recommendation";
import { SideInformation } from "./sideInformation";
import { Social } from "./social";

export const DetailTV=()=>{
    const {tvId}= useParams();
    const dispatch = useDispatch();
    const { tmdbAccount} = useSelector((state) => state.tmdbAccount);
    const [ tvDetail, setTvDetail]=useState();

    const handleFetchTV=async()=>{
        const response=await tvSeriesApi.getTVSeriesDetail(tvId)
        if(response){
            setTvDetail(response)
        }
    }
    useEffect(()=>{
        if(!tvDetail){
            handleFetchTV()
        }
    },[tvDetail])

    useEffect(()=>{
        if(!tmdbAccount){
            dispatch(fetchAccountInfo())
        }
    },[tmdbAccount])

    useEffect(()=>{
        handleFetchTV()
    },[tvId])
    
    if(tvDetail && tmdbAccount){
        return(
            <div className="w-full">
                <DetailTVBanner 
                    TVId={tvId}
                    accountId={tmdbAccount.id}
                    tvDetail={tvDetail}
                />
                <div className="flex w-full container mx-auto">
                    <div>
                        <SeriesCast tvID={tvId}/>
                        <Social/>
                        <Recommendation tvId={tvId}/>
                    </div>
                    <div>
                        <SideInformation tvDetail={tvDetail} tvId={tvId}/>
                    </div>
                </div>
            </div>   
        )
    }
}
