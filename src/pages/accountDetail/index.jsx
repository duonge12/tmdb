import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTmdbConfig } from "../../redux/tmdbConfigReducer";
import { fetchAccountInfo } from "../../redux/tmdbAccountReducer";
import { fetchFavoriteListInfo, removeFromFavoriteList } from "../../redux/tmdbAccountFavoriteMovie";
import { X } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { accountApi } from "../../services/accountApi";






export const AccountDetail=()=>{
    const dispatch = useDispatch();
    const { tmdbConfig} = useSelector((state) => state.tmdbConfig);
    const { tmdbAccount} = useSelector((state) => state.tmdbAccount);
    const { tmdbFavoriteList} = useSelector((state) => state.tmdbFavoriteList);

    const avatarPath=tmdbAccount?.avatar.tmdb.avatar_path;
    const imgBaseUrl=tmdbConfig?.images.base_url;
    const avatarSize=tmdbConfig?.images.profile_sizes[1];
    const accountName=tmdbAccount?.username;
    const accountId=tmdbAccount?.id

    const handleRemoveFromFavorite=async(favoriteID)=>{
        const {id: accountId }=tmdbAccount ?? {};
        const body={
            "media_type": "movie",
            "media_id": favoriteID, 
            "favorite": false
        }
        const response=await accountApi.postToFavorite(accountId,body)
        if(response.success){
            dispatch(removeFromFavoriteList(favoriteID))
        }
    }

    const favoriteRows=tmdbFavoriteList.map((favoriteItem,favoriteIndex)=>{
        const title=favoriteItem.title
        const posterPath=favoriteItem.poster_path;
        const posterSize=tmdbConfig?.images.poster_sizes[1];
        const vote_average=Math.round(favoriteItem.vote_average*10);
        const overview=favoriteItem.overview;
        const favoriteID=favoriteItem.id;
        const ButtonRemove=()=>{
            const [isHover, setIsHover]=useState(false)
           
            return(
                <button 
                    className="flex gap-2 text-pink-500 items-center" 
                    onMouseOver={()=>setIsHover(true)} 
                    onMouseLeave={()=>setIsHover(false)}
                    onClick={()=>handleRemoveFromFavorite(favoriteID)}
                >
                    <X className={twMerge("bg-white border border-pink-500 p-1 rounded-full", isHover && "bg-pink-500 text-white")}/> 
                    <span>Remove</span>
                    </button>
            )
        }
        return(
            <div key={favoriteIndex} className="flex gap-3">
                <img className="w-[135px] h-[200px]" src={imgBaseUrl+posterSize+posterPath} alt="" />
                <div className="flex flex-col gap-3">
                    <div className="flex pt-3 gap-2">
                        <div className="p-1 w-[40px] h-[40px] flex items-center justify-center rounded-full bg-black text-white text-[20px] font-bold border-2 border-yellow-300">{vote_average}</div>
                        <h1 className="text-[20px] font-bold">{title}</h1>
                    </div>
                    <p>{overview}</p>
                    <div>
                        <ButtonRemove/>
                    </div>
                </div>
            </div>
        )
    })
    useEffect(()=>{
        if(!tmdbConfig){
            dispatch(fetchTmdbConfig())
        }
    },[tmdbConfig]);
    useEffect(()=>{
        if(!tmdbAccount){
            dispatch(fetchAccountInfo())
        }
    },[tmdbAccount]);
    useEffect(()=>{
        if(!tmdbFavoriteList[0]){
            dispatch(fetchFavoriteListInfo(accountId,{
                page:1,
                with_genres:''
            }))
        }
    },[tmdbFavoriteList.length]);
    return(
        <div className="w-full">
            <div className="container mx-auto">
                <div className="flex py-3 bg-blue-300">
                    <img src={imgBaseUrl+avatarSize+avatarPath} alt="" className="rounded-full"/>
                    <div className="pl-3">
                        <h1 className="text-[25px] font-bold">{accountName}</h1>
                    </div>
                </div>
                <div>
                    <h1 className="text-[20px] font-bold">My favorite</h1>
                    <div className="flex flex-col gap-2">
                    {favoriteRows}
                    </div>
                </div>
            </div>
        </div>
    )
}