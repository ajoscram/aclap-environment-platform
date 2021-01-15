import { AngularFireAuth } from '@angular/fire/auth';
import { Authenticator, AuthenticatorError } from '../Authenticator.service';
import { Role, Session } from '../Session.model';

export class FirebaseAuthenticator implements Authenticator{

    private session: Session;

    constructor(
        private auth: AngularFireAuth
    ){
        this.session = null;
    }

    private async getRole(user: firebase.User): Promise<Role>{
        const token: firebase.auth.IdTokenResult = await user.getIdTokenResult();
        const role: Role = token.claims.role;
        if(role === Role.ADMINISTRATOR || role === Role.EDUCATOR)
            return role;
        else
            throw new Error(FirebaseAuthenticatorError.USER_ROLE_COULD_NOT_BE_RESOLVED);
    }

    async login(email: string, password: string): Promise<Session>{
        try{
            await this.auth.signInWithEmailAndPassword(email, password);
            const user: firebase.User = await this.auth.currentUser;
            const id: string = user.uid;
            const role: Role = await this.getRole(user);
            this.session = new Session(id, email, role);
            return new Session(id, email, role);
        } catch(error) {
            console.error(error);
            throw new Error(AuthenticatorError.AUTHENTICATION_FAILED);
        }
    }

    private async validateLogged(){
        if(this.session === null){
            const user: firebase.User = await this.auth.currentUser;
            if(!user)
                throw new Error(AuthenticatorError.NOT_AUTHENTICATED);
            else{
                const role: Role = await this.getRole(user);
                this.session = new Session(user.uid, user.email, role);
            }   
        }
    }

    async validate(role: Role): Promise<void>{
        await this.validateLogged();
        if(role === Role.ADMINISTRATOR && this.session.role !== Role.ADMINISTRATOR)
            throw new Error(AuthenticatorError.USER_NOT_ADMINISTRATOR);
        else if(role === Role.EDUCATOR && this.session.role !== Role.EDUCATOR)
            throw new Error(AuthenticatorError.USER_NOT_EDUCATOR);
    }

    async getSession(): Promise<Session>{
        this.validateLogged();
        return new Session(this.session.user_id, this.session.email, this.session.role);
    }

    async logout(): Promise<void>{
        await this.validateLogged();
        await this.auth.signOut();
        this.session = null;
    }

    async setPassword(password: string): Promise<void>{
        await this.validateLogged();
        const user: firebase.User = await this.auth.currentUser;
        try {
            await user.updatePassword(password);
        } catch(error) {
            if(error['code'] === 'auth/requires-recent-login')
                throw new Error(FirebaseAuthenticatorError.REAUTHENTICATION_REQUIRED)
            throw error;
        }
    }
}

export enum FirebaseAuthenticatorError{
    USER_ROLE_COULD_NOT_BE_RESOLVED = "FirebaseAuthenticatorError.USER_ROLE_COULD_NOT_BE_RESOLVED",
    REAUTHENTICATION_REQUIRED = "FirebaseAuthenticatorError.REAUTHENTICATION_REQUIRED"
}