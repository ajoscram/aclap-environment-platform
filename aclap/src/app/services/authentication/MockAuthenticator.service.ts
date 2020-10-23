import { Injectable } from '@angular/core';
import ControlModule from '../../modules/control.module';
import { Authenticator, AuthenticatorError } from './Authenticator.service';
import { Role, Session } from './Session.model';

@Injectable({
    providedIn: ControlModule
})
export class MockAuthenticator implements Authenticator{
    private sessions: Session[];
    private current: Session;

    constructor(){
        this.sessions = [
            new Session('0', 'admin@example.com', Role.ADMINISTRATOR),
            new Session('1', 'educator1@example.com', Role.EDUCATOR),
            new Session('2', 'educator2@example.com', Role.EDUCATOR),
            new Session('3', 'educator3@example.com', Role.EDUCATOR),
        ];
        this.current = null;
    }

    async login(email: string, password: string, role: Role): Promise<Session>{
        for(let session of this.sessions)
            if(session.email === email && session.role === role)
                return session;
        throw new Error(AuthenticatorError.USER_NOT_FOUND);
    }

    private validateSession(){
        if(!this.current)
            throw new Error(AuthenticatorError.USER_NOT_LOGGED);
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
        this.current = null;
    }

}