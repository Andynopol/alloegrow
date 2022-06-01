import { Request, Response } from 'express';
import { Status, StatusMessage } from '../constants/enums.js';
import { ResponseConstructor as JSONResponse } from './ResponseService.js';
import UserModel from '../model/UserModel.js';

export const listen = async ( req: Request, res: Response ) => {
    const { origin, type, payload, correlationId } = req.body;

    try {
        if ( origin === process.env.ORIGIN ) return res.status( 405 );

        switch ( type ) {
            case type.includes( 'planifcation' ) && type.includes( 'created' ):
                addPlanification( payload );
                break;
            case type.includes( 'planification' ) && type.includes( 'deleted' ):
                deletePlanification;
                break;
        }

    } catch ( err ) {
        res.status( 500 ).json( new JSONResponse( Status.NOTOK, '', StatusMessage.unknowun, ( err as Error ).message ).build() );
    }
};

const addPlanification = ( payload: any ) => {
    UserModel.create( payload );
};

const deletePlanification = ( payload: any ) => {
    UserModel.remove( {} );
};