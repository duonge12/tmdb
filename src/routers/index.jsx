import { createBrowserRouter } from "react-router";
import { App } from "../layouts";
import { Movie } from "../pages/movie";
import { DetailMovie } from "../pages/detailMovie";
import { AccountDetail } from "../pages/accountDetail";
import { Home } from "../pages/home";

export const router=createBrowserRouter([
    { path:'/', element:<App/>,
        children:[
            { path:'/', element:<Home/>},
            { path:'/movie', element:<Movie/>},
            { path:'/movie/:movieId', element:<DetailMovie/>},
            { path:'/account/accountDetail', element:<AccountDetail/>},
        ]
    }
])