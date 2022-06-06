import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser } from '../../api/userApi';

const initialState = {};



const authSlice = createSlice( {
    name: 'auth',
    initialState,
    reducers: {
        logout: ( state ) => {
            state = { ...initialState };
        }
    },
    extraReducers: ( builder ) => {
        builder.addCase( loginUser.fulfilled, ( state, action ) => {
            state = { ...action.payload };
        } );

        builder.addCase( registerUser.fulfilled, ( state, payload ) => {

        } );
    }
} );

export const { logout } = authSlice.actions;

export default authSlice.reducer;