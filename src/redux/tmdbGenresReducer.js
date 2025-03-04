import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { genresApi } from "../services/genresApi";


export const fetchTmdbGenres = createAsyncThunk('tmdbGenres/fetchTmdbGenres',async(params)=>{
    const response=await genresApi.getMovieGenres();
    return response.data;
})
const initialState={
    tmdbGenres:[],
    loading_tmdbGenres:false,
    tmdbGenres_error:''
};

const tmdbGenresSlice=createSlice({
    name:"tmdbGenres",
    initialState:initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTmdbGenres.pending, (state) => {
                state.loading_tmdbGenres = true;
                state.tmdbGenres_error = null;
            })
            .addCase(fetchTmdbGenres.fulfilled, (state, action) => {
                state.loading_tmdbGenres = false;
                state.tmdbGenres = action.payload.genres;
            })
            .addCase(fetchTmdbGenres.rejected, (state, action) => {
                state.loading_tmdbGenres = false;
                state.tmdbGenres_error = action.error.message;
            });
    },
})
const tmdbGenresReducer=tmdbGenresSlice.reducer
export {tmdbGenresReducer}