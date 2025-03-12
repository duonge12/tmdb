import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { trendingApi } from "../services/trendingApi";


export const fetchTmdbTrendingMovie = createAsyncThunk('tmdbTrendingMovie/fetchTmdbTrendingMovie',async(params)=>{
    const response=await trendingApi.getTrendingMovie(params);
    return response.data;
})
const initialState={
    tmdbTrendingMovie: [],
    currentPage: 1,
    totalPages: 1,
    loading_tmdbTrendingMovie:false,
    tmdbTrendingMovie_error:''
};

const tmdbTrendingMovieSlice=createSlice({
    name:"tmdbTrendingMovie",
    initialState:initialState,
    reducers:{
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTmdbTrendingMovie.pending, (state) => {
                state.loading_tmdbTrendingMovie = true;
                state.tmdbTrendingMovie_error = null;
            })
            .addCase(fetchTmdbTrendingMovie.fulfilled, (state, action) => {
                const { results, page, total_pages } = action.payload;
                if (page === 1) {
                    state.tmdbTrendingMovie = [...results];
                }
                if ((page !== state.currentPage) && (page !==1)) {
                  state.tmdbTrendingMovie = [...state.tmdbTrendingMovie, ...results];
                }
                state.currentPage = page;
                state.totalPages = total_pages;
                state.loading_tmdbTrendingMovie = false;
            })
            .addCase(fetchTmdbTrendingMovie.rejected, (state, action) => {
                state.loading_tmdbTrendingMovie = false;
                state.tmdbTrendingMovie_error = action.error.message;
            });
    },
})
const tmdbTrendingMovieReducer=tmdbTrendingMovieSlice.reducer
export {tmdbTrendingMovieReducer}