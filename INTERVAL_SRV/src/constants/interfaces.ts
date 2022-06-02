import { Document } from 'mongoose';
export interface Planification extends Document {
    start: Date;
    end: Date;
    count: number;
    name?: string;
}