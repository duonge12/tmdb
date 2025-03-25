import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSwipeable } from "react-swipeable";
import { fetchTmdbConfig } from "../../redux/tmdbConfigReducer";
import { fetchTmdbPopularMovie } from "../../redux/tmdbPopularReducer";

export const LastestTrailerBanner=()=>{
    const dispatch = useDispatch();
    const { tmdbPopular} = useSelector((state) => state.tmdbPopularMovie);
    const { tmdbConfig} = useSelector((state) => state.tmdbConfig);
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
    useEffect(()=>{
        if(tmdbPopular.length ===0){
            const params={
                language:'en-US',
                page:1
            }
            dispatch(fetchTmdbPopularMovie(params))
        }
    },[tmdbPopular.length])
    useEffect(()=>{
        if(!tmdbConfig){
            dispatch(fetchTmdbConfig())
        }
    },[tmdbConfig])
    if(tmdbConfig){
        const imgBaseUrl=tmdbConfig?.images.base_url;
        const imgSize=tmdbConfig?.images.poster_sizes;
        return(
            <div className="w-full">
                <div className="container mx-auto">
                    <div className="flex gap-3">
                        <h1>Lastest trailer</h1>
                    </div>
                    <div className="relative w-full">
                        <div
                            ref={scrollRef}
                            {...handlers}
                            className="flex gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 p-2"
                        >
                           {tmdbPopular?.map((movie) =>{
                                const {id, poster_path}=movie;
                                const postalPath=imgBaseUrl+imgSize[1]+poster_path;
                                return(
                                    <div to={"/movie/"+id} className="rounded-md min-w-[150px] shadow-sm" key={id}>
                                        <img className="object-cover w-full h-[225px]" src={postalPath} alt="Not found" />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}