import { createBrowserRouter, Outlet } from "react-router";
import { App } from "../layouts";
import { AccountDetail, DetailMovie, DetailTV, Home, Movie, People, PeopleDetail, Test, TV } from "../pages";

export const router=createBrowserRouter([
    { path:'/', element:<App/>,
        children:[
            { path:'', element:<Home/>},
            { path:'/movie', element:<><Outlet/></>, children:[
                { index: true, element: <Movie /> },
                { path: ":subCategory", element: <Movie /> },
            ]},
            { path:'/tv', element:<><Outlet/></>, children:[
                { index: true, element: <TV /> },
                { path: ":subCategory", element: <TV /> },
            ]},
            { path:'/person', element:<People/>},
            { path:'/test', element:<Test/>},
            { path:'/movie/detail/:movieId', element:<DetailMovie/>},
            { path:'/tv/detail/:tvId', element:<DetailTV/>},
            { path:'/person/:personId', element:<PeopleDetail/>},
            { path:'/account/accountDetail', element:<AccountDetail/>},
        ]
    }
])