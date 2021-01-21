import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { Authenticator } from '../Authenticator.service';
import { Role, Session } from '../Session.model';
import { TEST_MODULE } from './FirebaseAuthenticator.service.spec.split';

describe('FirebaseAuthenticator', () => {

    const ADMINISTRATOR_EMAIL = 'admin@email.com';
    const EDUCATOR_EMAIL = 'educator@email.com';
    const CORRECT_PASSWORD = 'correct';
    const INCORECT_PASWORD: string = 'incorrect';
    
    let firebase: AngularFireAuth;
    let authenticator: Authenticator;

    beforeAll(() => {
        TestBed.configureTestingModule(TEST_MODULE);
        authenticator = TestBed.inject(Authenticator);
        firebase = TestBed.inject(AngularFireAuth);
        firebase.createUserWithEmailAndPassword(ADMINISTRATOR_EMAIL, CORRECT_PASSWORD);
    });

    it('login(): logs in as an administrator with the correct email and password', async () => {
        const session: Session = await authenticator.login(ADMINISTRATOR_EMAIL, CORRECT_PASSWORD);
        expect(session.email).toBe(ADMINISTRATOR_EMAIL);
        expect(session.role).toBe(Role.ADMINISTRATOR);
    });
/*
    it('(): ', async () => {
        
    });
*/
});