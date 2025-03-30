import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { firebaseApi } from "../firebase/firebaseInstance";



export const fetchAccountInfo = createAsyncThunk('account/fetchAccountInfo',async(id)=>{
    const response=await firebaseApi.getClients(id)
    return response;
})
const initialState={
    tmdbAccount:undefined,
    loading_tmdbAccount:false,
    tmdbAccount_error:''
};

const tmdbAccountSlice=createSlice({
    name:"tmdbAccount",
    initialState:initialState,
    reducers:{
        logOut:(state)=>{
            state.tmdbAccount=undefined;
            state.loading_tmdbAccount=false;
            state.tmdbAccount_error=''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAccountInfo.pending, (state) => {
                state.loading_tmdbAccount = true;
                state.tmdbAccount_error = null;
            })
            .addCase(fetchAccountInfo.fulfilled, (state, action) => {
                const clientSnapShot=action.payload
                if(clientSnapShot.exists()){
                    state.loading_tmdbAccount = false;
                    state.tmdbAccount = clientSnapShot.val();
                    localStorage.setItem('session_id',clientSnapShot.val().session_id)
                }
            })
            .addCase(fetchAccountInfo.rejected, (state, action) => {
            state.loading_tmdbAccount = false;
            state.tmdbAccount_error = action.error.message;
            });
    },
})
const tmdbAccountReducer=tmdbAccountSlice.reducer
const {logOut}=tmdbAccountSlice.actions
export {tmdbAccountReducer,logOut}