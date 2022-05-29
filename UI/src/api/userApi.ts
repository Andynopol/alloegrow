import { createAsyncThunk } from "@reduxjs/toolkit";
import { HTTPVerbs } from "../constants/enums";
import { LoginData, RegisterData } from "../constants/interfaces";
import { DEFAULT_HEADER } from "../constants/vars";

const login = async ( data: LoginData ) => fetch( '/usr/get-user', { headers: DEFAULT_HEADER, method: HTTPVerbs.POST, body: JSON.stringify( data ) } );

const register = async ( data: LoginData ) => fetch( '/usr/set-user', { headers: DEFAULT_HEADER, method: HTTPVerbs.POST, body: JSON.stringify( data ) } );

export const loginUser = createAsyncThunk( 'auth/login', async ( data: LoginData ) => {
    const response = await login( data );
    return response;
} );

export const registerUser = createAsyncThunk( 'auth/register', async ( data: RegisterData ) => {
    const response = await register( data );
    return response;
} );