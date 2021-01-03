export abstract class Checkable{
    private static readonly CHECK_ERROR = 'Checkable children classes must override the check() method.';

    constructor(){}

    //Children classes must override this function
    public static check(object: any): object is Checkable{
        throw new Error(Checkable.CHECK_ERROR);
    }
}