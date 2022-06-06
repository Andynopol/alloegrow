import { HTTPVerbs } from "../constants/enums";
import { LoginData, RegisterData } from "../constants/interfaces";
import { DEFAULT_HEADER } from "../constants/vars";
import axios from 'axios';

export const login = async ( data: LoginData ) => axios.post( '/usr/login', data );

export const register = async ( data: RegisterData ) => await ( await fetch( '/usr/register', { headers: DEFAULT_HEADER, method: HTTPVerbs.POST, body: JSON.stringify( data ) } ) ).json();