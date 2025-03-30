import { LastestTrailerBanner, PopularBanner, TrendingBanner } from "../../components"
import { Search } from "./search"

export const Home=()=>{
    return(
        <div>
            <Search/>
            <TrendingBanner/>
            <LastestTrailerBanner/> 
            <PopularBanner/>
        </div>
    )
}