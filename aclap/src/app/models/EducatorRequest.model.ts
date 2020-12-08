import { Location, ILocation } from '.';

export enum EducatorRequestState{
    APPROVED,
    DENIED,
    PENDING
}

export interface IEducatorRequest{
    name: string,
    lastname: string,
    email: string,
    phone: string,
    address: ILocation,
    birthday: Date,
    organization: string
}

export class EducatorRequest implements IEducatorRequest{
    constructor(
        public id: string,
        public name: string,
        public lastname: string,
        public email: string,
        public phone: string,
        public address: Location,
        public birthday: Date,
        public organization: string,
        public issued: Date,
        public state: EducatorRequestState
    ){}
}