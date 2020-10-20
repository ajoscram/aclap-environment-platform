import { Component } from "./Component.model";

export interface IYoutubeVideoComponent{
    url: string
}

export class YoutubeVideoComponent extends Component implements IYoutubeVideoComponent{
    constructor(
        public id: string,
        public url: string
    ){ super(id); }
}