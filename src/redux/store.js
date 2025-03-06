import { configureStore } from "@reduxjs/toolkit";
import { tmdbConfigReducer } from "./tmdbConfigReducer";
import { tmdbDiscoverReducer } from "./tmdbDiscoverReducer";
import { tmdbGenresReducer } from "./tmdbGenresReducer";
import { tmdbAccountReducer } from "./tmdbAccountReducer";
import { tmdbFavoriteListReducer } from "./tmdbAccountFavoriteMovie";

export const store=configureStore({
    reducer:{
        tmdbConfig:tmdbConfigReducer,
        tmdbDiscover:tmdbDiscoverReducer,
        tmdbGenres:tmdbGenresReducer,
        tmdbAccount:tmdbAccountReducer,
        tmdbFavoriteList:tmdbFavoriteListReducer
    }
})
 