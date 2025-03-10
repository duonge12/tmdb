import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { discoverApi } from "../services/discoverApi";


export const fetchTmdbDiscover = createAsyncThunk('tmdbDiscover/fetchTmdbDiscover',async(params)=>{
    const response=await discoverApi.getMovie(params);
    return response.data;
})
const initialState={
    tmdbDiscover: [],
    currentPage: 1,
    totalPages: 1,
    loading_tmdbDiscover:false,
    tmdbDiscover_error:''
};

const tmdbDiscoverSlice=createSlice({
    name:"tmdbDiscover",
    initialState:initialState,
    reducers:{
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTmdbDiscover.pending, (state) => {
                state.loading_tmdbDiscover = true;
                state.tmdbDiscover_error = null;
            })
            .addCase(fetchTmdbDiscover.fulfilled, (state, action) => {
                const { results, page, total_pages } = action.payload;
                if (page === 1) {
                    state.tmdbDiscover = [...results];
                }
                if ((page !== state.currentPage) && (page !==1)) {
                  state.tmdbDiscover = [...state.tmdbDiscover, ...results];
                }
                state.currentPage = page;
                state.totalPages = total_pages;
                state.loading = false;
            })
            .addCase(fetchTmdbDiscover.rejected, (state, action) => {
                state.loading_tmdbDiscover = false;
                state.tmdbDiscover_error = action.error.message;
            });
    },
})
const tmdbDiscoverReducer=tmdbDiscoverSlice.reducer
const {resetDiscover}=tmdbDiscoverSlice.actions
export {tmdbDiscoverReducer, resetDiscover}