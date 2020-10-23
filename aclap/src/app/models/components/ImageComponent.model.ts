import { Component, IComponent } from "./Component.model";

export interface IImageComponent extends IComponent{
    footing: string,
    url: string,
    reference: string
}

export class ImageComponent extends Component implements IImageComponent{
    constructor(
        public id: string,
        public index: number,
        public footing: string,
        public url: string,
        public reference: string
    ){ super(id, index); }
}