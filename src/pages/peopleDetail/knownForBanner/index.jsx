import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { useSwipeable } from "react-swipeable";
import { peopleApi } from "../../../services/peopleApi";

export const KnownForBanner=({personId, imgBaseUrl, imgSize})=>{
    const scrollRef = useRef(null);
    const [ known_for_movies, setKnown_for_movie]=useState()
    const handlers = useSwipeable({
        onSwipedLeft: () => scrollByAmount(200),
        onSwipedRight: () => scrollByAmount(-200),
        preventDefaultTouchmoveEvent: true,
        trackMouse: true,
    });
    const handleFetchKnownForMovie=async()=>{
            const response=await peopleApi.getCombinedCredit(personId)
            if(response){
                setKnown_for_movie(response)
            }
    }
    const scrollByAmount = (amount) => {
        if (scrollRef.current) {
          scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
        }
    };
    useEffect(()=>{
        if(!known_for_movies){
            handleFetchKnownForMovie()
        }
    },[personId])
    return(
        <div className="relative w-full">
            <div
                ref={scrollRef}
                {...handlers}
                className="flex gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 p-2"
            >
                {known_for_movies?.cast.map((movie) =>{
                    const {id, poster_path, credit_id}=movie;
                    const postalPath=imgBaseUrl+imgSize+poster_path;
                    return(
                        <Link to={"/movie/detail/"+id} className="rounded-md min-w-[100px] shadow-sm" key={credit_id}>
                            <img className="object-cover w-full h-[225px]" src={postalPath} alt="Not found" />
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}