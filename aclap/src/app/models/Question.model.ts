import { Score } from "../models/Score.model";

export default class Question {
    constructor(
        public question: string,
        public options: Map<Score, string>
    ){}
}