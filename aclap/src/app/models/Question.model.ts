import { Score } from "../models/Score.model";

export interface IQuestion{
    question: string,
    options: Map<Score, string>
}

export class Question implements IQuestion{
    constructor(
        public question: string,
        public options: Map<Score, string>
    ){}
}