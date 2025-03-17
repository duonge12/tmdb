import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTmdbConfig } from "../../redux/tmdbConfigReducer";
import { fetchTmdbPopularPeopleList } from "../../redux/tmdbPopularPeopleReducer";
import { PeopleCard } from "./peopleCard";


export const People=()=>{
    const dispatch = useDispatch();
    const { tmdbConfig} = useSelector((state) => state.tmdbConfig);
    const { tmdbPopularPeopleList, currentPage, totalPages} = useSelector((state) => state.tmdbPopularPeopleList);
    const profileBaseURL=tmdbConfig?.images.base_url;
    const profileSize=tmdbConfig?.images.profile_sizes[3];
    
    const handleChangePage=(button)=>{
        if(button ==="Pre"){
            if(currentPage === 1) return;
            else{
                const params={
                    page:currentPage-1,
                    language:"en-US"
                }
                dispatch(fetchTmdbPopularPeopleList(params))
            }
        }if(button ==="Next"){
            if(currentPage === totalPages) return;
            else{
                const params={
                    page:currentPage+1,
                    language:"en-US"
                }
                dispatch(fetchTmdbPopularPeopleList(params))
            }
        }
    }
    useEffect(()=>{
        if(!tmdbConfig){
            dispatch(fetchTmdbConfig())
        }
    },[tmdbConfig])
    useEffect(()=>{
        if(tmdbPopularPeopleList.length ===0){
            const params={
                page:currentPage,
                language:"en-US"
            }
            dispatch(fetchTmdbPopularPeopleList(params))
        }
    },[tmdbPopularPeopleList.length])
    
    return(
        <div>
            <div className="container mx-auto">
                <h1>Popular people</h1>
                <div className="w-full grid grid-cols-4 gap-3">
                    {tmdbPopularPeopleList?.map(people=> <PeopleCard key={people.id} people={people} profileBaseURL={profileBaseURL} profileSize={profileSize}/>)}
                </div>
                <div className="w-full">
                    <div className="mx-auto w-fit mt-4 flex gap-3 items-center">
                        <button className="border rounded-md px-3 py-1" onClick={()=>handleChangePage("Pre")}>Pre</button>
                        <span>{currentPage}</span>
                        <button className="border rounded-md px-3 py-1" onClick={()=>handleChangePage("Next")}>Next</button>
                    </div>
                </div>
            </div>
        </div>
    )
}