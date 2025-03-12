import { useSearchParams } from "react-router";
import { twMerge } from "tailwind-merge";

export const Genre=({genre})=>{
    const [searchParams, setSearchParams] = useSearchParams();
    const {id,name }=genre;
    const selectedId=searchParams.get('genreId')?.split(',') ?? [];
    const isSelected=selectedId.filter(selectedGenre=> selectedGenre === id.toString())[0] ?? false;
    const updateURLParams = (updatedGenres) => {
        const params={...searchParams}
        if (updatedGenres.length) {
            setSearchParams({...params,genreId: updatedGenres.join(",") });
        } else {
            setSearchParams({...params});
        }
    };
    const handleSelectGenre=(movieGenreId)=>{
        const genreId=movieGenreId.toString()
        
        const selectedGenres=searchParams.get('genreId')?.split(',') ?? []
        let updatedGenres=[]
        if(selectedGenres.length ===0){
            updatedGenres= [...selectedGenres, genreId]
        }
        else if(selectedGenres.includes(genreId)){
            updatedGenres=selectedGenres.filter((id) => id !== genreId)
        }
        else{
            updatedGenres=[...selectedGenres, genreId];
        }
        updateURLParams(updatedGenres);
    }
    return(
        <button 
            key={id} 
            className={twMerge("px-4 py-1 border rounded-3xl ml-2 mb-1 text-[15px]",isSelected ? "border-blue-400 text-white bg-blue-400": "hover:border-blue-400 hover:bg-blue-400 hover:text-white")}
            onClick={()=>handleSelectGenre(id)}
        >{name}</button>
    )
}