import { Section, ISection } from "./Section.model";

export interface IParagraphSection extends ISection{
    text: string
}

export class ParagraphSection extends Section implements IParagraphSection{
    constructor(
        public id: string,
        public index: number,
        public text: string
    ){ super(id, index); }

    public static check(object: any): object is IParagraphSection{
        const section: IParagraphSection = <IParagraphSection>object;
        return super.check(object) &&
            section.text !== undefined;
    }
}