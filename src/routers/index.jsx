import { createBrowserRouter, Outlet } from "react-router";
import { App } from "../layouts";
import { FilterPage } from "../pages/filterPage";
import { Movie } from "../pages/filterPage/movie";
import { Home } from "../pages/home";
import { TV } from "../pages/filterPage/tv";
import { People } from "../pages/people";
import { DetailMovie } from "../pages/detailMovie";
import { DetailTV } from "../pages/detailTV";
import { PeopleDetail } from "../pages/peopleDetail";
import { AccountDetail } from "../pages/accountDetail";
import { Login } from "../pages/login";

export const router=createBrowserRouter([
    { path:'/', element:<App/>,
        children:[
            { index: true, element:<Home/>},
            { path:'/filterPage/', element:<FilterPage/>, children:[
                { path:'movie', element:<><Outlet/></>, children:[
                    { index: true, element: <Movie /> },
                    { path: ":subCategory", element: <Movie /> },
                ]},
                { path:'tv', element:<><Outlet/></>, children:[
                        { index: true, element: <TV /> },
                        { path: ":subCategory", element: <TV /> },
                ]},
            ]},
            { path:'/person', element:<People/>},
            { path:'/login', element:<Login/>},
            { path:'/movie/detail/:movieId', element:<DetailMovie/>},
            { path:'/tv/detail/:tvId', element:<DetailTV/>},
            { path:'/person/:personId', element:<PeopleDetail/>},
            { path:'/account/accountDetail', element:<AccountDetail/>},
        ]
    }
])