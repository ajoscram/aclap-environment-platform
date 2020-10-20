import Score from "./Score";

export class Question {
    constructor(
        public question: string,
        public options: Map<Score, string>
    ){}
}