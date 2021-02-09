import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import ControlModule from '@src/app/modules/control/control.module';
import { Authenticator, AuthenticatorError } from '../Authenticator.service';
import { Role, Session } from '../Session.model';

@Injectable({
    providedIn: ControlModule
})
export class FirebaseAuthenticator implements Authenticator{

    private session: Session;

    constructor(
        private auth: AngularFireAuth
    ){
        this.session = undefined; //undefined while user state is unknown
        auth.onAuthStateChanged( async (user: firebase.default.User) => {
            if(user){
                const role: Role = await this.getRole(user);
                this.session = new Session(user.uid, user.email, role);
            } else{
                this.session = null;
            }
        });
    }

    private async getRole(user: firebase.default.User): Promise<Role>{
        const token: firebase.default.auth.IdTokenResult = await user.getIdTokenResult();
        const role: Role = token.claims.role;
        if(role === Role.ADMINISTRATOR || role === Role.EDUCATOR)
            return role;
        else{
            await this.auth.signOut();
            throw new Error(AuthenticatorError.USER_ROLE_COULD_NOT_BE_RESOLVED);
        }
    }

    async login(email: string, password: string): Promise<Session>{
        try{
            const credentials: firebase.default.auth.UserCredential = await this.auth.signInWithEmailAndPassword(email, password);
            const user: firebase.default.User = credentials.user;
            const role: Role = await this.getRole(user);
            return new Session(user.uid, user.email, role);
        } catch(error) {
            if(error instanceof Error && (<Error>error).message == AuthenticatorError.USER_ROLE_COULD_NOT_BE_RESOLVED)
                throw error;
            else
                throw new Error(AuthenticatorError.AUTHENTICATION_FAILED);
        }
    }

    private async wait(milliseconds: number): Promise<void>{
        await new Promise( _ => setTimeout(_, milliseconds));
    }

    async getSession(): Promise<Session>{
        if(this.session)
            return new Session(this.session.user_id, this.session.email, this.session.role);
        else if(this.session === null)
            throw new Error(AuthenticatorError.NOT_AUTHENTICATED);
        else{
            await this.wait(100);
            return this.getSession();
        }
    }

    async validate(role: Role): Promise<void>{
        const session: Session = await this.getSession();
        if(role === Role.ADMINISTRATOR && session.role !== Role.ADMINISTRATOR)
            throw new Error(AuthenticatorError.USER_NOT_ADMINISTRATOR);
        else if(role === Role.EDUCATOR && session.role !== Role.EDUCATOR)
            throw new Error(AuthenticatorError.USER_NOT_EDUCATOR);
    }

    async logout(): Promise<void>{
        await this.getSession();
        await this.auth.signOut();
    }

    async setPassword(password: string): Promise<void>{
        await this.getSession();
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