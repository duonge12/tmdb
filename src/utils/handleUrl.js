import { fetchTmdbDiscover } from "../redux/tmdbDiscoverReducer";
import { fetchTmdbTV } from "../redux/tmdbTvReducer";

const handleSplitPath=(path)=>{
    const segments = path.split("/").filter(Boolean);
    return segments;
}
const handleSortBy=(pathname)=>{
    const segments=handleSplitPath(pathname);
    let sort_by;
    switch(segments[2]){
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
    return sort_by;
}
const handlFetch=(pathname)=>{
    const segments=handleSplitPath(pathname);
    let fetchFunction;
    switch(segments[1]){
        case "movie":{
            fetchFunction=fetchTmdbDiscover
            break;
        }
        case "tv":{
            fetchFunction=fetchTmdbTV
            break;
        }
    }
    return fetchFunction;
}
const handleTitle=(pathname)=>{
    const segments=handleSplitPath(pathname);
    let title='';
    switch(segments[2]){
        case "now-playing":{
            title+="Now Playing "
            break;
        }
        case "upcoming":{
            title+="Upcoming "
            break;
        }
        case "top-rated":{
            title+="Top Rated "
            break;
        }
        default:{
            title+="Popular ";
            break;
        }
    }
    switch(segments[1]){
        case "movie":{
            title+="Movie"
            break;
        }
        case "tv":{
            title+="TV"
            break;
        }
    }
    return title;
}
export {handleSortBy, handleSplitPath, handlFetch,handleTitle}