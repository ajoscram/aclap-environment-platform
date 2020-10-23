import { Question } from "../Question.model";
import { Component, IComponent } from "./Component.model";

export interface IActivityComponent extends IComponent{
    description: string,
    estimatedMinutes: number,
    tools: string,
    questions: Question[]
}

export class ActivityComponent extends Component implements IActivityComponent{
    constructor(
        public id: string,
        public index: number,
        public description: string,
        public estimatedMinutes: number,
        public tools: string,
        public questions: Question[]
    ){ super(id, index); }
}