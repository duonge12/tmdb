import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { accountApi } from "../services/accountApi";



export const fetchFavoriteListInfo = createAsyncThunk('tmdbFavoriteList/fetchFavoriteListInfo',async(accountId, params)=>{
    const response=await accountApi.getFavoriteMovies(accountId,params)
    return response.data;
})
const initialState={
    tmdbFavoriteList:[],
    loading_tmdbFavoriteList:false,
    tmdbFavoriteList_error:''
};

const tmdbFavoriteListSlice=createSlice({
    name:"tmdbFavoriteList",
    initialState:initialState,
    reducers:{
        resetFavoriteList: (state) => {
            state.tmdbFavoriteList = []
            state.loading_tmdbFavoriteList=false
            state.tmdbFavoriteList_error = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFavoriteListInfo.pending, (state) => {
                state.loading_tmdbFavoriteList = true;
                state.tmdbFavoriteList_error = null;
            })
            .addCase(fetchFavoriteListInfo.fulfilled, (state, action) => {
                const currentPage=state.tmdbFavoriteList[state.tmdbFavoriteList.length-1]?.page;
                if(currentPage && (currentPage === action.payload.page)) return;

                state.loading_tmdbFavoriteList = false;
                const newFavoriteList=[...state.tmdbFavoriteList]
                newFavoriteList.push(action.payload);
                state.tmdbFavoriteList = newFavoriteList
            })
            .addCase(fetchFavoriteListInfo.rejected, (state, action) => {
                state.loading_tmdbFavoriteList = false;
                state.tmdbFavoriteList_error = action.error.message;
            });
    },
})
const tmdbFavoriteListReducer=tmdbFavoriteListSlice.reducer
const {resetFavoriteList}=tmdbFavoriteListSlice.actions
export {tmdbFavoriteListReducer, resetFavoriteList}