import { Session, Role } from "./Session.model";

export abstract class Authenticator{
    login: (email: string, password: string, role: Role) => Promise<Session>;
    validate: (role: Role) => Promise<void>;
    getSession: () => Promise<Session>;
    logout: () => Promise<void>;
}

export enum AuthenticatorError{
    USER_NOT_FOUND = "AuthenticatorError.USER_NOT_FOUND",
    USER_NOT_LOGGED = "AuthenticatorError.USER_NOT_LOGGED",
    USER_NOT_ADMINISTRATOR = "AuthenticatorError.USER_NOT_ADMINISTRATOR",
    USER_NOT_EDUCATOR = "AuthenticatorError.USER_NOT_EDUCATOR"
}