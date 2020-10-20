import { Answer } from "../models/Answer.model";

export class Evaluation {
    constructor(
        public id: string,
        public date: Date,
        public activityId: string,
        public activityName: string,
        public answers: Answer[]
    ){}
}