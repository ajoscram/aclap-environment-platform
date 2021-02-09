export interface ISubject{
    name: string,
    color: string
}

export class Subject implements ISubject{
    constructor(
        public name: string,
        public color: string
    ){}
}