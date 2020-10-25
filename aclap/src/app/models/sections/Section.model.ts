export interface ISection{
    index: number
}

export abstract class Section{
    private static readonly CHECK_ERROR = 'Section children classes must override the check() method.';

    constructor(
        public id: string,
        public index: number
    ){}

    //this function is to be used by children to check for ISection
    protected static check_(object: any): object is ISection{
        const section: ISection = <ISection>object;
        return section.index !== undefined;
    }
    
    //Children must override this function
    public static check(object: any): object is ISection{
        throw new Error(Section.CHECK_ERROR);
    }
}