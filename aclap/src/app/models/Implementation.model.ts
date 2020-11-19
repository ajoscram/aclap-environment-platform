import { Location, ILocation } from '.';

export interface IImplementation{
    date: Date,
    participants: number,
    location: ILocation,
    educatorId: string,
    educatorName: string,
    educatorLastname: string,
    implementableId: string,
    implementableName: string
}

export class Implementation {
    constructor(
        public id: string,
        public deleted: boolean,
        public completed: boolean,
        public date: Date,
        public participants: number,
        public location: Location,
        public educatorId: string,
        public educatorName: string,
        public educatorLastname: string,
        public implementableId: string,
        public implementableName: string
    ){}

}