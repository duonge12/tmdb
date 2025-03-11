import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { movieListApi } from "../services/movieListApi";


export const fetchTmdbPopularMovie = createAsyncThunk('tmdbPopularMovie/fetchTmdbPopularMovie',async(params)=>{
    const response=await movieListApi.getPopularMovie(params);
    return response.data;
})
const initialState={
    tmdbPopular: [],
    currentPage: 1,
    totalPages: 1,
    loading_tmdbPopular:false,
    tmdbPopular_error:''
};

const tmdbPopularSlice=createSlice({
    name:"tmdbPopularMovie",
    initialState:initialState,
    reducers:{
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTmdbPopularMovie.pending, (state) => {
                state.loading_tmdbPopular = true;
                state.tmdbPopular_error = null;
            })
            .addCase(fetchTmdbPopularMovie.fulfilled, (state, action) => {
                const { results, page, total_pages } = action.payload;
                if (page === 1) {
                    state.tmdbPopular = [...results];
                }
                if ((page !== state.currentPage) && (page !==1)) {
                  state.tmdbPopular = [...state.tmdbPopular, ...results];
                }
                state.currentPage = page;
                state.totalPages = total_pages;
                state.loading = false;
            })
            .addCase(fetchTmdbPopularMovie.rejected, (state, action) => {
                state.loading_tmdbPopular = false;
                state.tmdbPopular_error = action.error.message;
            });
    },
})
const tmdbPopularReducer=tmdbPopularSlice.reducer
export {tmdbPopularReducer}