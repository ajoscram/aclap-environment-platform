import { Section, ISection } from "./Section.model";

export interface IActivitySection extends ISection{
    description: string,
    estimatedMinutes: number,
    tools: string
}

export class ActivitySection extends Section implements IActivitySection{
    constructor(
        public id: string,
        public index: number,
        public description: string,
        public estimatedMinutes: number,
        public tools: string
    ){ super(id, index); }

    public static check(object: any): object is IActivitySection{
        const section: IActivitySection = <IActivitySection>object;
        return super.check(object) && 
            section.description !== undefined &&
            section.estimatedMinutes !== undefined &&
            section.tools !== undefined;
    }
}