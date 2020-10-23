import { Injectable } from '@angular/core';
import ControlModule from '../../modules/control.module';
import { Authenticator, AuthenticatorError } from './Authenticator.service';
import { Role, Session } from './Session.model';

@Injectable({
    providedIn: ControlModule
})
export class MockAuthenticator implements Authenticator{
    private session: Session;

    async login(email: string, password: string, role: Role): Promise<Session>{
        this.session = new Session('USER_ID_HERE', email, role);
        return this.session;
    }

    private validateSession(){
        if(!this.session)
            throw new Error(AuthenticatorError.USER_NOT_LOGGED);
    }

    async validate(role: Role): Promise<void>{
        this.validateSession();
        if(role === Role.ADMINISTRATOR && this.session.role !== Role.ADMINISTRATOR)
            throw new Error(AuthenticatorError.USER_NOT_ADMINISTRATOR);
        if(role === Role.EDUCATOR && this.session.role !== Role.EDUCATOR)
            throw new Error(AuthenticatorError.USER_NOT_EDUCATOR);
    }

    async getSession(): Promise<Session>{
        this.validateSession();
        return this.session;
    }

    async logout(): Promise<void>{
        this.validateSession();
        this.session = null;
    }

}