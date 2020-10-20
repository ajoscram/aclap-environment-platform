import { Component } from "./Component.model";

export interface IParagraphComponent{
    text: string
}

export class ParagraphComponent extends Component implements IParagraphComponent{
    constructor(
        public id: string,
        public text: string
    ){ super(id); }
}