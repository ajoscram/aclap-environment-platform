import { Section, ISection } from "./Section.model";

export interface IImageSection extends ISection{
    footing: string,
    url: string,
    reference: string
}

export class ImageSection extends Section{
    constructor(
        public id: string,
        public index: number,
        public footing: string,
        public url: string,
        public reference: string
    ){ super(id, index); }

    public static check(object: any): object is IImageSection{
        const section: IImageSection = <IImageSection>object;
        return super.check(object) &&
            section.footing !== undefined &&
            section.reference !== undefined &&
            section.url !== undefined;
    }
}