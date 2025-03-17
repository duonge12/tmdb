import { useDispatch, useSelector } from "react-redux";
import { fetchTmdbConfig } from "../../../redux/tmdbConfigReducer";
import { useEffect, useRef, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { Link} from "react-router";
import { tvSeriesApi } from "../../../services/tvSeriesApi";

export const Recommendation=({tvId})=>{
    const dispatch = useDispatch();
    const { tmdbConfig} = useSelector((state) => state.tmdbConfig);
    const [ recommendations, setRecommendations]=useState();
    const scrollRef = useRef(null);

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

    const handleFetchRecommendation=async()=>{
        const response=await tvSeriesApi.getTVRecommendation(tvId);
        if(response){
            setRecommendations(response.results)
        }
    }

    useEffect(()=>{
        if(!recommendations){
            handleFetchRecommendation()
        }
    },[recommendations])

    useEffect(()=>{
        handleFetchRecommendation()
    },[tvId])

    useEffect(()=>{
        if(!tmdbConfig){
            dispatch(fetchTmdbConfig())
        }
    },[tmdbConfig])

    if(tmdbConfig){
        const imgBaseUrl=tmdbConfig?.images.base_url;
        const imgSize=tmdbConfig?.images.poster_sizes;
        return(
            <div>
                <div>Recommendation</div>
                <div className="relative w-full">
                    <div
                        ref={scrollRef}
                        {...handlers}
                        className="flex gap-2 overflow-x-auto max-w-[1000px] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 p-2"
                    >
                        {recommendations?.map((recommendation) =>{
                            const {id, original_title, poster_path, vote_average}=recommendation
                            const posterPath=imgBaseUrl+imgSize[1]+poster_path;
                            const formatedVoteAverage=Math.round(vote_average*10)

                            return(
                                <Link to={"/tv/detail/"+id} className="rounded-md min-w-[150px] shadow-sm" key={id}>
                                    <img className="object-cover w-full h-[225px]" src={posterPath} alt="Not found" />
                                    <div className="h-[100px] flex flex-col justify-center relative pl-2">
                                        <div className="flex justify-between">
                                            <h2 className="font-bold">{original_title}</h2>
                                            <span>{formatedVoteAverage} %</span>
                                        </div>
                                        
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}