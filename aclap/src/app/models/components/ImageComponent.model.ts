import { Component } from "./Component.model";

export class ImageComponent extends Component{
    constructor(
        public id: string,
        public footing: string,
        public url: string,
        public reference: string
    ){ super(id); }
}