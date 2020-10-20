export enum EducatorRequestState{
    APPROVED,
    DENIED,
    PENDING
}

export class EducatorRequest{
    constructor(
        public id: string,
        public name: string,
        public lastname: string,
        public email: string,
        public phone: string,
        public address: Location,
        public issued: Date,
        public state: EducatorRequestState
    ){}
}