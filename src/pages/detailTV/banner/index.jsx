import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTmdbConfig } from "../../../redux/tmdbConfigReducer";
import { Heart } from "lucide-react";
import { accountApi } from "../../../services/accountApi";

export const DetailTVBanner=({
    TVId, 
    accountId,
    tvDetail
})=>{
    const dispatch = useDispatch();
    const { tmdbConfig} = useSelector((state) => state.tmdbConfig);

    const handleAddToFavorite=async()=>{
        const body={
            "media_type": "tv",
            "media_id": TVId, 
            "favorite": true
        }
        const response=await accountApi.postToFavorite(accountId,body)
        if(response.success){
            const params={ page:1, with_genres:'' }
            dispatch(fetchFavoriteListInfo(accountId,params))
        }
    }

    useEffect(()=>{
        if(!tmdbConfig){
            dispatch(fetchTmdbConfig())
        }
    },[tmdbConfig])

    if(tmdbConfig){
        const {original_name,vote_average, first_air_date, poster_path, backdrop_path, tagline}=tvDetail
        const year=new Date(first_air_date).getFullYear();
        const formatedVoteAverage=Math.round(vote_average*10);
        const imgBaseUrl=tmdbConfig?.images.base_url ?? '';
        const imgSize=tmdbConfig?.images.backdrop_sizes ?? '';
        const postalPath=imgBaseUrl+imgSize[0]+poster_path;
        const backDrop_path=imgBaseUrl+imgSize[3]+backdrop_path;
        return(
            <div 
                className='relative w-full py-[30px] bg-purple-500 bg-opacity-50'
                style={{
                    backgroundImage: `url(${backDrop_path})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center 30%",
                    backgroundBlendMode: "multiply",
                }}
            >
                <div className="container mx-auto flex gap-3">
                    <img className="rounded-md" src={postalPath} alt="" />
                    <div className="flex flex-col gap-2">
                        <div className="text-white flex">
                            <span className="font-bold text-[25px]">{original_name}</span>
                            <span className="text-[25px] ml-2">({year})</span>
                        </div>
                        <div className="text-white">
                            {tvDetail.genres.map((genre,genreIndex)=>
                                <>
                                    <span>{genre.name}</span>{genreIndex !== tvDetail.genres.length-1 && <>,</>}
                                </>
                            )}
                        </div>
                        <div className="text-white">
                            <div className="p-1 w-[50px] h-[50px] flex items-center justify-center rounded-full bg-black text-white text-[20px] font-bold top-[-20%] left-[5%] border-2 border-yellow-300">{formatedVoteAverage}</div>
                        </div>
                        <div>
                            <button className="bg-[#032541] p-2 rounded-full"><Heart onClick={handleAddToFavorite} fill="white"/></button>
                        </div>
                        <div>
                            {tagline}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}