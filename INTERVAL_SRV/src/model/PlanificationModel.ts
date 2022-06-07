import mongoose from 'mongoose';
import { Planification } from '../constants/interfaces.js';

const planificationSchema: mongoose.Schema = new mongoose.Schema( {
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    count: { type: Number, required: true },
    date: { type: Date, required: true },
    plan: { type: Array, required: true },
    name: { type: String, required: false },
} );

const Model = mongoose.model<Planification>( "planification", planificationSchema, "planifications" );

Model.createCollection();

export default Model;
