import { Location, ILocation } from '.';

export interface IImplementation{
    startDate: Date,
    endDate: Date,
    participants: number,
    location: ILocation,
    deleted: boolean,
    educatorId: string,
    educatorName: string,
    educatorLastname: string,
    implementableId: string,
    implementableName: string
}

export class Implementation {
    constructor(
        public id: string,
        public startDate: Date,
        public endDate: Date,
        public participants: number,
        public location: Location,
        public deleted: boolean,
        public educatorId: string,
        public educatorName: string,
        public educatorLastname: string,
        public implementableId: string,
        public implementableName: string
    ){}

}