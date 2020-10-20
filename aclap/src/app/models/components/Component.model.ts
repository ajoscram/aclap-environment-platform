export interface IComponent{}

export abstract class Component implements IComponent {
    constructor(
        public id: string
    ){}
}