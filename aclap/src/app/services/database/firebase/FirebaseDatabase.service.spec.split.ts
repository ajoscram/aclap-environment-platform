import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, USE_EMULATOR } from '@angular/fire/firestore';
import { environment } from '@src/environments/environment';
import { Database } from '../Database.service';
import { Factory } from '../factory/Factory.service';
import { FirebaseDatabase } from './FirebaseDatabase.service';
import { Validator } from '../validation/Validator.service';

export const TEST_MODULE = {
    imports:[
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        HttpClientModule
    ],
    providers: [
        Factory,
        Validator,
        { provide: Database, useClass: FirebaseDatabase },
        { provide: USE_EMULATOR, useValue: [ 
            environment.testing.address,
            environment.testing.ports.FIRESTORE 
        ] }
    ]
}

export async function cleanup(http: HttpClient){
    await http.delete(`http://${environment.testing.address}:${environment.testing.ports.FIRESTORE}/emulator/v1/projects/${environment.firebaseConfig.projectId}/databases/(default)/documents`).toPromise();
}