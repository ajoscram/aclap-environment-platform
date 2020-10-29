import { IDiscipline, Discipline } from "../Discipline.model";
import { IImplementable, Implementable } from "./Implementable.model";

export interface IModule extends IImplementable{
    recommendedAge: number,
    requirements: string[],
    disciplines: IDiscipline[]
}

export class Module extends Implementable{
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