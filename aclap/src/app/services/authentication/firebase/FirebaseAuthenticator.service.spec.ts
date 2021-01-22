import { TestBed } from '@angular/core/testing';
import { environment } from '@src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { TEST_MODULE, setup, cleanup } from './FirebaseAuthenticator.service.spec.split';
import { Authenticator, AuthenticatorError } from '../Authenticator.service';
import { Role, Session } from '../Session.model';

describe('FirebaseAuthenticator', () => {

    const administrator = environment.testing.users.administrator;
    const educator = environment.testing.users.educator;
    const broken = environment.testing.users.broken;
    const INCORECT_PASWORD: string = 'incorrect';
    
    let authenticator: Authenticator;
    let http: HttpClient;

    beforeEach(async () => {
        TestBed.configureTestingModule(TEST_MODULE);
        authenticator = TestBed.inject(Authenticator);
        http = TestBed.inject(HttpClient);
        await setup(http);
    });

    it('login(): logs in as an administrator with the correct email and password', async () => {
        const session: Session = await authenticator.login(administrator.email, administrator.password);
        expect(session.email).toBe(administrator.email);
        expect(session.role).toBe(Role.ADMINISTRATOR);
    });

    it('login(): fails with incorrect credentials', async () => {
        await expectAsync(authenticator.login(administrator.email, INCORECT_PASWORD)).toBeRejectedWith(
            new Error(AuthenticatorError.AUTHENTICATION_FAILED)
        );
    });

    it('login(): fails when a user doesn\'t have a valid role', async () => {
        await expectAsync(authenticator.login(broken.email, broken.password)).toBeRejectedWith(
            new Error(AuthenticatorError.AUTHENTICATION_FAILED)
        );
    });

    it('logout(): logs a user out of the application', async () => {
        await authenticator.login(administrator.email, administrator.password);
        await expectAsync(authenticator.logout()).toBeResolved();
    });

    it('logout(): fails when no user is logged in', async () => {
        await authenticator.login(administrator.email, administrator.password);
        await authenticator.logout();
        await expectAsync(authenticator.logout()).toBeRejectedWith(
            new Error(AuthenticatorError.NOT_AUTHENTICATED)
        );
    });

    it('getSession(): returns the session object for the current user', async () => {
        const logged: Session = await authenticator.login(administrator.email, administrator.password);
        const session: Session = await authenticator.getSession();
        expect(session).toBeTruthy();
        expect(session.email).toBe(logged.email);
        expect(session.role).toBe(logged.role);
        expect(session.user_id).toBe(logged.user_id);
    });

    it('getSession(): fails when no user is logged in', async () => {
        await authenticator.login(administrator.email, administrator.password);
        await authenticator.logout();
        await expectAsync(authenticator.getSession()).toBeRejectedWith(
            new Error(AuthenticatorError.NOT_AUTHENTICATED)
        );
    });

    it('validate(): validates the administrator and educator roles correctly', async () => {
        await authenticator.login(administrator.email, administrator.password);
        await expectAsync(authenticator.validate(Role.ADMINISTRATOR)).toBeResolved();

        await authenticator.login(educator.email, educator.password);
        await expectAsync(authenticator.validate(Role.EDUCATOR)).toBeResolved();
    });

    it('validate(): fails when a user is validated for a role other than their own', async () => {
        await authenticator.login(administrator.email, administrator.password);
        await expectAsync(authenticator.validate(Role.EDUCATOR)).toBeRejectedWith(
            new Error(AuthenticatorError.USER_NOT_EDUCATOR)
        );

        await authenticator.login(educator.email, educator.password);
        await expectAsync(authenticator.validate(Role.ADMINISTRATOR)).toBeRejectedWith(
            new Error(AuthenticatorError.USER_NOT_ADMINISTRATOR)
        );
    });

    it('validate(): fails when no user is logged in', async () => {
        await authenticator.login(administrator.email, administrator.password);
        await authenticator.logout();
        await expectAsync(authenticator.validate(Role.EDUCATOR)).toBeRejectedWith(
            new Error(AuthenticatorError.NOT_AUTHENTICATED)
        );
    });

    it('setPassword(): changes the user\'s password to the string passed in', async () => {
        const new_password: string = 'password';
        await authenticator.login(administrator.email, administrator.password);
        await authenticator.setPassword(new_password);
        await authenticator.logout();
        await expectAsync(authenticator.login(administrator.email, new_password)).toBeResolved();
        await authenticator.setPassword(administrator.password);
    });

    afterAll(async () => {
        await cleanup(http);
    });
/*
    it('(): ', async () => {
        
    });
*/
});