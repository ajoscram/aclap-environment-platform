import { User, IUser } from "./User.model";
import { ILocation, Location } from "../Location.model";

export interface IEducator extends IUser{
    phone: string,
    address: ILocation,
    birthday: Date,
    organization: string,
    joined: Date
}

export class Educator extends User implements IEducator{
    constructor(
        public id: string,
        public imageUrl: string,
        public name: string,
        public lastname: string,
        public email: string,
        public phone: string,
        public address: Location,
        public birthday: Date,
        public organization: string,
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
            educator.address !== undefined &&
            educator.birthday !== undefined &&
            educator.organization !== undefined &&
            educator.joined !== undefined;
    }
}