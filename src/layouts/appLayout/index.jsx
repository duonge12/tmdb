import { Outlet } from "react-router"
import { Header } from "../../components"

export const App=()=>{
    return(
        <div className="bg-white">
            <Header/>
            <Outlet/>
        </div>
    )
}