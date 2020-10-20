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