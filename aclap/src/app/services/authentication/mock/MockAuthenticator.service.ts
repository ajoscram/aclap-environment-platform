import { Injectable } from '@angular/core';
import { Local } from './MockAuthenticator.service.split';
import ControlModule from '../../../modules/control/control.module';
import { Authenticator, AuthenticatorError } from '../Authenticator.service';
import { Role, Session } from '../Session.model';

@Injectable({
    providedIn: ControlModule
})
export class MockAuthenticator implements Authenticator{

    private static readonly SESSION_COOKIE = "aclap-session";

    public static readonly ADMIN_USERNAME: string = 'admin@example.com';
    public static readonly EDUCATOR_USERNAME: string = 'educator1@example.com';
    public static readonly PASSWORD: string = 'password';

    private sessions: Session[];
    private current: Session;

    constructor(){
        this.sessions = [
            new Session('0', MockAuthenticator.ADMIN_USERNAME, Role.ADMINISTRATOR),
            new Session('1', MockAuthenticator.EDUCATOR_USERNAME, Role.EDUCATOR),
            new Session('2', 'educator2@example.com', Role.EDUCATOR),
            new Session('3', 'educator3@example.com', Role.EDUCATOR),
        ];
        this.current = JSON.parse(Local.get(MockAuthenticator.SESSION_COOKIE));
    }

    async login(email: string, password: string, role: Role): Promise<Session>{
        for(let session of this.sessions){
            if(session.email === email && session.role === role && password === MockAuthenticator.PASSWORD){
                this.current = session;
                Local.set(MockAuthenticator.SESSION_COOKIE, JSON.stringify(this.current));
                return this.current;
            }
        }
        throw new Error(AuthenticatorError.AUTHENTICATION_FAILED);
    }

    private validateSession(){
        if(!this.current)
            throw new Error(AuthenticatorError.NOT_AUTHENTICATED);
    }

    async validate(role: Role): Promise<void>{
        this.validateSession();
        if(role === Role.ADMINISTRATOR && this.current.role !== Role.ADMINISTRATOR)
            throw new Error(AuthenticatorError.USER_NOT_ADMINISTRATOR);
        if(role === Role.EDUCATOR && this.current.role !== Role.EDUCATOR)
            throw new Error(AuthenticatorError.USER_NOT_EDUCATOR);
    }

    async getSession(): Promise<Session>{
        this.validateSession();
        return this.current;
    }

    async logout(): Promise<void>{
        this.validateSession();
        Local.set(MockAuthenticator.SESSION_COOKIE, null);
        this.current = null;
    }

}