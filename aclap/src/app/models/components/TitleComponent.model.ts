import { Component } from "./Component.model";

export enum TitleComponentSize{
    H1,
    H2
}

export interface ITitleComponent{
    size: TitleComponentSize,
    text: string
}

export class TitleComponent extends Component implements ITitleComponent{
    constructor(
        public id: string,
        public size: TitleComponentSize,
        public text: string
    ){ super(id); }
}