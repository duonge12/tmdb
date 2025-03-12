import { useRef } from "react";
import { Link } from "react-router";
import { useSwipeable } from "react-swipeable";

export const KnownForBanner=({known_for_movies, imgBaseUrl, imgSize})=>{
    const scrollRef = useRef(null);
    const handlers = useSwipeable({
        onSwipedLeft: () => scrollByAmount(200),
        onSwipedRight: () => scrollByAmount(-200),
        preventDefaultTouchmoveEvent: true,
        trackMouse: true,
    });

    const scrollByAmount = (amount) => {
        if (scrollRef.current) {
          scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
        }
    };
    const slides=known_for_movies?.map((movie) =>{
        const {id, poster_path}=movie;
        const postalPath=imgBaseUrl+imgSize+poster_path;
        return(
            <Link to={"/movie/detail/"+id} className="rounded-md min-w-[100px] shadow-sm" key={id}>
                <img className="object-cover w-full h-[225px]" src={postalPath} alt="Not found" />
            </Link>
        )
    })
    return(
        <div className="relative w-full">
            <div
                ref={scrollRef}
                {...handlers}
                className="flex gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 p-2"
            >
                {slides}
            </div>
        </div>
    )
}