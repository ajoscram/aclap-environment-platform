import { Component } from "./Component.model";

export class TitleComponent extends Component{
    constructor(
        public id: string,
        public size: TitleComponentSize,
        public text: string
    ){ super(id); }
}

export enum TitleComponentSize{
    H1,
    H2
}