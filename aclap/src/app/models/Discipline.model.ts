import { Subject, ISubject } from './Subject.model';

export interface IDiscipline{
    subject: ISubject,
    year: string,
    theme: string
}

export class Discipline implements IDiscipline{
    constructor(
        public subject: Subject,
        public year: string,
        public theme: string
    ){}
}