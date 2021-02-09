import { Ally } from "../Ally.model";
import { Section, ISection } from "./Section.model";

export interface IAllySection extends ISection{
    ally: Ally;
}

export class AllySection extends Section implements IAllySection{
    constructor(
        public id: string,
        public index: number,
        public ally: Ally
    ){ 
        super(id, index);
        
    }


    public static check(object: any): object is IAllySection{
        const section: IAllySection = <IAllySection>object;
        return super.check(object) && 
            section.ally !== undefined;
    }
}