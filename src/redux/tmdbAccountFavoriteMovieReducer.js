import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { accountApi } from "../services/accountApi";
export const fetchFavoriteListInfo = createAsyncThunk('tmdbFavoriteList/fetchFavoriteListInfo',async(accountId, params)=>{
    const session_id=localStorage.getItem('session_id')
    const response=await accountApi.getFavoriteMovies(accountId,{...params, session_id: session_id})
    return response.data;
})
const initialState={
    tmdbFavoriteList: [],
    currentPage: 1,
    totalPages: 1,
    loading_tmdbFavoriteList:false,
    tmdbFavoriteList_error:''
};

const tmdbFavoriteListSlice=createSlice({
    name:"tmdbFavoriteList",
    initialState:initialState,
    reducers:{
        removeFromFavoriteList:(state,action)=>{
            const movieId=action.payload
            const newList =state.tmdbFavoriteList.filter(movie=> movie.id !== movieId)
            state.tmdbFavoriteList=newList
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFavoriteListInfo.pending, (state) => {
                debugger
                state.loading_tmdbFavoriteList = true;
                state.tmdbFavoriteList_error = null;
            })
            .addCase(fetchFavoriteListInfo.fulfilled, (state, action) => {
                const { results, page, total_pages } = action.payload;
                if (page === 1) {
                    state.tmdbFavoriteList = [...results];
                }
                if ((page !== state.currentPage) && (page !==1)) {
                  state.tmdbFavoriteList = [...state.tmdbFavoriteList, ...results];
                }
                state.currentPage = page;
                state.totalPages = total_pages;
                state.loading_tmdbFavoriteList = false;
            })
            .addCase(fetchFavoriteListInfo.rejected, (state, action) => {
                state.loading_tmdbFavoriteList = false;
                state.tmdbFavoriteList_error = action.error.message;
            });
    },
})
const tmdbFavoriteListReducer=tmdbFavoriteListSlice.reducer
const {removeFromFavoriteList}=tmdbFavoriteListSlice.actions
export {tmdbFavoriteListReducer,removeFromFavoriteList}