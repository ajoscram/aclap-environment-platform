import { Component, IComponent } from "./Component.model";

export interface IYoutubeVideoComponent extends IComponent{
    url: string
}

export class YoutubeVideoComponent extends Component implements IYoutubeVideoComponent{
    constructor(
        public id: string,
        public index: number,
        public url: string
    ){ super(id, index); }
}