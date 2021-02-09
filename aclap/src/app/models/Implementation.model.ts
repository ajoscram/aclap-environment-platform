import { Location, ILocation } from '.';

export interface IImplementation{
    date: Date,
    maleParticipants: number,
    femaleParticipants: number,
    otherParticipants: number,
    location: ILocation,
    educatorId: string,
    educatorName: string,
    educatorLastname: string,
    implementableId: string,
    implementableName: string
}

export class Implementation implements IImplementation{
    constructor(
        public id: string,
        public deleted: boolean,
        public completed: boolean,
        public date: Date,
        public maleParticipants: number,
        public femaleParticipants: number,
        public otherParticipants: number,
        public location: Location,
        public educatorId: string,
        public educatorName: string,
        public educatorLastname: string,
        public implementableId: string,
        public implementableName: string
    ){}
}