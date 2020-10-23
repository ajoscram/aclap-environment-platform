import { Subject } from '.';

export class DisciplineMetadata {
    constructor(
        public subjects: Subject[],
        public years: string[]
    ){}
}