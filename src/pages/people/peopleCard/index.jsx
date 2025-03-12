import { Link } from "react-router";

export const PeopleCard=({people, profileBaseURL, profileSize})=>{
    const {id, name, profile_path, known_for}= people;
    const profile_url=profileBaseURL+profileSize+profile_path
    const know_for_movies=known_for.map(movie=> {
        if(movie.media_type ==='movie'){
            return movie.original_title
        }
        return movie.original_name
    }).join(', ')
    return(
        <Link key={id} to={`/person/${id}`} className="flex flex-col shadow-sm">
            <img src={profile_url} className="h-[280px] object-cover" alt="abc" />
            <div className="px-2 pb-2">
                <h1 className="font-bold">{name}</h1>
                <h2 className="text-[12px]">{know_for_movies}</h2>
            </div>
        </Link>
    )
}