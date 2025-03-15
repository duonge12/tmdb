import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router"
import { fetchTmdbConfig } from "../../redux/tmdbConfigReducer";
import { useEffect, useState } from "react";
import { peopleApi } from "../../services/peopleApi";
import { KnownForBanner } from "./knownForBanner";
import { Acting } from "./acting";

export const PeopleDetail=()=>{
    const {personId}= useParams();
    const dispatch = useDispatch();
    const { tmdbConfig} = useSelector((state) => state.tmdbConfig);
    const [ personDetail, setPersonDetail]=useState();

    const handleFetchPeople=async()=>{
        const response=await peopleApi.getPeopleDetail(personId)
        if(response){
            setPersonDetail(response)
        }
    }
    const imgBaseUrl=tmdbConfig?.images.base_url ?? '';
    const imgSize=tmdbConfig?.images.profile_sizes[1] ?? '';

    useEffect(()=>{
        if(!tmdbConfig){
            dispatch(fetchTmdbConfig())
        }
    },[tmdbConfig])

    useEffect(()=>{
        if(!personDetail){
            handleFetchPeople()
        }
    },[personDetail])

    if(personDetail && tmdbConfig){
        const {profile_path, known_for_department, gender, birthday, place_of_birth, also_known_as, name, biography}=personDetail;
        const actorGender= gender ===1 ? 'Female': "Male";
        const profilePath=imgBaseUrl+imgSize+profile_path;
        const formattedBirthday = new Date(birthday).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
        return(
            <div>
                <div className="container mx-auto flex gap-2">
                    <div className="flex flex-col">
                        <img className="w-[300px] h-[450px] object-cover" src={profilePath} alt="" />
                        <span>Personal information</span>
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col">
                                <span className="font-bold">Known For</span>
                                <span>{known_for_department}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold">Known Credits</span>
                                <span>coming soon...</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold">Gender</span>
                                <span>{actorGender}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold">Birthday</span>
                                <span>{formattedBirthday}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold">Place of Birth</span>
                                <span>{place_of_birth}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold">Also Known As</span>
                                {also_known_as.map((other_name, other_nameIndex)=> <span key={other_nameIndex}>{other_name}</span>)}
                            </div>
                           
                        </div>

                        

                    </div>
                    <div className="flex flex-col flex-1">
                        <h1 className="text-[25px]">{name}</h1>
                        <div>
                            <span className="font-bold">Biography</span>
                            <p className="text-wrap" dangerouslySetInnerHTML={{ __html: biography.replace(/\n/g, "<br>") }} />
                        </div>
                        <div className="max-w-[900px]">
                            <span className="font-bold">Known For</span>
                            <KnownForBanner personId={personId} imgBaseUrl={imgBaseUrl} imgSize={imgSize}/>
                        </div>
                        <div className="max-w-[900px]">
                            <Acting personId={personId}/>
                        </div>
                    </div>  
                </div>
            </div>
        )
    }
}
