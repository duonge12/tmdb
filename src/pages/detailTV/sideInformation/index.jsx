import { useEffect, useState } from "react";
import { tvSeriesApi } from "../../../services/tvSeriesApi";

export const SideInformation=({tvId, tvDetail})=>{
    const {status, original_name, type, original_language}=tvDetail;
    const [keywords, setKeywords]=useState()
    
    const handleFetchKeyWord=async()=>{
        const response=await tvSeriesApi.getTVKeyWords(tvId);
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
    },[tvId])
    return(
        <div>
            <div className="flex flex-col">
                <div className="flex flex-col"> 
                    <h1 className="font-bold">Facts</h1>
                </div>
                <div className="flex flex-col"> 
                    <h1 className="font-bold">Original name</h1>
                    <span>{original_name}</span>
                </div>
                <div className="flex flex-col"> 
                    <h1 className="font-bold">Status</h1>
                    <span>{status}</span>
                </div>
                <div className="flex flex-col"> 
                    <h1 className="font-bold">NetWork</h1>
                    <span>Coming soon.......</span>
                </div>
                <div className="flex flex-col"> 
                    <h1 className="font-bold">Type</h1>
                    <span>{type}</span>
                </div>
                <div className="flex flex-col"> 
                    <h1 className="font-bold">Original language</h1>
                    <span>{original_language}</span>
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