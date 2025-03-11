import { configureStore } from "@reduxjs/toolkit";
import { tmdbConfigReducer } from "./tmdbConfigReducer";
import { tmdbGenresReducer } from "./tmdbGenresReducer";
import { tmdbAccountReducer } from "./tmdbAccountReducer";
import { tmdbFavoriteListReducer } from "./tmdbAccountFavoriteMovie";
import { tmdbTrendingMovieReducer } from "./tmdbTrendingMovie";
import { tmdbDiscoverReducer } from "./tmdbDiscoverReducer";
import { tmdbPopularReducer } from "./tmdbPopularReducer";

export const store=configureStore({
    reducer:{
        tmdbConfig:tmdbConfigReducer,
        tmdbDiscover:tmdbDiscoverReducer,
        tmdbGenres:tmdbGenresReducer,
        tmdbAccount:tmdbAccountReducer,
        tmdbFavoriteList:tmdbFavoriteListReducer,
        tmdbTrendingMovie:tmdbTrendingMovieReducer,
        tmdbPopularMovie:tmdbPopularReducer
     
    }
})
 