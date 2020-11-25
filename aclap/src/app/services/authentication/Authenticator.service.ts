import { Session, Role } from "./Session.model";

export abstract class Authenticator{
    login: (email: string, password: string) => Promise<Session>;
    logout: () => Promise<void>;
    validate: (role: Role) => Promise<void>;
    getSession: () => Promise<Session>;
}

export enum AuthenticatorError{
    AUTHENTICATION_FAILED = "AuthenticatorError.AUTHENTICATION_FAILED",
    NOT_AUTHENTICATED = "AuthenticatorError.NOT_AUTHENTICATED",
    USER_NOT_ADMINISTRATOR = "AuthenticatorError.USER_NOT_ADMINISTRATOR",
    USER_NOT_EDUCATOR = "AuthenticatorError.USER_NOT_EDUCATOR"
}