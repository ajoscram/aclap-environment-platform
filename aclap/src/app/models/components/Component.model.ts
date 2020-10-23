export interface IComponent{
    index: number
}

export abstract class Component {
    constructor(
        public id: string,
        public index: number
    ){}
}