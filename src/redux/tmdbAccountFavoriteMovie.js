import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { accountApi } from "../services/accountApi";

export const fetchFavoriteListInfo = createAsyncThunk('tmdbFavoriteList/fetchFavoriteListInfo',async(accountId, params)=>{
    const response=await accountApi.getFavoriteMovies(accountId,params)
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
            const pageIndex= state.tmdbFavoriteList.findIndex(page=> {
                const pageMatched= page.results.filter(movie=> movie.id===movieId)
                if(pageMatched.length >0) return true;
            })
            if(pageIndex !==-1){
                const matchedPage=state.tmdbFavoriteList[pageIndex];
                const currentState=state.tmdbFavoriteList
                const filteredResult= matchedPage.results.filter(movie=> movie.id !== movieId);
                currentState[pageIndex].results=filteredResult;
                state.tmdbFavoriteList=currentState;
            }
            
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFavoriteListInfo.pending, (state) => {
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
const {resetFavoriteList,removeFromFavoriteList}=tmdbFavoriteListSlice.actions
export {tmdbFavoriteListReducer, resetFavoriteList,removeFromFavoriteList}