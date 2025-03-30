import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { fetchTmdbConfig } from "../../redux/tmdbConfigReducer";
import { logOut } from "../../redux/tmdbAccountReducer";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";

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
];
const UserDropDown=({visible,handleToggle,user})=>{
    const dispatch = useDispatch();
    const { tmdbConfig} = useSelector((state) => state.tmdbConfig);

    const handleLogout=async() => {
        try {
          await signOut(auth); 
          localStorage.removeItem('session_id')
          dispatch(logOut())
        } catch (error) {
          console.error("Logout failed:", error.message);
        }
    };

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
                            <li className="py-2 pl-4 pr-12">
                                <Link to='/account/discussions'>Discussions</Link>
                            </li>
                            <li className="py-2 pl-4 pr-12">
                                <Link to='/account/lists'>Lists</Link>
                            </li>
                            <li className="py-2 pl-4 pr-12">
                                <Link to='/account/ratings'>Ratings</Link>
                            </li>
                            <li className="py-2 pl-4 pr-12">
                                <Link to='/account/watchlist'>Watchlist</Link>
                            </li>
                            <li className="py-2 pl-4 pr-12">
                                <Link to='/account/edit'>Edit Profile</Link>
                            </li>
                            <li className="py-2 pl-4 pr-12">
                                <Link to='/account/settings'>Settings</Link>
                            </li>
                            <li className="py-2 pl-4 pr-12">
                                <button onClick={handleLogout}>Log out</button>
                            </li>
                        </ul>
                    </div>
                }
            </>
        )
    }
}

export const Header=()=>{
    const [visible, setVisible]=useState();
    const { tmdbAccount} = useSelector((state) => state.tmdbAccount);
    
    const handleToggleMenu=(currenVisible)=>{
        if(visible === currenVisible){
            setVisible(undefined);
            return;
        }
        setVisible(currenVisible)
    }

    return(
        <div className="bg-[#032541]">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    <Link to="/">
                        <img className="w-[154px] h-[20px]" src={imgSrc} alt="tmdb"/>
                    </Link>
                    <div className="flex text-white">
                        {menuItems.map((menuItem, menuItemIndex)=>{
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
                        })}
                    </div>
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