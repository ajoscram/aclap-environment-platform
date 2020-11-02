import { Role, Session } from '../Session.model';
import { MockAuthenticator } from './MockAuthenticator.service';

export class Local{

    static set(key: string, value: string): void{
        //does nothing currently
    }

    static get(key: string): string{
        const session: Session = new Session('0', MockAuthenticator.ADMIN_USERNAME, Role.ADMINISTRATOR);
        return JSON.stringify(session);
    }
}