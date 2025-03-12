import { createBrowserRouter, Outlet } from "react-router";
import { App } from "../layouts";
import { Movie } from "../pages/movie";
import { DetailMovie } from "../pages/detailMovie";
import { AccountDetail } from "../pages/accountDetail";
import { Home } from "../pages/home";
import { Test } from "../pages/test";

export const router=createBrowserRouter([
    { path:'/', element:<App/>,
        children:[
            { path:'', element:<Home/>},
            { path:'/movie', element:<><Outlet/></>, children:[
                { index: true, element: <Movie /> },
                { path: ":subCategory", element: <Movie /> },
            ]},
            { path:'/tv', element:<><Outlet/></>, children:[
                { index: true, element: <Movie /> },
                { path: ":subCategory", element: <Movie /> },
            ]},
            { path:'/test', element:<Test/>},
            { path:'/movie/:movieId', element:<DetailMovie/>},
            { path:'/account/accountDetail', element:<AccountDetail/>},
        ]
    }
])