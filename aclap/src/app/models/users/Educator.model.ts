import { User } from "./User.model";

export class Educator extends User{
    constructor(
        public id: string,
        public imageUrl: string,
        public name: string,
        public lastname: string,
        public email: string,
        public phone: string,
        public joined: Date
    ){
        super(
            id,
            imageUrl,
            name,
            lastname,
            email
        )
    }
}