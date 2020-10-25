import { Section, ISection } from "./Section.model";

export interface IParagraphSection extends ISection{
    text: string
}

export class ParagraphSection extends Section{
    constructor(
        public id: string,
        public index: number,
        public text: string
    ){ super(id, index); }
}