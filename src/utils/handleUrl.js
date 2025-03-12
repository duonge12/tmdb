const handleSplitPath=(path)=>{
    const segments = path.split("/").filter(Boolean);
    return segments;
}
const handleSortBy=(pathname)=>{
    const segments=handleSplitPath(pathname);
    let sort_by;
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
    return sort_by;
}
export {handleSortBy, handleSplitPath}