import { Section, ISection } from "./Section.model";

export interface IYoutubeVideoSection extends ISection{
    url: string
}

export class YoutubeVideoSection extends Section{
    constructor(
        public id: string,
        public index: number,
        public url: string
    ){ super(id, index); }
}