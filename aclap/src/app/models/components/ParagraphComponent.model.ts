import { Component, IComponent } from "./Component.model";

export interface IParagraphComponent extends IComponent{
    text: string
}

export class ParagraphComponent extends Component implements IParagraphComponent{
    constructor(
        public id: string,
        public index: number,
        public text: string
    ){ super(id, index); }
}