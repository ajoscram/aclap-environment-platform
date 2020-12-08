import { IUser, User } from "./User.model";

export interface IAdministrator extends IUser{ }

export class Administrator extends User implements IAdministrator{
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

    //WARNING:
    //IAdministrator and IUser share exactly the same fields
    //An IUser object will return true for this check.
    public static check(object: any): object is IAdministrator{
        const administrator: IAdministrator = <IAdministrator>object;
        return super.check(administrator);
    }
}