import { Injectable } from '@angular/core';
import ControlModule from '../../../modules/control/control.module';
import { isPath } from './Pathfinder.service.split';

@Injectable({
    providedIn: ControlModule
})
export class Pathfinder{

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
                    typeof source[key] === Pathfinder.STRING_TYPE &&
                    key.startsWith(Pathfinder.INDENTIFIER) &&
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

    protected isPath(input: string): boolean{
        return isPath(input, Pathfinder.INDENTIFIER);
    };
}

export enum PathfinderError{
    RUNTIME_ERROR = 'PathfinderError.RUNTIME_ERROR'
}