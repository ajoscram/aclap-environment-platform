export interface IImplementable{
    name: string,
    imageUrl: string,
    publisherId: string,
    publisherName: string,
    publisherLastname: string,
    objectives: string[]
}

export abstract class Implementable implements IImplementable{
    constructor(
        public id: string,
        public name: string,
        public imageUrl: string,
        public publisherId: string,
        public publisherName: string,
        public publisherLastname: string,
        public objectives: string[]
    ){}
}