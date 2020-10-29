import { User, IUser } from "./User.model";

export interface IEducator extends IUser{
    phone: string,
    joined: Date
}

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

    public static check(object: any): object is IEducator{
        const educator: IEducator = <IEducator>object;
        return super.check(object) && 
            educator.phone !== undefined &&
            educator.joined !== undefined;
    }
}