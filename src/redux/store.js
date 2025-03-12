import { configureStore } from "@reduxjs/toolkit";
import { tmdbConfigReducer } from "./tmdbConfigReducer";
import { tmdbGenresReducer } from "./tmdbGenresReducer";
import { tmdbAccountReducer } from "./tmdbAccountReducer";
import { tmdbDiscoverReducer } from "./tmdbDiscoverReducer";
import { tmdbPopularReducer } from "./tmdbPopularReducer";
import { tmdbTVReducer } from "./tmdbTvReducer";
import { tmdbFavoriteListReducer } from "./tmdbAccountFavoriteMovieReducer";
import { tmdbTrendingMovieReducer } from "./tmdbTrendingMovieReducer";
import { tmdbPopularPeopleListReducer } from "./tmdbPopularPeopleReducer";

export const store=configureStore({
    reducer:{
        tmdbConfig:tmdbConfigReducer,
        tmdbDiscover:tmdbDiscoverReducer,
        tmdbGenres:tmdbGenresReducer,
        tmdbAccount:tmdbAccountReducer,
        tmdbFavoriteList:tmdbFavoriteListReducer,
        tmdbTrendingMovie:tmdbTrendingMovieReducer,
        tmdbPopularMovie:tmdbPopularReducer,
        tmdbTV:tmdbTVReducer,
        tmdbPopularPeopleList:tmdbPopularPeopleListReducer
     
    }
})
 