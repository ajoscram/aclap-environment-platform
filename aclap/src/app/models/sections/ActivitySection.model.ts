import { Question } from "../Question.model";
import { Section, ISection } from "./Section.model";

export interface IActivitySection extends ISection{
    description: string,
    estimatedMinutes: number,
    tools: string,
    questions: Question[]
}

export class ActivitySection extends Section{
    constructor(
        public id: string,
        public index: number,
        public description: string,
        public estimatedMinutes: number,
        public tools: string,
        public questions: Question[]
    ){ super(id, index); }

    public static check(object: any): object is IActivitySection{
        const section: IActivitySection = <IActivitySection>object;
        return super.check_(object) && 
            section.description !== undefined &&
            section.estimatedMinutes !== undefined &&
            section.questions !== undefined &&
            section.tools !== undefined;
    }
}