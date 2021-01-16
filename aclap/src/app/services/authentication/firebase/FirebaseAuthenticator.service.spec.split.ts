import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule, USE_EMULATOR } from '@angular/fire/auth';
import { environment } from '@src/environments/environment';
import { Authenticator } from '../Authenticator.service';
import { FirebaseAuthenticator } from './FirebaseAuthenticator.service';

export const TEST_MODULE = {
    imports:[
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule
    ],
    providers: [
        { provide: Authenticator, useClass: FirebaseAuthenticator },
        { provide: USE_EMULATOR, useValue: [ 
            environment.emulator.address,
            environment.emulator.ports.AUTH
        ] }
    ]
}