import { useDispatch, useSelector } from "react-redux";
import { fetchTmdbConfig } from "../../../redux/tmdbConfigReducer";
import { useEffect } from "react";

export const SideInformation=({personId, personDetail})=>{
    const dispatch = useDispatch();
    const { tmdbConfig} = useSelector((state) => state.tmdbConfig);
    
    useEffect(()=>{
        if(!tmdbConfig){
            dispatch(fetchTmdbConfig())
        }
    },[tmdbConfig])

    if(tmdbConfig){
        const {profile_path, known_for_department, gender, birthday, place_of_birth, also_known_as}=personDetail;
        const actorGender= gender ===1 ? 'Female': "Male";
        const imgBaseUrl=tmdbConfig?.images.base_url ?? '';
        const imgSize=tmdbConfig?.images.profile_sizes[1] ?? '';
        const profilePath=imgBaseUrl+imgSize+profile_path;
        const formattedBirthday = new Date(birthday).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
        return(
            <div>
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
        )
    }
}