import { useSelector } from "react-redux";
import { fetchTmdbDiscover } from "../redux/tmdbDiscoverReducer";
import { fetchTmdbTV } from "../redux/tmdbTvReducer";
const handleSplitPath=(path)=>{
    const segments = path.split("/").filter(Boolean);
    return segments;
}
export const useDiscoverApi=(pathname)=>{
    let sort_by;
    const segments=handleSplitPath(pathname)
    let sliceName='';
    let fetchMovie;
    switch(segments[0]){
        case "movie":{
            sliceName='tmdbDiscover'
            fetchMovie=fetchTmdbDiscover
            break;
        }
        case "tv":{
            sliceName='tmdbTV',
            fetchMovie=fetchTmdbTV
            break;
        }

    }
    switch(segments[1]){
        case "now-playing":{
            sort_by="revenue.desc";
            break;
        }
        case "upcoming":{
            sort_by="primary_release_date.desc";
            break;
        }
        case "top-rated":{
            sort_by="vote_average.desc";
            break;
        }
        default:{
            sort_by="popularity.desc";
            break;
        }
    }

    const { [sliceName]: movies, currentPage:page} = useSelector((state) => state[sliceName])
    
    return {
        movies:movies,
        page:page,
        fetchMovie:fetchMovie, 
        sort_by:sort_by
    };
}