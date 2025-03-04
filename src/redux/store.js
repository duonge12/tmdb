import { configureStore } from "@reduxjs/toolkit";
import { tmdbConfigReducer } from "./tmdbConfigReducer";
import { tmdbDiscoverReducer } from "./tmdbDiscoverReducer";
import { tmdbGenresReducer } from "./tmdbGenresReducer";

export const store=configureStore({
    reducer:{
        tmdbConfig:tmdbConfigReducer,
        tmdbDiscover:tmdbDiscoverReducer,
        tmdbGenres:tmdbGenresReducer
    }
})
 