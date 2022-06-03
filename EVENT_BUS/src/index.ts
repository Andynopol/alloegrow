import express, { urlencoded } from 'express';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import eventsRouter from './router/eventsRouter.js';


config();
const app = express();
const PORT = process.env.PORT || 3300;

app.use( express.json( { limit: '1mb' } ) );
app.use( urlencoded( { limit: '30mb', extended: true } ) );

//routes
app.use( '/events', eventsRouter );

app.listen( PORT, () => console.log( `listening at port: ${ PORT }` ) );

mongoose.connect( process.env.MONGO_URL, { user: process.env.MONGO_USER, pass: process.env.MONGO_PASS, dbName: process.env.MONGO_DBNAME } )
    .then( () => console.log( "Database connection is up. We are online!" ) )
    .catch( () => console.log( "Database connection down!" ) );