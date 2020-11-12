import { Checkable } from '../Checkable.model';

export interface IUser{
    imageUrl: string,
    name: string,
    lastname: string,
    email: string
}

export abstract class User extends Checkable{
    constructor(
        public id: string,
        public imageUrl: string,
        public name: string,
        public lastname: string,
        public email: string
    ){ super(); }

    public static check(object: any): object is IUser{
        const user: IUser = <IUser>object;
        return user.imageUrl !== undefined &&
            user.name !== undefined &&
            user.lastname !== undefined &&
            user.email !== undefined;
    }
}