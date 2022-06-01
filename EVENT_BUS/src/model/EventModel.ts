import mongoose from 'mongoose';
import { EventData } from '../constants/interfaces.js';

const eventSchema: mongoose.Schema = new mongoose.Schema( {
    type: { type: String, required: true },
    payload: { type: Object, required: false },
    origin: { type: String, required: true },
    correlationId: { type: String, required: true, unique: true },
} );

const Model = mongoose.model<EventData>( "event", eventSchema, "events" );

Model.createCollection();

export default Model;
