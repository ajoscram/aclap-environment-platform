import { Checkable } from '../Checkable.model';

export interface ISection{
    index: number
}

export abstract class Section extends Checkable implements ISection{
    
    constructor(
        public id: string,
        public index: number
    ){ super(); }

    //Children must override this function
    public static check(object: any): object is ISection{
        const section: ISection = <ISection>object;
        return section.index !== undefined;
    }
}