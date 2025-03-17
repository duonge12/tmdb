import { useParams } from "react-router"
import { useEffect, useState } from "react";
import { peopleApi } from "../../services/peopleApi";
import { KnownForBanner } from "./knownForBanner";
import { Acting } from "./acting";
import { SideInformation } from "./sideInformation";
import { PersonBiography } from "./biography";

export const PeopleDetail=()=>{
    const {personId}= useParams();
    const [ personDetail, setPersonDetail]=useState();

    const handleFetchPeople=async()=>{
        const response=await peopleApi.getPeopleDetail(personId)
        if(response){
            setPersonDetail(response)
        }
    }

    useEffect(()=>{
        if(!personDetail){
            handleFetchPeople()
        }
    },[personDetail])

    if(personDetail){
        return(
            <div>
                <div className="container mx-auto flex gap-2">
                    <div className="flex flex-col">
                        <SideInformation personId={personId} personDetail={personDetail}/>
                    </div>
                    <div className="flex flex-col flex-1">
                        <PersonBiography personDetail={personDetail}/>
                        <KnownForBanner personId={personId}/>
                        <Acting personId={personId}/>
                        
                    </div>  
                </div>
            </div>
        )
    }
}
