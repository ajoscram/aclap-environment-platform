import { IImplementable, Implementable } from "./Implementable.model";

export interface IEvent extends IImplementable{
    date: Date
}

export class Event extends Implementable{
    constructor(
        public id: string,
        public name: string,
        public color: string,
        public imageUrl: string,
        public bannerImageUrl: string,
        public publisherId: string,
        public publisherName: string,
        public publisherLastname: string,
        public objective: string,
        public date: Date
    ){
        super(
            id,
            name,
            color,
            imageUrl,
            bannerImageUrl,
            publisherId,
            publisherName,
            publisherLastname,
            objective
        )
    }

    public static check(object: any): object is IEvent{
        const event: IEvent = <IEvent>object;
        return super.check(object) &&
            event.date !== undefined;
    }
}