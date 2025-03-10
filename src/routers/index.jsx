import { createBrowserRouter } from "react-router";
import { App } from "../layouts";
import { Movie } from "../pages/movie";
import { DetailMovie } from "../pages/detailMovie";
import { AccountDetail } from "../pages/accountDetail";

export const router=createBrowserRouter([
    { path:'/', element:<App/>,
        children:[
            { path:'/', element:<h2>Empty</h2>},
            { path:'/movie', element:<Movie/>},
            { path:'/movie/:movieId', element:<DetailMovie/>},
            { path:'/account/accountDetail', element:<AccountDetail/>},
        ]
    }
])