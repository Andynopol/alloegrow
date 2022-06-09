import express, { Response } from 'express';
import { config } from 'dotenv';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import userRouter from './router/userRouter.js';
import planificationRouter from './router/planificationRouter.js';

config();
const PORT = process.env.PORT || 3005;
const __dirname = dirname( fileURLToPath( import.meta.url ) );
const app = express();

app.use( `/`, express.static( path.join( __dirname, `../pubilc` ) ) );
app.use( express.json( { limit: '1mb' } ) );
app.use( express.urlencoded( { limit: '30mb', extended: true } ) );
app.use( '/usr', userRouter );
app.use( '/planifications', planificationRouter );


app.get( '/', ( _req: Request, res: Response ) => {
    res.sendFile( path.resolve( __dirname, '../public', 'index.html' ) );
} );

app.listen( PORT, () => console.log( `listening on port: ${ PORT }` ) );


