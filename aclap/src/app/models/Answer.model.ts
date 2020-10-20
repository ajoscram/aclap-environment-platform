import { Score } from "../models/Score.model";

export default class Answer {
    constructor(
        public question: string,
        public option: string,
        public score: Score
    ){}

}