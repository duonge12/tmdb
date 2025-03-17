import { useEffect, useState } from "react";
import { moviesApi } from "../../../services/moviesApi";

export const SideInformation=({movieId, movieDetail})=>{
    const {status, original_language, budget, revenue}=movieDetail;
    const [keywords, setKeywords]=useState()
    
    const handleFetchKeyWord=async()=>{
        const response=await moviesApi.getKeyWords(movieId);
        if(response){
            setKeywords(response.keywords)
        }
    }

    useEffect(()=>{
        if(!keywords){
            handleFetchKeyWord()
        }
    },[keywords])

    useEffect(()=>{
       
        handleFetchKeyWord()
        
    },[movieId])
    return(
        <div>
            <div className="flex flex-col">
                <div className="flex flex-col"> 
                    <h1 className="font-bold">Status</h1>
                    <span>{status}</span>
                </div>
                <div className="flex flex-col"> 
                    <h1 className="font-bold">Original Language</h1>
                    <span>{original_language}</span>
                </div>
                <div className="flex flex-col"> 
                    <h1 className="font-bold">Budget</h1>
                    <span>{budget}</span>
                </div>
                <div className="flex flex-col"> 
                    <h1 className="font-bold">Revenue</h1>
                    <span>{revenue}</span>
                </div>
            </div>
            <div>
                <h1 className="font-bold">Keywords</h1>
                <div>
                    {(keywords && keywords.length>0) ? 
                        keywords?.map((keyword, keywordIndex)=>{
                            if(keywordIndex === keywords.length-1){
                                return <span key={keywordIndex}>{keyword.name}</span>
                            }
                            return<span key={keywordIndex}>{keyword.name} ,</span>
                        })
                        :
                        "No keyword has been added"
                    }
                </div>
            </div>
        </div>
    )
}