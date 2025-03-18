import { Outlet, useLocation } from "react-router"
import { FilterPanel } from "./filterPanel"
import { handleTitle } from "../../utils/handleUrl";

export const FilterPage=()=>{
    const {pathname}=useLocation();
    const title=handleTitle(pathname);
    return(
         <div>
            <div className="container mx-auto">
                <h1 className="font-[600] text-[1.6rem]">{title}</h1>
                <div className="flex">
                    <FilterPanel/>
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}