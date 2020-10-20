export abstract class Implementable{
    constructor(
        public id: string,
        public name: string,
        public publisherId: string,
        public publisherName: string,
        public publisherLastname: string,
        public objectives: string[]
    ){}
}