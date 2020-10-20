import { Implementable } from "./Implementable.model";

export class Event extends Implementable{
    constructor(
        public id: string,
        public name: string,
        public publisherId: string,
        public publisherName: string,
        public publisherLastname: string,
        public objectives: string[],
        public date: Date,
        public imageUrl: string
    ){
        super(
            id,
            name,
            publisherId,
            publisherName,
            publisherLastname,
            objectives
        )
    }
}