import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSwipeable } from "react-swipeable";
import { Link } from "react-router";
import { fetchTmdbConfig } from "../../redux/tmdbConfigReducer";
import { fetchTmdbPopularMovie } from "../../redux/tmdbPopularReducer";


export const PopularBanner=()=>{
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
    const imgBaseUrl=tmdbConfig?.images.base_url;
    const imgSize=tmdbConfig?.images.poster_sizes;
    const slides=tmdbPopular?.map((movie) =>{
        const {id, title, release_date, vote_average, poster_path}=movie;
        const formattedDate = new Date(release_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
        const formatedVoteAverage=Math.round(vote_average*10);
        const postalPath=imgBaseUrl+imgSize[1]+poster_path;
        return(
            <Link to={"/movie/"+id} className="rounded-md min-w-[150px] shadow-sm" key={id}>
                <img className="object-cover w-full h-[225px]" src={postalPath} alt="Not found" />
                <div className="h-[100px] flex flex-col justify-center relative pl-2">
                    <div className="absolute p-1 w-[35px] h-[35px] flex items-center justify-center rounded-full bg-black text-white text-sm font-bold top-[-20%] left-[5%] border-2 border-yellow-300">{formatedVoteAverage}</div>
                    <h2 className="font-bold">{title}</h2>
                    <h3>{formattedDate}</h3>
                </div>
            </Link>
        )
    })
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
                        className="flex gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 p-2"
                    >
                       {slides}
                    </div>
                </div>
            </div>
        </div>
    )
}