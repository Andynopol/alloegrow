import { Request, Response } from 'express';
import { ResponseConstructor as JSONResponse } from './ResponseService.js';
import { Status, StatusMessage } from '../constants/enums.js';
import EventModel from '../model/EventModel.js';
import { HEADERS } from '../constants/vars.js';

export const dispatchEvent = async ( req: Request, res: Response ) => {
    const { type, payload, correlationId, origin } = req.body;
    try {
        if ( !type || !payload || !correlationId || !origin ) return res.status( 400 ).json( new JSONResponse( Status.NOTOK, 'Type, payload or correlationId', StatusMessage.invalid ).build() ).end();

        const existingEventLog = await EventModel.findOne( { correlationId } );

        if ( existingEventLog ) return res.status( 403 ).json( new JSONResponse( Status.NOTOK, 'Event', StatusMessage.duplicate ).build() ).end();

        await EventModel.create( { type, payload, correlationId, origin } );

        process.env.SERVICES.split( "," ).forEach( service => {
            fetch( `${ process.env.URI_SCHEMA }://${ service }/events`, { headers: HEADERS, method: "POST", body: JSON.stringify( { type, payload, correlationId, origin } ) } );
        } );

    } catch ( err ) {
        res.status( 500 ).json( new JSONResponse( Status.NOTOK, '', StatusMessage.unknowun, ( err as Error ).message ).build() ).end();
    }
};

export const getEventsForOrigin = async ( req: Request, res: Response ) => {
    const { origin } = req.params;
    try {
        const events = await EventModel.find( { origin } );
        res.status( 200 ).json( new JSONResponse( Status.OK, 'Events extracted', StatusMessage.success, events ) ).end();
    } catch ( err ) {
        res.status( 500 ).json( new JSONResponse( Status.NOTOK, '', StatusMessage.unknowun, ( err as Error ).message ).build() ).end();
    }
}; 