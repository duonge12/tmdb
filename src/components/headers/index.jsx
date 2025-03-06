import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { fetchTmdbConfig } from "../../redux/tmdbConfigReducer";
import { fetchAccountInfo } from "../../redux/tmdbAccountReducer";

const imgSrc="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg";
const menuItems=[
    {
        title:"Movies",
        child:[
            {
                title:"Popular",
                to:"/movie"
            },
            {
                title:"Now playing",
                to:"/movie/now-playing"
            },
            {
                title:"Up coming",
                to:"/movie/upcoming"
            },
            {
                title:"Top rated",
                to:"/movie/top-rated"
            }
        ]
    },
    {
        title:"TV Shows",
        child:[
            {
                title:"Popular",
                to:"/tv"
            },
            {
                title:"Airing Today",
                to:"/tv/airing-today"
            },
            {
                title:"On TV",
                to:"/tv/on-the-air"
            },
            {
                title:"Top rated",
                to:"/tv/top-rated"
            }
        ]
    },
    {
        title:"People",
        child:[
            {
                title:"Popular people",
                to:"/person"
            }
        ]
    },
    {
        title:"More",
        child:[
            {
                title:"Discussions",
                to:"/discuss"
            },
            {
                title:"Leaderboard",
                to:"/leaderboard"
            },
            {
                title:"Support",
                to:"/talk"
            },
            {
                title:"API documentation",
                to:"#"
            }
        ]
    }
]
const accountMenuItems = [
    { title: "Discussions", to: "/account/discussions" },
    { title: "Lists", to: "/account/lists" },
    { title: "Ratings", to: "/account/ratings" },
    { title: "Watchlist", to: "/account/watchlist" },
    { title: "Edit Profile", to: "/account/edit" },
    { title: "Settings", to: "/account/settings" }
];


export const Header=()=>{
    const [visible, setVisible]=useState();
    const dispatch = useDispatch();
    const { tmdbConfig} = useSelector((state) => state.tmdbConfig);
    const { tmdbAccount} = useSelector((state) => state.tmdbAccount);
    const handleToggleMenu=(currenVisible)=>{
        if(visible === currenVisible){
            setVisible(undefined);
            return;
        }
        setVisible(currenVisible)
    }
    const accountName=tmdbAccount?.username ?? '?'
    const menuItemUI=menuItems.map((menuItem, menuItemIndex)=>{
        const category=menuItem.title;
        const subCategories=menuItem.child
        return(
            <div
                key={menuItemIndex}
                className="py-3 px-2 relative"
                onClick={()=>handleToggleMenu(category)}
            >
                <span className="select-none">{category}</span>
                { (visible === category) && 
                    <ul className="absolute bg-white text-black pl-4 pr-12 whitespace-nowrap rounded-md">
                        {subCategories.map((item, index)=>{
                            const subCategory=item.title;
                            const routerPath=item.to;
                            return(
                                <li key={index} className="py-2">
                                    <Link to={routerPath}>{subCategory}</Link>
                                </li>
                            )
                        }
                        )}
                    </ul>
                }
            </div>
        )
    })
    const accountDropDown=accountMenuItems.map((accountMenuItem, accountMenuItemIndex)=>{
        const title=accountMenuItem.title;
        const routerPath=accountMenuItem.to;
        return(
            <li key={accountMenuItemIndex} className="py-2 pl-4 pr-12">
            <Link to={routerPath}>{title}</Link>
            </li>
        )
    })
    const accountMenuHeader=tmdbAccount && 
    <Link className="py-2 pl-4 pr-12 border-b-[1px]" to={"/account/accountDetail"}>
        <h1 className="font-bold">{accountName}</h1>
        <div className="whitespace-nowrap">View Profile</div>
    </Link>
    
    const accountAvatar=tmdbConfig?.images.base_url+tmdbConfig?.images.profile_sizes[0]+ tmdbAccount?.avatar.tmdb.avatar_path
    useEffect(()=>{
        if(!tmdbConfig){
            dispatch(fetchTmdbConfig())
        }
    },[tmdbConfig])
    useEffect(()=>{
        if(!tmdbAccount){
            dispatch(fetchAccountInfo())
        }
    },[tmdbAccount])
    return(
        <div className="bg-[#032541]">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    <Link to="/">
                        <img className="w-[154px] h-[20px]" src={imgSrc} alt="tmdb"/>
                    </Link>
                    <div className="flex text-white">{menuItemUI}</div>
                </div>
                <div className="relative">
                    <img src={accountAvatar} alt="none" className="rounded-full object-cover w-[30px] h-[30px]" onClick={()=>handleToggleMenu(accountAvatar)}/>
                    {
                        visible === accountAvatar && 
                        <div className="absolute bg-white rounded-md flex flex-col">
                            {accountMenuHeader}
                            <ul>
                                {accountDropDown}
                            </ul>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}