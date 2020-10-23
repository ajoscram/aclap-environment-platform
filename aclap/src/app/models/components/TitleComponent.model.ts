import { Component, IComponent } from "./Component.model";

export enum TitleComponentSize{
    H1,
    H2
}

export interface ITitleComponent extends IComponent{
    size: TitleComponentSize,
    text: string
}

export class TitleComponent extends Component implements ITitleComponent{
    constructor(
        public id: string,
        public index: number,
        public size: TitleComponentSize,
        public text: string
    ){ super(id, index); }
}