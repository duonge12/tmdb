import { useState } from "react";
import { Link } from "react-router";

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


export const Header=()=>{
    const [visible, setVisible]=useState();
    const handleToggleMenu=(currenVisible)=>{
        if(visible === currenVisible){
            setVisible(undefined);
            return;
        }
        setVisible(currenVisible)
    }
    const menuItemUI=menuItems.map((menuItem, menuItemIndex)=>{
        return(
            <div
                key={menuItemIndex}
                className="py-3 px-2 relative"
                onClick={()=>handleToggleMenu(menuItem.title)}
            >
                <span className="select-none">{menuItem.title}</span>
                { (visible === menuItem.title) && 
                    <ul 
                        className="absolute bg-white text-black pl-4 pr-12 whitespace-nowrap rounded-md"
                    >
                        {menuItem.child.map((item, index)=>
                        <li key={index} className="py-2">
                            <Link to={item.to}>{item.title}</Link>
                        </li>)}
                    </ul>
                }
            </div>
        )
    })
    return(
        <div className="bg-[#032541]">
            <div className="container mx-auto">
                <div className="flex items-center">
                    <Link to="/">
                        <img className="w-[154px] h-[20px]" src={imgSrc} alt="tmdb"/>
                    </Link>
                    <div className="flex text-white">{menuItemUI}</div>
                </div>
                <div></div>
            </div>
        </div>
    )
}