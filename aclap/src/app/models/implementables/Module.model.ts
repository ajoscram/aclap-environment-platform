import { Discipline } from "../Discipline.model";
import { IImplementable, Implementable } from "./Implementable.model";

export interface IModule extends IImplementable{
    recommendedAge: number,
    requirements: string[],
    disciplines: Discipline[]
}

export class Module extends Implementable implements IModule{
    constructor(
        public id: string,
        public name: string,
        public imageUrl: string,
        public publisherId: string,
        public publisherName: string,
        public publisherLastname: string,
        public recommendedAge: number,
        public objectives: string[],
        public requirements: string[],
        public disciplines: Discipline[]
    ){
        super(
            id,
            name,
            imageUrl,
            publisherId,
            publisherName,
            publisherLastname,
            objectives
        )
    }
}