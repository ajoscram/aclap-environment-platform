import Answer from "../models/Answer.model";

export default class Evaluation {
    constructor(
        public id: string,
        public date: Date,
        public activityId: string,
        public activityName: string,
        public answers: Answer[]
    ){}

}