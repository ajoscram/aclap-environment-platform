import { Score } from "../models";

export interface IAnswer{
    question: string,
    option: string,
    score: Score
}

export class Answer implements IAnswer{
    constructor(
        public question: string,
        public option: string,
        public score: Score
    ){}
}