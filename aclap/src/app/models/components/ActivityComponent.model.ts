import { TransitiveCompileNgModuleMetadata } from "@angular/compiler";
import { Question } from "../Question.model";
import { Component } from "./Component.model";

export interface IActivityComponent{
    description: string,
    estimatedMinutes: number,
    tools: string,
    questions: Question[]
}

export class ActivityComponent extends Component implements IActivityComponent{
    constructor(
        public id: string,
        public description: string,
        public estimatedMinutes: number,
        public tools: string,
        public questions: Question[]
    ){ super(id); }
}