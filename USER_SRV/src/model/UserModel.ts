import mongoose from 'mongoose';
import { UserData } from '../constants/interfaces.js';

const userSchema: mongoose.Schema = new mongoose.Schema( {
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: false },
} );

const Model = mongoose.model<UserData>( "user", userSchema, "usr" );

Model.createCollection();

export default Model;
