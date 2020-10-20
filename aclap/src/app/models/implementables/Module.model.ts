import { Discipline } from "../Discipline.model";
import { Implementable } from "./Implementable.model";

export interface IModule{
    name: string,
    publisherId: string,
    publisherName: string,
    publisherLastname: string,
    recommendedAge: number,
    objectives: string[],
    requirements: string[],
    disciplines: Discipline[]
}

export class Module extends Implementable implements IModule{
    constructor(
        public id: string,
        public name: string,
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
            publisherId,
            publisherName,
            publisherLastname,
            objectives
        )
    }
}