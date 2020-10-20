import { User } from "./User.model";

export class Administrator extends User{
    constructor(
        public id: string,
        public imageUrl: string,
        public name: string,
        public lastname: string,
        public email: string
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