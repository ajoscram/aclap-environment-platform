import Score from "./Score";

export default class Question {
    constructor(
        public question: string,
        public options: Map<Score, string>
    ){}
}