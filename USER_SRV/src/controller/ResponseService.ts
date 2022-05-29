import { StatusMessage, Status } from '../constants/enums.js';

export class ResponseConstructor {
    private prefix: string;
    private statusMsg: StatusMessage;
    private status: Status;
    private payload: any;
    constructor ( status: Status, prefix: string, statusMsg: StatusMessage, payload?: any ) {
        this.prefix = prefix;
        this.status = status;
        this.statusMsg = statusMsg;
        this.payload = payload;
    }

    public build () {
        return { status: this.status, message: `${ this.prefix } ${ this.statusMsg }`.trim(), payload: this.payload };
    }


}