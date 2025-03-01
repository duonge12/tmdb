import { createBrowserRouter } from "react-router";
import { App } from "../layouts";
import { Movie } from "../pages/movie";

export const router=createBrowserRouter([
    { path:'/', element:<App/>,
        children:[
            { path:'/', element:<h2>Empty</h2>},
            { path:'/movie', element:<Movie/>},
        ]
    }
])