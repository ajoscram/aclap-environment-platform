import { User } from "../../models";

export abstract class Authenticator{
    login: (email: string, password: string, type: UserType) => User;
    validate: (type: UserType) => void;
    getUser: () => User;
    logout: () => void;
}

export enum UserType{
    ADMINISTRATOR,
    EDUCATOR
}

export enum AuthenticatorError{
    
}