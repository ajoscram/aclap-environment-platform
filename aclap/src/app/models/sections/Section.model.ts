export interface ISection{
    index: number
}

export abstract class Section {
    constructor(
        public id: string,
        public index: number
    ){}
}