import express, { urlencoded } from 'express';
import { config } from 'dotenv';
import MongoController from './controller/MongoController.js';
import listenerRouter from './router/listenerRouter.js';
// import { generatePlanForInterval } from './controller/intervalsControllers.js';

config();

const app = express();
const PORT = process.env.PORT || 3200;

app.use( express.json( { limit: '1mb' } ) );
app.use( urlencoded( { limit: '30mb', extended: true } ) );

//routes
app.use( '/events', listenerRouter );

app.listen( PORT, () => console.log( `listening at port: ${ PORT }` ) );

// const satrt = new Date( 2022, 5, 4, 9, 0, 0, 0 );
// const end = new Date( 2022, 5, 4, 18, 0, 0, 0 );

// generatePlanForInterval( satrt, end, 50 );

MongoController.init( process.env.MONGO_URL, process.env.MONGO_USER, process.env.MONGO_PASS );