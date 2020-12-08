export interface ILocation{
    name: string,
    latitude: number,
    longitude: number
}

export class Location implements ILocation{
    constructor(
        public name: string,
        public latitude: number,
        public longitude: number
    ){}
}