import { LastestTrailerBanner, PopularBanner, TrendingBanner } from "../../components"

export const Home=()=>{
    return(
        <div>
            <TrendingBanner/>
            <LastestTrailerBanner/> 
            <PopularBanner/>
        </div>
    )
}