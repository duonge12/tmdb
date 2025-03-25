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
                to:"/filterPage/movie"
            },
            {
                title:"Now playing",
                to:"/filterPage/movie/now-playing"
            },
            {
                title:"Up coming",
                to:"/filterPage/movie/upcoming"
            },
            {
                title:"Top rated",
                to:"/filterPage/movie/top-rated"
            }
        ]
    },
    {
        title:"TV Shows",
        child:[
            {
                title:"Popular",
                to:"/filterPage/tv"
            },
            {
                title:"Airing Today",
                to:"/filterPage/tv/now-playing"
            },
            {
                title:"On TV",
                to:"/filterPage/tv/upcoming"
            },
            {
                title:"Top rated",
                to:"/filterPage/tv/top-rated"
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
const UserDropDown=({visible,handleToggle,user})=>{
    const dispatch = useDispatch();
    const { tmdbConfig} = useSelector((state) => state.tmdbConfig);
    useEffect(()=>{
        if(!tmdbConfig){
            dispatch(fetchTmdbConfig())
        }
    },[tmdbConfig])

    if(tmdbConfig && user){
        const avatarPath=tmdbConfig.images.base_url+tmdbConfig.images.profile_sizes[2]+user.avatar.tmdb.avatar_path;
        const {username}=user
        return(
            <>
                <img src={avatarPath} onClick={()=>handleToggle(username)} alt="none" className="rounded-full object-cover w-[30px] h-[30px]" />
                {
                    (visible === username) && 
                    <div className="absolute z-20 bg-white rounded-md flex flex-col">
                        { <Link className="py-2 pl-4 pr-12 border-b-[1px]" to={"/account/accountDetail"}>
                            <h1 className="font-bold">{username}</h1>
                            <div className="whitespace-nowrap">View Profile</div>
                        </Link>}
                        <ul>
                            {accountMenuItems.map((accountMenuItem, accountMenuItemIndex)=>{
                            const {title, to}=accountMenuItem
                            return(
                                <li key={accountMenuItemIndex} className="py-2 pl-4 pr-12">
                                <Link to={to}>{title}</Link>
                                </li>
                            )
                        })}
                        </ul>
                    </div>
                }
            </>
        )
    }
}

export const Header=()=>{
    const [visible, setVisible]=useState();
    const dispatch = useDispatch();
    const { tmdbAccount} = useSelector((state) => state.tmdbAccount);
    const handleToggleMenu=(currenVisible)=>{
        if(visible === currenVisible){
            setVisible(undefined);
            return;
        }
        setVisible(currenVisible)
    }

    const menuItemUI=menuItems.map((menuItem, menuItemIndex)=>{
        const {title: category, child: subCategories}=menuItem
        return(
            <div
                key={menuItemIndex}
                className="py-3 px-2 relative"
                onClick={()=>handleToggleMenu(category)}
            >
                <span className="select-none">{category}</span>
                { (visible === category) && 
                    <ul className="absolute z-20 bg-white text-black pl-4 pr-12 whitespace-nowrap rounded-md">
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
    useEffect(()=>{
        console.log(tmdbAccount)
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
                    {tmdbAccount ? 
                        <UserDropDown visible={visible} handleToggle={handleToggleMenu} user={tmdbAccount} /> 
                        : 
                        <Link to={'/login'} className="text-white text-[20px]">Login</Link>
                    }
                </div>
            </div>
        </div>
    )
}