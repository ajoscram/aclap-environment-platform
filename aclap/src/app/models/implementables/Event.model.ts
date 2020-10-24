import { IImplementable, Implementable } from "./Implementable.model";

export interface IEvent extends IImplementable{
    date: Date,
    bannerImageUrl: string
}

export class Event extends Implementable implements IEvent{
    constructor(
        public id: string,
        public name: string,
        public imageUrl: string,
        public publisherId: string,
        public publisherName: string,
        public publisherLastname: string,
        public objectives: string[],
        public date: Date,
        public bannerImageUrl: string
    ){
        super(
            id,
            name,
            imageUrl,
            publisherId,
            publisherName,
            publisherLastname,
            objectives
        )
    }
}