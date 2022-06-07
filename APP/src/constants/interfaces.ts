import { Document } from 'mongoose';
export interface UserData extends Document {
    email: string;
    firstName: string,
    lastName: string;
    password: string;
    planifications?: Array<string>;
}

export interface UserCredientials {
    email: string,
    firstName?: string,
    lastName?: string,
    password?: string,
    confirmedPassword?: string;
}

export interface HandlerResult {
    status: number;
    response: any;
}