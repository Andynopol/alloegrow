import { Request, Response } from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { Status, StatusMessage } from '../constants/enums.js';
import { ResponseConstructor as JSONResponse } from './ResponseService.js';
import UserModel from '../model/UserModel.js';
import { HandlerResult, UserCredientials } from '../constants/interfaces.js';



export const listen = async ( req: Request, res: Response ) => {
    const { origin, type, payload, correlationId } = req.body;
    console.log( req.body );

    let result: HandlerResult;

    try {
        if ( origin === process.env.ORIGIN ) return res.end();

        switch ( true ) {
            case type.includes( "user" ) && type.includes( "create" ):
                result = await createUser( payload );
                break;
            case type.includes( "user" ) && type.includes( "delete" ):
                result = await deleteUser( payload );
                break;
            default:
                return res.status( 404 ).json( new JSONResponse( Status.NOTOK, 'Handler', StatusMessage.notFound ).build() ).end();
        }

        res.status( result.status ).json( result.response );

    } catch ( err ) {
        res.status( 500 ).json( new JSONResponse( Status.NOTOK, '', StatusMessage.unknowun, ( err as Error ).message ).build() );
    }
};

const createUser = async ( userData: UserCredientials ): Promise<HandlerResult> => {
    const { firstName, lastName, email, password, confirmedPassword } = userData;
    if ( !firstName || !lastName || !email || !password || !confirmedPassword ) return { status: 400, response: new JSONResponse( Status.NOTOK, 'Some fields', StatusMessage.invalid ).build() };

    if ( password !== confirmedPassword ) return { status: 401, response: new JSONResponse( Status.NOTOK, 'Passowrds', StatusMessage.missmatch ).build() };

    const existingUser = await UserModel.findOne( { email } );

    if ( existingUser ) return { status: 403, response: new JSONResponse( Status.NOTOK, 'User with this email', StatusMessage.duplicate ) };

    const newUser = {
        email,
        firstName,
        lastName,
        password: await bcrypt.hash( password, 12 )
    };

    const result = await UserModel.create( newUser );

    if ( !result ) throw new Error( "Database connection error!" );

    return { status: 200, response: new JSONResponse( Status.OK, 'User registered', StatusMessage.success ).build() };
};

const deleteUser = async ( _id: string ): Promise<HandlerResult> => {
    if ( !mongoose.Types.ObjectId.isValid( _id ) ) return { status: 400, response: new JSONResponse( Status.NOTOK, 'Unique ID', StatusMessage.invalid ).build() };

    const existingUser = await UserModel.findById( _id );

    console.log( _id, existingUser );
    if ( !existingUser ) return { status: 404, response: new JSONResponse( Status.NOTOK, "User", StatusMessage.notFound ).build() };

    const userDeleted = await UserModel.findByIdAndDelete( _id );

    if ( !userDeleted ) throw new Error( "Database connection issue!" );

    return { status: 200, response: new JSONResponse( Status.OK, "User deleted", StatusMessage.success ).build() };
};