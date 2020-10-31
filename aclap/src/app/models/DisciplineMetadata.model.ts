import { ISubject, Subject } from './Subject.model';

export interface IDisciplineMetadata{
    subjects: ISubject[],
    years: string[]
}

export class DisciplineMetadata {
    constructor(
        public subjects: Subject[],
        public years: string[]
    ){}
}