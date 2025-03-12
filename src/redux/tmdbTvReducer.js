import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { discoverApi } from "../services/discoverApi";


export const fetchTmdbTV = createAsyncThunk('tmdbTV/fetchTmdbTV',async(params)=>{
    const response=await discoverApi.getTV(params);
    return response.data;
})
const initialState={
    tmdbTV: [],
    currentPage: 1,
    totalPages: 1,
    loading_tmdbTV:false,
    tmdbTV_error:''
};

const tmdbTVSlice=createSlice({
    name:"tmdbTV",
    initialState:initialState,
    reducers:{
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTmdbTV.pending, (state) => {
                state.loading_tmdbTV = true;
                state.tmdbTV_error = null;
            })
            .addCase(fetchTmdbTV.fulfilled, (state, action) => {
                const { results, page, total_pages } = action.payload;
                if (page === 1) {
                    state.tmdbTV = [...results];
                }
                if ((page !== state.currentPage) && (page !==1)) {
                  state.tmdbTV = [...state.tmdbTV, ...results];
                }
                state.currentPage = page;
                state.totalPages = total_pages;
                state.loading = false;
            })
            .addCase(fetchTmdbTV.rejected, (state, action) => {
                state.loading_tmdbTV = false;
                state.tmdbTV_error = action.error.message;
            });
    },
})
const tmdbTVReducer=tmdbTVSlice.reducer
export {tmdbTVReducer}