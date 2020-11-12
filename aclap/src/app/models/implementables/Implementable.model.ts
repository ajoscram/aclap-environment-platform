export interface IImplementable{
    name: string,
    color: string,
    imageUrl: string,
    publisherId: string,
    publisherName: string,
    publisherLastname: string,
    mainObjective: string,
    objectives: string[]
}

export abstract class Implementable{
    constructor(
        public id: string,
        public name: string,
        public color: string,
        public imageUrl: string,
        public publisherId: string,
        public publisherName: string,
        public publisherLastname: string,
        public mainObjective: string,
        public objectives: string[]
    ){}
}