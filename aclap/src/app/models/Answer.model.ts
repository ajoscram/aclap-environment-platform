import { Score } from "../models";

export interface IAnswer{
    questionId: string
    question: string,
    option: string,
    score: Score
}

export class Answer implements IAnswer{
    constructor(
        public id: string,
        public questionId: string,
        public question: string,
        public option: string,
        public score: Score
    ){}
}