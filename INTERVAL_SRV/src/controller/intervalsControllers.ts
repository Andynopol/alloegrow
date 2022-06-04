import { Request, Response } from "express";
import { Status, StatusMessage } from "../constants/enums.js";
import { ResponseConstructor as JSONResponse } from "./ResponseService.js";
import MongoController from "./MongoController.js";
import PlanificationModel from '../model/PlanificationModel.js';

export const generatePlanForInterval = async ( start: Date, end: Date, count: number = 50 ) => {
    const interval = ( end.getTime() - start.getTime() ) / count;
    const plan: Array<Date> = [];
    for ( let i = 0; i < count; i++ ) {
        plan.push( getRandomDate( new Date( start.getTime() + i * interval ), new Date( start.getTime() + i * interval + interval ) ) );
    }
    return plan;
};

export const getIntervalsForUser = async ( req: Request, res: Response ) => {
    const { _id } = req.params;

    try {
        if ( !_id ) res.status( 400 ).json( new JSONResponse( Status.NOTOK, 'User ID', StatusMessage.invalid ).build() ).end();

        await MongoController.connect( _id );

        const planifications = await PlanificationModel.find( {} );

        if ( !planifications ) res.status( 404 ).json( new JSONResponse( Status.NOTOK, 'Collection', StatusMessage.notFound ).build() ).end();

        console.log( planifications );

        res.status( 200 ).json( new JSONResponse( Status.OK, 'Collection retreived', StatusMessage.success, planifications ).build() );
    }
    catch ( err ) {
        res.status( 500 ).json( new JSONResponse( Status.NOTOK, '', StatusMessage.unknowun, ( err as Error ).message ).build() ).end();
    }
};

const getRandomDate = ( start: Date, end: Date ): Date => {
    return new Date( start.getTime() + Math.random() * ( end.getTime() - start.getTime() ) );
};