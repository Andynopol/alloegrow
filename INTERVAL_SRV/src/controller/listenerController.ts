import { Request, Response } from 'express';
import { Status, StatusMessage } from '../constants/enums.js';
import { ResponseConstructor as JSONResponse } from './ResponseService.js';
import PlanificationModel from '../model/PlanificationModel.js';
import MongoController from './MongoController.js';
import mongoose from 'mongoose';
import { generatePlanForInterval } from './intervalsControllers.js';

export const listen = async ( req: Request, res: Response ) => {
    const { origin, type, payload, correlationId } = req.body;

    console.log( req.body );

    try {
        if ( !origin || !type || !payload || !correlationId || !payload ) return res.status( 400 ).json( new JSONResponse( Status.NOTOK, 'Event field/fields', StatusMessage.invalid ) );
        if ( origin === process.env.ORIGIN ) return res.status( 405 ).json();

        switch ( true ) {
            case type.includes( 'planification' ) && type.includes( 'create' ):
                await createPlanification( payload );
                break;
            case type.includes( 'planification' ) && type.includes( 'delete' ):
                await deletePlanification( payload );
                break;
            default:
                return res.status( 404 ).json( new JSONResponse( Status.NOTOK, 'Handler', StatusMessage.notFound ).build() ).end();
        }
        res.status( 200 ).json( new JSONResponse( Status.OK, "Event handled", StatusMessage.success ).build() );

    } catch ( err ) {
        res.status( 500 ).json( new JSONResponse( Status.NOTOK, '', StatusMessage.unknowun, ( err as Error ).message ).build() );
    }
};

const createPlanification = async ( { ref, data }: { ref: string, data: any; } ) => {
    await MongoController.connect( ref );
    data.plan = await generatePlanForInterval( new Date( data.start ), new Date( data.end ), data.count );
    console.log( data );
    await PlanificationModel.create( data );
    await MongoController.dissconnect();
};

const deletePlanification = async ( { ref, _id }: { ref: string, _id: mongoose.ObjectId; } ) => {
    if ( !mongoose.isValidObjectId( _id ) ) throw ( new Error( "Invalid id received!" ) );
    await MongoController.connect( ref );
    await PlanificationModel.findByIdAndDelete( _id );
    await MongoController.dissconnect();
};