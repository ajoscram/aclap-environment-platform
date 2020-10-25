import { Section, ISection } from "./Section.model";

export interface IImageSection extends ISection{
    footing: string,
    $url: string,
    reference: string
}

export class ImageSection extends Section{
    constructor(
        public id: string,
        public index: number,
        public footing: string,
        public $url: string,
        public reference: string
    ){ super(id, index); }
}