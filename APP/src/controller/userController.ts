import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import fetch from 'node-fetch';
import { HEADERS } from '../constants/vars.js';
import { EVENTS, HttpVerbs, Status, StatusMessage } from '../constants/enums.js';
import { ResponseConstructor as JSONResponse } from './ResponseService.js';

export const loginUser = async ( req: Request, res: Response ) => {
    const { email, password } = req.body;
    console.log( req.body );
    try {
        if ( !email || !password ) return res.status( 400 ).json( new JSONResponse( Status.NOTOK, 'Email or password', StatusMessage.invalid ).build() ).end();

        const loginResponse = await fetch( `${ process.env.URI_SCHEMA }://${ process.env.USER_SRV_URI }${ process.env.USER_SRV_LOGIN_PATH }`, { headers: HEADERS, method: HttpVerbs.POST, body: JSON.stringify( { email, password } ) } );

        const loginResponseJson = await loginResponse.json();

        res.status( loginResponse.status ).json( loginResponseJson );
    } catch ( err ) {
        res.status( 500 ).json( new JSONResponse( Status.NOTOK, '', StatusMessage.unknowun, ( err as Error ).message ).build() );
    }
};

export const registerUser = async ( req: Request, res: Response ) => {
    const { firstName, lastName, email, password, confirmedPassword } = req.body;
    console.log( req.body );
    try {
        if ( !firstName || !lastName || !email || !password || !confirmedPassword ) return res.status( 400 ).json( new JSONResponse( Status.NOTOK, 'Some fields', StatusMessage.invalid ).build() ).end();

        const registerResponse = await fetch( `${ process.env.URI_SCHEMA }://${ process.env.EVENT_BUS_URI }${ process.env.EVENT_BUS_DISPATCH_PATH }`, { headers: HEADERS, method: HttpVerbs.POST, body: JSON.stringify( { origin: process.env.ORIGIN, type: EVENTS.userCreate, payload: { firstName, lastName, email, password, confirmedPassword }, correlationId: uuidv4() } ) } );

        const registerResponseJson = await registerResponse.json();

        res.status( registerResponse.status ).json( registerResponseJson );
    } catch ( err ) {
        res.status( 500 ).json( new JSONResponse( Status.NOTOK, '', StatusMessage.unknowun, ( err as Error ).message ).build() );
    }
};

export const deleteUser = async ( req: Request, res: Response ) => {
    const { _id } = req.params;
    console.log( _id );
    try {
        if ( !_id ) return res.status( 400 ).json( new JSONResponse( Status.NOTOK, 'Id', StatusMessage.invalid ).build() ).end();

        const deleteUserResponse = await fetch( `${ process.env.URI_SCHEMA }://${ process.env.EVENT_BUS_URI }${ process.env.EVENT_BUS_DISPATCH_PATH }`, { headers: HEADERS, method: HttpVerbs.POST, body: JSON.stringify( { origin: process.env.ORIGIN, type: EVENTS.userDelete, payload: _id, correlationId: uuidv4() } ) } );

        const deleteUserResponseJson = await deleteUserResponse.json();

        res.status( deleteUserResponse.status ).json( deleteUserResponseJson );
    }
    catch ( err ) {
        res.status( 500 ).json( new JSONResponse( Status.NOTOK, '', StatusMessage.unknowun, ( err as Error ).message ).build() );
    }
};