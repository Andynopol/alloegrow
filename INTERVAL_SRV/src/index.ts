import express, { urlencoded } from 'express';
import { config } from 'dotenv';
import listenerRouter from './router/listenerRouter.js';
import intervalsController from './router/intervalsRouter.js';

config();

const app = express();
const PORT = process.env.PORT || 3200;

app.use( express.json( { limit: '1mb' } ) );
app.use( urlencoded( { limit: '30mb', extended: true } ) );

//routes
app.use( '/planifications', intervalsController );
app.use( '/events', listenerRouter );

app.listen( PORT, () => console.log( `listening at port: ${ PORT }` ) );