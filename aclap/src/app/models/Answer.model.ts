import { Score } from "../models";

export class Answer {
    constructor(
        public question: string,
        public option: string,
        public score: Score
    ){}
}