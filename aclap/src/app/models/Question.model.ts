import { Score } from "../models/Score.model";

export class Question {
    constructor(
        public question: string,
        public options: Map<Score, string>
    ){}
}