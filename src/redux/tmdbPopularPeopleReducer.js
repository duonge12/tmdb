import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { peopleListApi } from "../services/peopleListApi";


export const fetchTmdbPopularPeopleList = createAsyncThunk('tmdbPopularPeopleList/fetchTmdbPopularPeopleList',async(params)=>{
    const response=await peopleListApi.getPopularPeopleList(params)
    return response.data;
})
const initialState={
    tmdbPopularPeopleList: [],
    currentPage: 1,
    totalPages: 1,
    loading_tmdbPopularPeopleList:false,
    tmdbPopularPeopleList_error:''
};

const tmdbPopularPeopleListSlice=createSlice({
    name:"tmdbPopularPeopleList",
    initialState:initialState,
    reducers:{
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTmdbPopularPeopleList.pending, (state) => {
                state.loading_tmdbPopularPeopleList = true;
                state.tmdbPopularPeopleList_error = null;
            })
            .addCase(fetchTmdbPopularPeopleList.fulfilled, (state, action) => {
                const { results, page, total_pages } = action.payload;
                state.tmdbPopularPeopleList = [...results];
                state.currentPage = page;
                state.totalPages = total_pages;
                state.loading = false;
            })
            .addCase(fetchTmdbPopularPeopleList.rejected, (state, action) => {
                state.loading_tmdbPopularPeopleList = false;
                state.tmdbPopularPeopleList_error = action.error.message;
            });
    },
})
const tmdbPopularPeopleListReducer=tmdbPopularPeopleListSlice.reducer
export {tmdbPopularPeopleListReducer}