import express, { urlencoded } from 'express';
import { config } from 'dotenv';
import MongoController from './controller/MongoController.js';
import listenerRouter from './router/listenerRouter.js';

config();

const app = express();
const PORT = process.env.PORT || 3200;

app.use( express.json( { limit: '1mb' } ) );
app.use( urlencoded( { limit: '30mb', extended: true } ) );

//routes
app.use( '/events', listenerRouter );

app.listen( PORT, () => console.log( `listening at port: ${ PORT }` ) );


MongoController.init( process.env.MONGO_URL, process.env.MONGO_USER, process.env.MONGO_PASS );