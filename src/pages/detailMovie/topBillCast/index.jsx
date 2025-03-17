import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSwipeable } from "react-swipeable";
import { fetchTmdbConfig } from "../../../redux/tmdbConfigReducer";
import { moviesApi } from "../../../services/moviesApi";
import { Link } from "react-router";

export const TopBillCast=({movieID})=>{
    const dispatch = useDispatch();
    const { tmdbConfig} = useSelector((state) => state.tmdbConfig);
    const scrollRef = useRef(null);
    const [credits, setCredits]=useState();
    
    const handlers = useSwipeable({
        onSwipedLeft: () => scrollByAmount(200),
        onSwipedRight: () => scrollByAmount(-200),
        preventDefaultTouchmoveEvent: true,
        trackMouse: true,
    });

    const scrollByAmount = (amount) => {
        if (scrollRef.current) {
          scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
        }
    };
    
    const handleFetchCredit=async()=>{
        const response=await moviesApi.getMovieCredits(movieID)
        if(response){
            setCredits(response.cast)
        }
    }

    useEffect(()=>{
        if(!tmdbConfig){
            dispatch(fetchTmdbConfig())
        }
    },[tmdbConfig])

    useEffect(()=>{
        if(!credits){
            handleFetchCredit()
        }
    },[credits])

    useEffect(()=>{
        handleFetchCredit()
    },[movieID])

    if(tmdbConfig){
        const imgBaseUrl=tmdbConfig?.images.base_url;
        const imgSize=tmdbConfig?.images.poster_sizes;
        return(
            <div className="w-full">
                <div className="container mx-auto">
                    <div className="flex gap-3">
                        <h1>Popular</h1>
                    </div>
                    <div className="relative w-full">
                        <div
                            ref={scrollRef}
                            {...handlers}
                            className="flex gap-2 overflow-x-auto max-w-[1000px] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 p-2"
                        >
                           {credits?.map((cast) =>{
                                const {id,credit_id,name, character, profile_path}=cast;
                                const profilePath=imgBaseUrl+imgSize[1]+profile_path;
                                return(
                                    <Link to={"/person/"+id} className="rounded-md min-w-[150px] shadow-sm" key={credit_id}>
                                        <img className="object-cover w-full h-[225px]" src={profilePath} alt="Not found" />
                                        <div className="h-[100px] flex flex-col justify-center relative pl-2">
                                            <h2 className="font-bold">{name}</h2>
                                            <div>{character}</div>
                                           
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}