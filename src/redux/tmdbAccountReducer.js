import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { accountApi } from "../services/accountApi";



export const fetchAccountInfo = createAsyncThunk('account/fetchAccountInfo',async()=>{
    const response=await accountApi.getAccountInfo();
    return response.data;
})
const initialState={
    tmdbAccount:undefined,
    loading_tmdbAccount:false,
    tmdbAccount_error:''
};

const tmdbAccountSlice=createSlice({
    name:"tmdbAccount",
    initialState:initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAccountInfo.pending, (state) => {
            state.loading_tmdbAccount = true;
            state.tmdbAccount_error = null;
            })
            .addCase(fetchAccountInfo.fulfilled, (state, action) => {
            state.loading_tmdbAccount = false;
            state.tmdbAccount = action.payload;
            })
            .addCase(fetchAccountInfo.rejected, (state, action) => {
            state.loading_tmdbAccount = false;
            state.tmdbAccount_error = action.error.message;
            });
    },
})
const tmdbAccountReducer=tmdbAccountSlice.reducer
export {tmdbAccountReducer}