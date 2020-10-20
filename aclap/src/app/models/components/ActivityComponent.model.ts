import { TransitiveCompileNgModuleMetadata } from "@angular/compiler";
import { Question } from "../Question.model";
import { Component } from "./Component.model";

export class ActivityComponent extends Component{
    constructor(
        public id: string,
        public estimatedMinutes: number,
        public tools: string,
        public questions: Question[]
    ){ super(id); }
}