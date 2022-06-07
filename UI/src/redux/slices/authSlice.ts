import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = { user: null, token: null };


const authSlice = createSlice( {
    name: 'auth',
    initialState,
    reducers: {
        setAuth: ( state, action: PayloadAction<any> ) => {
            state = { ...action.payload };
            localStorage.setItem( 'auth', JSON.stringify( state ) );
            return state;
        },
        logout: ( state ) => {
            state = { ...initialState };
            localStorage.removeItem( 'auth' );
            return state;
        }
    },
} );

export const { setAuth, logout } = authSlice.actions;

export default authSlice.reducer;