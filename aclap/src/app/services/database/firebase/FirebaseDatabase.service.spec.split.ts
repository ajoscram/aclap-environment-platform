import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, SETTINGS } from '@angular/fire/firestore';
import { environment } from '@src/environments/environment';
import { Database } from '../Database.service';
import { Factory } from '../factory/Factory.service';
import { FirebaseDatabase } from './FirebaseDatabase.service';
import { Validator } from '../validation/Validator.service';

export const testModule = {
    imports:[
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        HttpClientModule
    ],
    providers: [
        Factory,
        Validator,
        { provide: Database, useClass: FirebaseDatabase },
        { provide: SETTINGS, useValue: { host: 'localhost:8080', ssl: false } }
    ]
}