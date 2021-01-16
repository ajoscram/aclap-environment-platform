export interface IAlly{
    name: string,
    description: string,
    imageUrl: string,
    link: string
}

export class Ally implements IAlly{
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public imageUrl: string,
        public link: string
    ){}
}