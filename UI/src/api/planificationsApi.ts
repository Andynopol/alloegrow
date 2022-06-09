import axios from 'axios';
import { PlanificationGenerationData } from '../constants/interfaces';

const API = axios.create( { baseURL: 'http://localhost:3005' } );

API.interceptors.request.use( ( req: any ) => {
    if ( localStorage.getItem( 'auth' ) ) {
        req.headers.Authorization = `Bearer ${ JSON.parse( ( localStorage.getItem( 'auth' ) as string ) ).token }`;
    }

    return req;
} );


export const getPlanifications = ( _id: string ) => API.get( `/planifications/get/${ _id }` );


export const generatePlanification = ( data: PlanificationGenerationData ) => API.post( '/planifications/create', data );

export const deletePlanification = ( _id: string, ref: string ) => API.post( `/planifications/delete/${ _id }`, { ref } );