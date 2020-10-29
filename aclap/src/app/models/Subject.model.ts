export interface ISubject{
    name: string,
    color: string
}

export class Subject {
    constructor(
        public name: string,
        public color: string
    ){}
}