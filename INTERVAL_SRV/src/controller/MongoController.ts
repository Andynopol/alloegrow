import mongoose from "mongoose";

class MongoController {
    private url: string;
    private user: string;
    private pass: string;

    init ( url: string, user: string, pass: string ) {
        this.url = url;
        this.user = user;
        this.pass = pass;
    }

    async connect ( dbName?: string ) {
        const { url, user, pass } = this;
        mongoose.connect( url, { user, pass, dbName } )
            .then( () => console.log( "Database connection is up. We are online!" ) )
            .catch( ( err ) => console.log( "Database connection down!", err ) );
    }

    async useDb ( dbName: string ) {
        mongoose.connection.useDb( dbName );
    }

    async dissconnect () {
        await mongoose.connection.close();
    }
}

let mongoController = null;

export default ( () => {
    if ( !mongoController ) mongoController = new MongoController();
    return mongoController;
} )();