import { Answer, IAnswer } from "../models/Answer.model";

export interface IEvaluation{
    activityId: string,
    activityName: string,
    answers: IAnswer[]
}

export class Evaluation {
    constructor(
        public id: string,
        public activityId: string,
        public activityName: string,
        public answers: Answer[]
    ){}
}