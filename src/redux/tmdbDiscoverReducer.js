import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { discoverApi } from "../services/discoverApi";


export const fetchTmdbDiscover = createAsyncThunk('tmdbDiscover/fetchTmdbDiscover',async(params)=>{
    const response=await discoverApi.getMovie(params);
    return response.data;
})
const initialState={
    tmdbDiscover:[],
    loading_tmdbDiscover:false,
    tmdbDiscover_error:''
};

const tmdbDiscoverSlice=createSlice({
    name:"tmdbDiscover",
    initialState:initialState,
    reducers:{
        resetDiscover: (state) => {
            state.tmdbDiscover = []
            state.loading_tmdbDiscover=false
            state.tmdbDiscover_error = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTmdbDiscover.pending, (state) => {
                state.loading_tmdbDiscover = true;
                state.tmdbDiscover_error = null;
            })
            .addCase(fetchTmdbDiscover.fulfilled, (state, action) => {
                const currentPage=state.tmdbDiscover[state.tmdbDiscover.length-1]?.page;
                if(currentPage && (currentPage === action.payload.page)) return;
                state.loading_tmdbDiscover = false;
                const newDiscoverList=[...state.tmdbDiscover]
                newDiscoverList.push(action.payload);
                state.tmdbDiscover = newDiscoverList
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