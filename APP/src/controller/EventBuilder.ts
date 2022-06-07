export class EventBuilder {
    private origin: string;
    private type: string;
    private payload: any;
    private correlationId: string;
    constructor ( origin: string, type: string, payload: any, correlationId: string ) {
        this.origin = origin;
        this.type = type;
        this.payload = payload;
        this.correlationId = correlationId;
    }

    build () {
        return { origin: this.origin, type: this.type, payload: this.payload, correlationId: this.correlationId };
    }

    buildWithRef ( ref: string ) {
        return { origin: this.origin, type: this.type, payload: { ref, data: this.payload }, correlationId: this.correlationId };
    }
}
}