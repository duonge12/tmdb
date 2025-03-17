import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { fetchTmdbConfig } from "../../../../redux/tmdbConfigReducer";
import { useEffect } from "react";

export const TvCard=({tv})=>{
    const dispatch = useDispatch();
    const { tmdbConfig} = useSelector((state) => state.tmdbConfig);
     useEffect(()=>{
            if(!tmdbConfig){
                dispatch(fetchTmdbConfig())
            }
    },[tmdbConfig])
    if(tmdbConfig){
        const {first_air_date,vote_average, name, id, poster_path }=tv
        const formattedDate = new Date(first_air_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
        const formattedVoteAverage=Math.round(vote_average*10);
        const imgBaseUrl=tmdbConfig?.images.base_url;
        const imgSizes=tmdbConfig?.images.poster_sizes;
        const postalPath=imgBaseUrl+imgSizes[2]+poster_path;
        return(
            <Link to={`/tv/detail/${id}`} className="rounded-md shadow-sm overflow-hidden" key={id}>
                <img className="object-cover w-full h-[242px]" src={postalPath} alt="Not found" />
                <div className="h-[100px] flex flex-col justify-center relative pl-2">
                    <div className="absolute p-1 w-[35px] h-[35px] flex items-center justify-center rounded-full bg-black text-white text-sm font-bold top-[-20%] left-[5%] border-2 border-yellow-300">{formattedVoteAverage}</div>
                    <h2 className="font-bold">{name}</h2>
                    <h3>{formattedDate}</h3>
                </div>
            </Link>
        )
    }
}