import { Document } from 'mongoose';
export interface EventData extends Document {
    type: string;
    payload: any,
    correlationId: string;
}