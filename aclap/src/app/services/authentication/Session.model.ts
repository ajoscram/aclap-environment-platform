export class Session{
    constructor(
        public user_id: string,
        public email: string,
        public role: Role
    ){}
}

export enum Role{
    ADMINISTRATOR,
    EDUCATOR,
    ANY
}