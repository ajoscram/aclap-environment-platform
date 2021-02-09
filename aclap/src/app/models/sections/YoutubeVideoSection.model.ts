import { Section, ISection } from "./Section.model";

export interface IYoutubeVideoSection extends ISection{
    url: string
}

export class YoutubeVideoSection extends Section implements IYoutubeVideoSection{
    constructor(
        public id: string,
        public index: number,
        public url: string
    ){ super(id, index); }

    public static check(object: any): object is IYoutubeVideoSection{
        const section: IYoutubeVideoSection = <IYoutubeVideoSection>object;
        return super.check(object) &&
            section.url !== undefined;
    }
}