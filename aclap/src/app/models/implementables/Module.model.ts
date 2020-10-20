import { Discipline } from "../Discipline.model";
import { Implementable } from "./Implementable.model";

export class Module extends Implementable{
    constructor(
        public id: string,
        public name: string,
        public publisherId: string,
        public publisherName: string,
        public publisherLastname: string,
        public objectives: string[],
        public disciplines: Discipline[],
        public requirements: string[],
        public recommendedAge: number
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