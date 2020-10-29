import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore, AngularFirestoreModule, SETTINGS } from '@angular/fire/firestore';
import { environment } from '@src/environments/environment';
import { Database, DatabaseError } from "./Database.service";
import { FirebaseDatabase } from './FirebaseDatabase.service';
import { Factory } from './factory/Factory.service';
import { Validator } from './validation/Validator.service';
import { IModule, Module } from '../../models';

describe('FirebaseDatabase', () => {

    let stubIModule: IModule;
    let database: Database;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports:[
                AngularFireModule.initializeApp(environment.firebaseConfig),
                AngularFirestoreModule,
            ],
            providers: [
                Factory,
                Validator,
                { provide: Database, useClass: FirebaseDatabase },
                { provide: SETTINGS, useValue: { host: 'localhost:8080', ssl: false}}
            ]
        });
        database = TestBed.inject(Database);
        stubIModule = {
            name: 'name',
            $imageUrl: 'https://ecosistemas.ovacen.com/wp-content/uploads/2018/02/ecosistema-manglar.jpg',
            publisherId: 'publisherId',
            publisherName: 'publisherName',
            publisherLastname: 'publisherLastname',
            recommendedAge: 4,
            objectives: [ 'first objective', 'second objecive' ],
            requirements: [ 'first requirement', 'second requirement' ],
            disciplines: [ 
                {
                    subject: {
                        name: 'Estudios Sociales',
                        color: '#585FC2'
                    },
                    year: '1er Año',
                    theme: 'Eje temático'
                }
            ]
        };
    });

    it('addModule(): adds a new module and returns it', async () => {
        const module: Module = await database.addModule(stubIModule);
        expect(module).toBeTruthy();
    });

    it('getModule(): gets an exsiting module given its\' id', async () => {
        const added: Module = await database.addModule(stubIModule);
        const gotten: Module = await database.getModule(added.id);
        expect(gotten).toBeTruthy();
    });

});