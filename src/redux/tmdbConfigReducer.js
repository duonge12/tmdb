import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { configApi } from "../services/configApi";


export const fetchTmdbConfig = createAsyncThunk('tmdbConfig/fetchTmdbConfig',async()=>{
    const response=await configApi.getImageConfig();
    return response.data;
})
const initialState={
    tmdbConfig:undefined,
    loading_tmdbConfig:false,
    tmdbConfig_error:''
};

const tmdbConfigSlice=createSlice({
    name:"tmdbConfig",
    initialState:initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTmdbConfig.pending, (state) => {
            state.loading_tmdbConfig = true;
            state.tmdbConfig_error = null;
            })
            .addCase(fetchTmdbConfig.fulfilled, (state, action) => {
            console.log(action.payload)
            state.loading_tmdbConfig = false;
            state.tmdbConfig = action.payload;
            })
            .addCase(fetchTmdbConfig.rejected, (state, action) => {
            state.loading_tmdbConfig = false;
            state.tmdbConfig_error = action.error.message;
            });
    },
})
const tmdbConfigReducer=tmdbConfigSlice.reducer
export {tmdbConfigReducer}