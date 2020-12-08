import { Checkable } from '..';

export interface IImplementable{
    name: string,
    color: string,
    imageUrl: string,
    bannerImageUrl: string,
    publisherId: string,
    publisherName: string,
    publisherLastname: string,
    objective: string
}

export abstract class Implementable extends Checkable implements IImplementable{
    constructor(
        public id: string,
        public name: string,
        public color: string,
        public imageUrl: string,
        public bannerImageUrl: string,
        public publisherId: string,
        public publisherName: string,
        public publisherLastname: string,
        public objective: string
    ){ super(); }

    public static check(object: any): object is IImplementable{
        const implementable: IImplementable = <IImplementable>object;
        return implementable.name !== undefined && 
            implementable.color !== undefined &&
            implementable.imageUrl !== undefined &&
            implementable.bannerImageUrl !== undefined &&
            implementable.publisherId !== undefined &&
            implementable.publisherName!== undefined &&
            implementable.publisherLastname !== undefined &&
            implementable.objective !== undefined;
    }
}