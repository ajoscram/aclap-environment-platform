import { TestBed } from '@angular/core/testing';
import { Authenticator } from '../Authenticator.service';
import { Role, Session } from '../Session.model';
import { TEST_MODULE } from './FirebaseAuthenticator.service.spec.split';

describe('FirebaseAuthenticator', () => {

    const ADMINISTRATOR_EMAIL = 'admin@email.com';
    const EDUCATOR_EMAIL = 'educator@email.com';
    const INCORECT_EMAIL: string = 'incorrect@email.com';
    const CORRECT_PASSWORD = 'correct';
    const INCORECT_PASWORD: string = 'incorrect';
    
    let authenticator: Authenticator;

    beforeEach(() => {
        TestBed.configureTestingModule(TEST_MODULE);
        authenticator = TestBed.inject(Authenticator);
    });

    xit('login(): logs in as an administrator with the correct email and password', async () => {
        const session: Session = await authenticator.login(ADMINISTRATOR_EMAIL, CORRECT_PASSWORD, Role.ADMINISTRATOR);
        expect(session.email).toBe(ADMINISTRATOR_EMAIL);
        expect(session.role).toBe(Role.ADMINISTRATOR);
    });

/*
    it('(): ', async () => {
        
    });
*/
});