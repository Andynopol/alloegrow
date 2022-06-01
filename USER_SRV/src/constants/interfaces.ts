import { Document } from 'mongoose';
export interface UserData extends Document {
    email: string;
    firstName: string,
    lastName: string;
    password: string;
    planifications?: Array<string>;
}