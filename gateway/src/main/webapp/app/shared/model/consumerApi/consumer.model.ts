export interface IConsumer {
    id?: number;
    text?: string;
}

export class Consumer implements IConsumer {
    constructor(public id?: number, public text?: string) {}
}
