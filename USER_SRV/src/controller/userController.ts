import { Request, Response } from 'express';
import bcript from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ResponseConstructor as JSONResponse } from './ResponseService.js';
import { Status, StatusMessage } from '../constants/enums.js';
import UserModel from '../model/UserModel.js';
import { UserData } from '../constants/interfaces.js';
import mongoose from 'mongoose';



export const loginUser = async ( req: Request, res: Response ) => {
    const { email, password } = req.body;

    console.log( req.body );

    try {
        if ( !email || !password ) return res.status( 400 ).json( new JSONResponse( Status.NOTOK, 'Email or password', StatusMessage.invalid ).build() ).end();

        const user: UserData = await UserModel.findOne( { email } );

        if ( !user ) return res.status( 404 ).json( new JSONResponse( Status.NOTOK, "User", StatusMessage.notFound ).build() ).end();

        const passwordMatch = await bcript.compare( password, user.password );

        if ( !passwordMatch ) return res.status( 401 ).json( new JSONResponse( Status.NOTOK, "Email or passowrd", StatusMessage.missmatch ) );

        const token = req.headers.authorization ? req.headers.authorization : jwt.sign( { email: user.email, id: user._id }, process.env.SECRET, { expiresIn: "1h" } );

        res.status( 200 ).json( new JSONResponse( Status.OK, "You logged in", StatusMessage.success, { user, token } ).build() ).end();

    } catch ( err ) {
        res.status( 500 ).json( new JSONResponse( Status.NOTOK, '', StatusMessage.unknowun, ( err as Error ).message ).build() ).end();
    }
};

export const registerUser = async ( req: Request, res: Response ) => {
    const { firstName, lastName, email, password, confirmedPassword } = req.body;

    console.log( req.body );

    try {
        if ( !firstName || !lastName || !email || !password || !confirmedPassword ) return res.status( 400 ).json( new JSONResponse( Status.NOTOK, 'Some fields', StatusMessage.invalid ).build() ).end();

        if ( password !== confirmedPassword ) return res.status( 401 ).json( new JSONResponse( Status.NOTOK, 'Passowrds', StatusMessage.missmatch ).build() ).end();

        const existingUser = await UserModel.findOne( { email } );

        if ( existingUser ) return res.status( 403 ).json( new JSONResponse( Status.NOTOK, 'User with this email', StatusMessage.duplicate ).build() ).end();

        const newUser = {
            email,
            firstName,
            lastName,
            password: await bcript.hash( password, 12 )
        };

        const result = await UserModel.create( newUser );

        if ( !result ) throw new Error( "Database connection error!" );

        res.status( 200 ).json( new JSONResponse( Status.OK, 'User registered', StatusMessage.success ).build() ).end();
    } catch ( err ) {
        res.status( 500 ).json( new JSONResponse( Status.NOTOK, '', StatusMessage.unknowun, ( err as Error ).message ).build() );
    }
};

export const deleteUser = async ( req: Request, res: Response ) => {
    const { _id } = req.params;

    try {
        if ( !mongoose.Types.ObjectId.isValid( _id ) ) return res.status( 400 ).json( new JSONResponse( Status.NOTOK, 'Unique ID', StatusMessage.invalid ).build() ).end();

        const existingUser = await UserModel.findById( _id );

        if ( !existingUser ) return res.status( 404 ).json( new JSONResponse( Status.NOTOK, "User", StatusMessage.notFound ).build() ).end();

        const userDeleted = await UserModel.findByIdAndDelete( _id );

        if ( !userDeleted ) throw new Error( "Database connection issue!" );

        res.status( 200 ).json( new JSONResponse( Status.OK, "User deleted", StatusMessage.success ).build() ).end();
    } catch ( err ) {
        res.status( 500 ).json( new JSONResponse( Status.NOTOK, '', StatusMessage.unknowun, ( err as Error ).message ).build() );
    }
};