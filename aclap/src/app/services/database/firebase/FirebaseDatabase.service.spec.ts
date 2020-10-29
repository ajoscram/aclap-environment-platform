import { TestBed } from '@angular/core/testing';
import { environment } from '@src/environments/environment';
import { Database, DatabaseError } from "../Database.service";
import { DisciplineMetadata, IAdministrator, IDisciplineMetadata, IEducator, IModule, Module, User } from '../../../models';
import { HttpClient } from '@angular/common/http';
import { testModule } from './FirebaseDatabase.service.spec.split';

describe('FirebaseDatabase', () => {

    const STUB_ID: string = 'id';
    const STUB_INCORECT_ID: string = 'incorrect';
    
    let database: Database;
    let stubDisciplineMetadata: IDisciplineMetadata;
    let stubAdministrator: IAdministrator;
    let stubEducator: IEducator;
    let stubModule: IModule;

    beforeEach(() => {
        TestBed.configureTestingModule(testModule);
        database = TestBed.inject(Database);
        stubDisciplineMetadata = {
            subjects: [
                { name: 'subject1', color: 'color1'},
                { name: 'subject2', color: 'color2'},
                { name: 'subject3', color: 'color3'}
            ],
            years: ['1', '2', '3']
        };
        stubAdministrator  = {
            $imageUrl: 'STUB_ADMINISTRATOR.$imageUrl',
            name: 'STUB_ADMINISTRATOR.name',
            lastname: 'STUB_ADMINISTRATOR.lastname',
            email: 'STUB_ADMINISTRATOR.email'
        };
        stubEducator = {
            $imageUrl: 'STUB_EDUCATOR.$imageUrl',
            name: 'STUB_EDUCATOR.name',
            lastname: 'STUB_EDUCATOR.lastname',
            email: 'STUB_EDUCATOR.email',
            phone: 'phone',
            joined: new Date()
        };
        stubModule = {
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

    it('getDisciplineMetadata(): gets the discipline metadata constants', async () => {
        await database.setDisciplineMetadata(stubDisciplineMetadata);
        const metadata: DisciplineMetadata = await database.getDisciplineMetadata();
        expect(metadata).toBeTruthy();
    });

    it('setDisciplineMetadata(): sets the discipline metadata constants and returns them', async () => {
        const metadata: DisciplineMetadata = await database.setDisciplineMetadata(stubDisciplineMetadata);
        expect(metadata).toBeTruthy();
    });

    it('addUser(): adds a new user and returns it', async () => {
        const user: User = await database.addUser(STUB_ID, stubAdministrator);
        expect(user).toBeTruthy();
    });

    it('getUser(): gets an existing user given their id', async () => {
        const added: User = await database.addUser(STUB_ID, stubAdministrator);
        const gotten: User = await database.getUser(added.id);
        expect(gotten).toBeTruthy();
        expect(gotten.id).toBe(added.id);
    });

    it('getUser(): fails when given an incorrect user id', async () => {
        await expectAsync(database.getUser(STUB_INCORECT_ID)).toBeRejectedWith(
            new Error(DatabaseError.USER_NOT_FOUND)
        );
    });

    it('addModule(): adds a new module and returns it', async () => {
        const module: Module = await database.addModule(stubModule);
        expect(module).toBeTruthy();
    });

    it('getModule(): gets an existing module given it\'s id', async () => {
        const added: Module = await database.addModule(stubModule);
        const gotten: Module = await database.getModule(added.id);
        expect(gotten).toBeTruthy();
        expect(gotten.id).toBe(added.id);
    });

    it('getModule(): fails when given an incorrect module id', async () => {
        await expectAsync(database.getModule(STUB_INCORECT_ID)).toBeRejectedWith(
            new Error(DatabaseError.MODULE_NOT_FOUND)
        );
    });

    it('getModules(): gets the list of all available modules', async () => {
        await database.addModule(stubModule);
        const modules: Module[] = await database.getModules();
        expect(modules).toBeTruthy();
        expect(modules.length).toBeGreaterThanOrEqual(1);
    });

    it('updateModule(): updates a module and returns the result', async () =>{
        const added: Module = await database.addModule(stubModule);
        stubModule.name = 'new name';
        const updated: Module = await database.updateModule(added.id, stubModule);
        expect(updated).toBeTruthy();
        expect(updated.id).toBe(added.id);
        expect(updated.name).toBe(stubModule.name);
    });

    it('deleteModule(): deletes a module and returns it', async () =>{
        const added: Module = await database.addModule(stubModule);
        const deleted: Module = await database.deleteModule(added.id);
        expect(deleted).toBeTruthy();
        expect(deleted.id).toBe(added.id);
    });

    afterAll(async () => {
        const http: HttpClient = TestBed.inject(HttpClient);
        await http.delete(`http://localhost:8080/emulator/v1/projects/${environment.firebaseConfig.projectId}/databases/(default)/documents`).toPromise();
    });
});