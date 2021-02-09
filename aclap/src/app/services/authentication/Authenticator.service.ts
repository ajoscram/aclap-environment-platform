import { Session, Role } from "./Session.model";

export abstract class Authenticator{
    login: (email: string, password: string) => Promise<Session>;
    logout: () => Promise<void>;
    validate: (role: Role) => Promise<void>;
    getSession: () => Promise<Session>;
    setPassword: (password: string) => Promise<void>;
}

export enum AuthenticatorError{
    AUTHENTICATION_FAILED = "AuthenticatorError.AUTHENTICATION_FAILED",
    NOT_AUTHENTICATED = "AuthenticatorError.NOT_AUTHENTICATED",
    USER_NOT_ADMINISTRATOR = "AuthenticatorError.USER_NOT_ADMINISTRATOR",
    USER_NOT_EDUCATOR = "AuthenticatorError.USER_NOT_EDUCATOR",
    INVALID_PASSWORD = "AuthenticatorError.INVALID_PASSWORD",
    USER_ROLE_COULD_NOT_BE_RESOLVED = "AuthenticatorError.USER_ROLE_COULD_NOT_BE_RESOLVED",
    REAUTHENTICATION_REQUIRED = "AuthenticatorError.REAUTHENTICATION_REQUIRED"
}