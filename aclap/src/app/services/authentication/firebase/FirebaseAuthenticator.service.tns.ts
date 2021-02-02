import { Injectable } from '@angular/core';
import ControlModule from '@src/app/modules/control/control.module';
import { Authenticator, AuthenticatorError } from '../Authenticator.service';
import { Role, Session } from '../Session.model';
import { firebase } from '@nativescript/firebase';

@Injectable({
    providedIn: ControlModule
})
export class FirebaseAuthenticator implements Authenticator{

    constructor(){}

    private throwError(error: any): void{
        if(error instanceof Error && (<Error>error).message == AuthenticatorError.USER_ROLE_COULD_NOT_BE_RESOLVED)
            throw error;
        else
            throw new Error(AuthenticatorError.AUTHENTICATION_FAILED);
    }

    private async getRole(user: firebase.User): Promise<Role>{
        const token: firebase.IdTokenResult = await user.getIdTokenResult();
        const role: Role = token.claims.role;
        if(role === Role.ADMINISTRATOR || role === Role.EDUCATOR)
            return role;
        else{
            await firebase.logout();
            throw new Error(AuthenticatorError.USER_ROLE_COULD_NOT_BE_RESOLVED);
        }
    }

    async login(email: string, password: string): Promise<Session>{
        try{
            const user: firebase.User = await firebase.login({
                type: firebase.LoginType.PASSWORD,
                passwordOptions:{
                    email: email,
                    password: password
                }
            });
            const role = await this.getRole(user);
            return new Session(user.uid, user.email, role);
        } catch(error) {
            this.throwError(error);
        }
    }

    async getSession(): Promise<Session>{
        try{
            const user: firebase.User = await firebase.getCurrentUser();
            const role: Role = await this.getRole(user);
            return new Session(user.uid, user.email, role);
        } catch(error){
            this.throwError(error);
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
        await this.validate(Role.ANY);//just checking for a user being logged in
        await firebase.logout();
    }

    async setPassword(password: string): Promise<void>{
        try{
            await this.validate(Role.ANY);//just checking for a user being logged in
            await firebase.updatePassword(password);
        } catch(error){
            this.throwError(error);
        }
    }
}