import express, { urlencoded } from 'express';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import userRouter from './router/userRouter.js';
import listenerRouter from './router/listenerRouter.js';
import path from 'path';


config();
const app = express();
const PORT = process.env.PORT || 3100;

app.use( express.json( { limit: '1mb' } ) );
app.use( urlencoded( { limit: '30mb', extended: true } ) );

//routes

app.use( '/usr', userRouter );
app.use( '/events', listenerRouter );

app.listen( PORT, () => console.log( `listening at port: ${ PORT }` ) );

mongoose.connect( process.env.MONGO_URL, { user: process.env.MONGO_USER, pass: process.env.MONGO_PASS, dbName: process.env.MONGO_DBNAME } )
    .then( () => console.log( "Database connection is up. We are online!" ) )
    .catch( () => console.log( "Database connection down!" ) );