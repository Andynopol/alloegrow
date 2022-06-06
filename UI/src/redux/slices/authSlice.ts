import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = { user: null, token: null };


const authSlice = createSlice( {
    name: 'auth',
    initialState,
    reducers: {
        setUser: ( state, action: PayloadAction<any> ) => {
            state = { ...action.payload };
            return state;
        },
        logout: ( state ) => {
            state = { ...initialState };
            return state;
        }
    },
} );

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;