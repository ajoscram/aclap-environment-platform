import { Subject } from '.';

export class Discipline {
    constructor(
        public subject: Subject,
        public year: string,
        public theme: string
    ){}
}