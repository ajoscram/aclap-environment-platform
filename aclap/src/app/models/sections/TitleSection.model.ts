import { Section, ISection } from "./Section.model";

export enum TitleSectionSize{
    H1,
    H2
}

export interface ITitleSection extends ISection{
    size: TitleSectionSize,
    text: string
}

export class TitleSection extends Section{
    constructor(
        public id: string,
        public index: number,
        public size: TitleSectionSize,
        public text: string
    ){ super(id, index); }

    public static check(object: any): object is ITitleSection{
        const section: ITitleSection = <ITitleSection>object;
        return super.check_(object) &&
            section.size !== undefined && 
            section.text !== undefined;
    }
}