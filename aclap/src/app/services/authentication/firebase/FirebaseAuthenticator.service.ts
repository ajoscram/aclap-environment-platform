import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import ControlModule from '@src/app/modules/control/control.module';
import { Authenticator, AuthenticatorError } from '../Authenticator.service';
import { Role, Session } from '../Session.model';

@Injectable({
    providedIn: ControlModule
})
export class FirebaseAuthenticator implements Authenticator{

    constructor(
        private auth: AngularFireAuth
    ){}

    private async getRole(user: firebase.default.User): Promise<Role>{
        const token: firebase.default.auth.IdTokenResult = await user.getIdTokenResult();
        const role: Role = token.claims.role;
        if(role === Role.ADMINISTRATOR || role === Role.EDUCATOR)
            return role;
        else
            throw new Error(AuthenticatorError.USER_ROLE_COULD_NOT_BE_RESOLVED);
    }

    async login(email: string, password: string): Promise<Session>{
        try{
            const credentials: firebase.default.auth.UserCredential = await this.auth.signInWithEmailAndPassword(email, password);
            const user: firebase.default.User = credentials.user;
            const role: Role = await this.getRole(user);
            return new Session(user.uid, user.email, role);
        } catch(error) {
            throw new Error(AuthenticatorError.AUTHENTICATION_FAILED);
        }
    }

    private async validateLogged(): Promise<void>{
        const user: firebase.default.User = await this.auth.currentUser;
        if(!user)
            throw new Error(AuthenticatorError.NOT_AUTHENTICATED);
    }

    async getSession(): Promise<Session>{
        await this.validateLogged();
        const user: firebase.default.User = await this.auth.currentUser;
        const role: Role = await this.getRole(user);
        return new Session(user.uid, user.email, role);
    }

    async validate(role: Role): Promise<void>{
        const session: Session = await this.getSession();
        if(role === Role.ADMINISTRATOR && session.role !== Role.ADMINISTRATOR)
            throw new Error(AuthenticatorError.USER_NOT_ADMINISTRATOR);
        else if(role === Role.EDUCATOR && session.role !== Role.EDUCATOR)
            throw new Error(AuthenticatorError.USER_NOT_EDUCATOR);
    }

    async logout(): Promise<void>{
        await this.validateLogged();
        await this.auth.signOut();
    }

    async setPassword(password: string): Promise<void>{
        await this.validateLogged();
        const user: firebase.default.User = await this.auth.currentUser;
        try {
            await user.updatePassword(password);
        } catch(error) {
            if(error['code'] === 'auth/requires-recent-login')
                throw new Error(AuthenticatorError.REAUTHENTICATION_REQUIRED)
            throw error;
        }
    }
}