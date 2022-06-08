import { NextFunction, Request, Response } from "express";
import fetch from "node-fetch";
import { HEADERS } from "../constants/vars.js";
import { HttpVerbs, Status, StatusMessage } from "../constants/enums.js";
import { ResponseConstructor as JSONResponse } from "../controller/ResponseService.js";

export const auth = async ( req: Request, res: Response, next: NextFunction ) => {
    const { authorization } = req.headers;
    console.log( authorization );
    try {
        if ( !authorization ) return res.status( 400 ).json( new JSONResponse( Status.NOTOK, "Token", StatusMessage.invalid ) ).end();

        const response = await ( await fetch( `${ process.env.URI_SCHEMA }://${ process.env.USER_SRV_URI }${ process.env.AUTH_CHECK_PATH }`, { headers: { ...HEADERS, authorization }, method: HttpVerbs.POST, body: "" } ) ).json();

        if ( ( response as ReturnType<JSONResponse[ "build" ]> ).status !== Status.OK ) {
            return res.status( 401 ).json( response );
        }
        next();


    } catch ( err ) {
        res.status( 500 ).json( new JSONResponse( Status.NOTOK, "Session", StatusMessage.expired ).build() ).end();
    }
};