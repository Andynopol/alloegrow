import { Request, Response } from "express";
import { HEADERS } from "../constants/vars.js";
import { EVENTS, HttpVerbs, Status, StatusMessage } from "../constants/enums.js";
import { ResponseConstructor as JSONResponse } from './ResponseService.js';
import { EventBuilder } from "./EventBuilder.js";
import { v4 as uuidv4 } from "uuid";
import fetch from "node-fetch";

export const createPlanification = async ( req: Request, res: Response ) => {
    const { start, end, count, date, name, ref } = req.body;
    console.log( req.body );
    try {
        if ( !start || !end || !count || !date || !ref ) return res.status( 400 ).json( new JSONResponse( Status.NOTOK, "start-time/end-time/count/date/ref", StatusMessage.invalid ) );

        const createPlanificationResponse = await fetch( `${ process.env.URI_SCHEMA }://${ process.env.EVENT_BUS_URI }${ process.env.EVENT_BUS_DISPATCH_PATH }`, {
            headers: HEADERS,
            method: HttpVerbs.POST,
            body: JSON.stringify(
                new EventBuilder( process.env.ORIGIN,
                    EVENTS.planificationCreate,
                    { start, end, count, date, name }, uuidv4()
                ).buildWithRef( ref ) )
        } );


        res.status( createPlanificationResponse.status ).json( await createPlanificationResponse.json() );
    } catch ( err ) {
        return res.status( 500 ).json( new JSONResponse( Status.NOTOK, 'Handler', StatusMessage.notFound ).build() ).end();
    }
};

export const deletePlanification = async ( req: Request, res: Response ) => {
    const { ref } = req.body;
    const { _id } = req.params;

    console.log( req.body );
    console.log( _id );

    try {
        if ( !ref || !_id ) return res.status( 400 ).json( new JSONResponse( Status.NOTOK, "ref/_id", StatusMessage.invalid ) );

        const createPlanificationResponse = await fetch( `${ process.env.URI_SCHEMA }://${ process.env.EVENT_BUS_URI }${ process.env.EVENT_BUS_DISPATCH_PATH }`, { headers: HEADERS, method: HttpVerbs.POST, body: JSON.stringify( new EventBuilder( process.env.ORIGIN, EVENTS.planificationDelete, ref, uuidv4() ).buildWithRef( ref ) ) } );

        res.status( createPlanificationResponse.status ).json( await createPlanificationResponse.json() );
    } catch ( err ) {
        return res.status( 500 ).json( new JSONResponse( Status.NOTOK, 'Handler', StatusMessage.notFound ).build() ).end();
    }
};