import { Component } from "./Component.model";

export class ParagraphComponent extends Component{
    constructor(
        public id: string,
        public text: string
    ){ super(id); }
}