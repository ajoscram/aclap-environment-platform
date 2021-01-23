import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule, USE_EMULATOR } from '@angular/fire/auth';
import { environment } from '@src/environments/environment';
import { Authenticator } from '../Authenticator.service';
import { FirebaseAuthenticator } from './FirebaseAuthenticator.service';

export const TEST_MODULE = {
    imports:[
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        HttpClientModule
    ],
    providers: [
        { provide: Authenticator, useClass: FirebaseAuthenticator },
        { provide: USE_EMULATOR, useValue: [ 
            environment.testing.address,
            environment.testing.ports.AUTH
        ] }
    ]
}

export async function setup(http: HttpClient): Promise<void>{
    try{
        await http.get(`http://${environment.testing.address}:${environment.testing.ports.FUNCTIONS}/${environment.firebaseConfig.projectId}/us-central1/setupAuthDebug`).toPromise();
    } catch(error){ }
}

export async function cleanup(http: HttpClient): Promise<void>{
    await http.delete(`http://${environment.testing.address}:${environment.testing.ports.AUTH}/emulator/v1/projects/${environment.firebaseConfig.projectId}/accounts`).toPromise();
}