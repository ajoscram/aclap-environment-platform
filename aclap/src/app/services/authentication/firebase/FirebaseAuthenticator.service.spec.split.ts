import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '@src/environments/environment';
import { Authenticator } from '../Authenticator.service';
import { FirebaseAuthenticator } from './FirebaseAuthenticator.service';

export const TEST_MODULE = {
    imports:[
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule
    ],
    providers: [
        { provide: Authenticator, useClass: FirebaseAuthenticator }
    ]
}