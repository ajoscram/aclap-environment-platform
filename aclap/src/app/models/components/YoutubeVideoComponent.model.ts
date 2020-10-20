import { Component } from "./Component.model";

export class YoutubeVideoComponent extends Component{
    constructor(
        public id: string,
        public url: string
    ){ super(id); }
}