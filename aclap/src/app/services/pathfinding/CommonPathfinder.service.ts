export abstract class CommonPathfinder{

    private static readonly STRING_TYPE = 'string';
    private static readonly INDENTIFIER = '$';

    public find(source: object): string[]{
        try{
            const paths: string[] = [];
            Object.keys(source).forEach(key => {
                if
                (
                    typeof source[key] === CommonPathfinder.STRING_TYPE &&
                    key.startsWith(CommonPathfinder.INDENTIFIER) &&
                    this.isPath(source[key])
                )
                    paths.push(source[key]);
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