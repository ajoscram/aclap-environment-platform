export abstract class CommonPathfinder{

    private static readonly STRING_TYPE = 'string';
    private static readonly INDENTIFIER = '$';

    //finds and returns all fields in an object whose key starts with $
    //which have a valid local path
    public find(source: object): Map<string, string>{
        try{
            const paths: Map<string, string> = new Map();
            Object.keys(source).forEach(key => {
                if
                (
                    typeof source[key] === CommonPathfinder.STRING_TYPE &&
                    key.startsWith(CommonPathfinder.INDENTIFIER) &&
                    this.isPath(source[key])
                )
                    paths.set(key, source[key]);
            });
            return paths;
        } catch(error){
            console.error();
            throw new Error(PathfinderError.RUNTIME_ERROR);
        }
    }

    protected abstract isPath(input: string): boolean;
}

export enum PathfinderError{
    RUNTIME_ERROR = 'PathfinderError.RUNTIME_ERROR'
}