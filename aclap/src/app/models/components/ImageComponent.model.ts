import { Component } from "./Component.model";

export interface IImageComponent{
    footing: string,
    url: string,
    reference: string
}

export class ImageComponent extends Component implements IImageComponent{
    constructor(
        public id: string,
        public footing: string,
        public url: string,
        public reference: string
    ){ super(id); }
}