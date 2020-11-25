import { TestBed } from '@angular/core/testing';
import { environment } from '@src/environments/environment';
import { Database, DatabaseError } from "../Database.service";
import { HttpClient } from '@angular/common/http';
import { TEST_MODULE } from './FirebaseDatabase.service.spec.split';
import { DisciplineMetadata, IAdministrator, IDisciplineMetadata, IEducator, IFile, File, IModule, ISection, Module, Section, User, IEvent, Implementable, Event } from '../../../models';

xdescribe('FirebaseDatabase', () => {

    const STUB_ID: string = 'id';
    const STUB_INCORECT_ID: string = 'incorrect';
    
    let database: Database;
    let stubDisciplineMetadata: IDisciplineMetadata;
    let stubAdministrator: IAdministrator;
    let stubEducator: IEducator;
    let stubModule: IModule;
    let stubEvent: IEvent;
    let stubSection: ISection;
    let stubFile: IFile;

    beforeEach(() => {
        TestBed.configureTestingModule(TEST_MODULE);
        database = TestBed.inject(Database);
        stubDisciplineMetadata = {
            subjects: [
                { name: 'subject1', color: '#FFFFFF'},
                { name: 'subject2', color: '#FFFFFF'},
                { name: 'subject3', color: '#FFFFFF'}
            ],
            years: ['1', '2', '3']
        };
        stubAdministrator  = {
            imageUrl: 'https://example.com/image.jpg',
            name: 'STUB_ADMINISTRATOR.name',
            lastname: 'STUB_ADMINISTRATOR.lastname',
            email: 'example@email.com'
        };
        stubEducator = {
            imageUrl: 'https://example.com/image.jpg',
            name: 'STUB_EDUCATOR.name',
            lastname: 'STUB_EDUCATOR.lastname',
            email: 'example@email.com',
            phone: '+(506)12345678',
            joined: new Date()
        };
        stubModule = {
            name: 'name',
            color: '#EF6423',
            imageUrl: 'https://example.com/image.jpg',
            bannerImageUrl: 'https://example.com/image.jpg',
            publisherId: 'publisherId',
            publisherName: 'publisherName',
            publisherLastname: 'publisherLastname',
            recommendedAge: 1,
            objective: 'objective',
            antecedents: 'antecedents',
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
        stubEvent = {
            name: 'name',
            color: '#EF6423',
            imageUrl: 'https://example.com/image.jpg',
            bannerImageUrl: 'https://example.com/image.jpg',
            publisherId: 'publisherId',
            publisherName: 'publisherName',
            publisherLastname: 'publisherLastname',
            objective: 'objective',
            date: new Date()
        };
        stubSection = {
            index: 0,
            text: "STUB_SECTION.text" //a paragraph section is used here as an example
        } as ISection;
        stubFile = {
            url: 'https://example.com/image.jpg',
            name: 'name',
            uploaded: new Date(),
            bytes: 1
        }
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

    it('addEducatorRequest(): ', async () => {
        
    });

    it('getEducatorRequests(): ', async () => {
        
    });

    it('updateEducatorRequestState(): ', async () => {
        
    });

    it('addImplementable(): adds a new implementable and returns it', async () => {
        const implementable: Implementable = await database.addImplementable(stubModule);
        expect(implementable).toBeTruthy();
    });

    it('getImplementable(): gets an existing implementable given it\'s id', async () => {
        const added: Implementable = await database.addImplementable(stubModule);
        const gotten: Implementable = await database.getImplementable(added.id);
        expect(gotten).toBeTruthy();
        expect(gotten.id).toBe(added.id);
    });

    it('getImplementable(): fails when given an incorrect implementable id', async () => {
        await expectAsync(database.getImplementable(STUB_INCORECT_ID)).toBeRejectedWith(
            new Error(DatabaseError.IMPLEMENTABLE_NOT_FOUND)
        );
    });

    it('getModules(): gets the list of all available modules', async () => {
        await database.addImplementable(stubModule);
        const modules: Module[] = await database.getModules();
        expect(modules).toBeTruthy();
        expect(modules.length).toBeGreaterThanOrEqual(1);
    });

    it('getEvents(): gets the list of all available events', async () => {
        await database.addImplementable(stubEvent);
        const events: Event[] = await database.getEvents();
        expect(events).toBeTruthy();
        expect(events.length).toBeGreaterThanOrEqual(1);
    });

    it('updateImplementable(): updates an implementable and returns the result', async () =>{
        const added: Implementable = await database.addImplementable(stubModule);
        stubModule.name = 'new name';
        const updated: Implementable = await database.updateImplementable(added.id, stubModule);
        expect(updated).toBeTruthy();
        expect(updated.id).toBe(added.id);
        expect(updated.name).toBe(stubModule.name);
    });

    it('deleteImplementable(): deletes an implementable and returns it', async () =>{
        const added: Implementable = await database.addImplementable(stubModule);
        const deleted: Implementable = await database.deleteImplementable(added.id);
        expect(deleted).toBeTruthy();
        expect(deleted.id).toBe(added.id);
    });

    it('addSection(): adds a new section and returns it', async () => {
        const implementable: Implementable = await database.addImplementable(stubModule);
        const section: Section = await database.addSection(implementable.id, stubSection);
        expect(section).toBeTruthy();
    });

    it('getSections(): gets an implementable\'s sections ordered by index', async () => {
        const implementable: Implementable = await database.addImplementable(stubEvent);
        stubSection.index = 1;
        await database.addSection(implementable.id, stubSection);
        stubSection.index = 2;
        await database.addSection(implementable.id, stubSection);
        const sections: Section[] = await database.getSections(implementable.id);
        expect(sections).toBeTruthy();
        expect(sections.length).toBe(2);
        
        let lastIndex: number = 0;
        for(let section of sections){
            expect(section.index).toBeGreaterThanOrEqual(lastIndex);
            lastIndex = section.index;
        }
    });

    it('updateSection(): updates a section and returns the result', async () =>{
        const implementable: Implementable = await database.addImplementable(stubEvent);
        const added: Section = await database.addSection(implementable.id, stubSection);
        stubSection.index = stubSection.index - 1;
        const updated: Section = await database.updateSection(implementable.id, added.id, stubSection);
        expect(updated).toBeTruthy();
        expect(updated.id).toBe(added.id);
        expect(updated.index).toBe(stubSection.index);
    });

    it('deleteSection(): deletes a section and returns it', async () =>{
        const implementable: Implementable = await database.addImplementable(stubModule);
        const added: Section = await database.addSection(implementable.id, stubSection);
        const deleted: Section = await database.deleteSection(implementable.id, added.id);
        expect(deleted).toBeTruthy();
        expect(deleted.id).toBe(added.id);
    });

    it('addFile(): adds a new file and returns it', async () => {
        const implementable: Implementable = await database.addImplementable(stubEvent);
        const section: Section = await database.addSection(implementable.id, stubSection);
        const file: File = await database.addFile(implementable.id, section.id, stubFile);
        expect(file).toBeTruthy();
    });

    it('getFiles(): gets a section\'s files', async () => {
        const implementable: Implementable = await database.addImplementable(stubModule);
        const section: Section = await database.addSection(implementable.id, stubSection);
        await database.addFile(implementable.id, section.id, stubFile);
        await database.addFile(implementable.id, section.id, stubFile);
        const files: File[] = await database.getFiles(implementable.id, section.id);
        expect(files).toBeTruthy();
        expect(files.length).toBe(2);
    });

    it('deleteFile(): deletes a file and returns it', async () =>{
        const implementable: Implementable = await database.addImplementable(stubModule);
        const section: Section = await database.addSection(implementable.id, stubSection);
        const added: File = await database.addFile(implementable.id, section.id, stubFile);
        const deleted: File = await database.deleteFile(implementable.id, section.id, added.id);
        expect(deleted).toBeTruthy();
        expect(deleted.id).toBe(added.id);
    });

    it('getImplementationsByUser(): ', async () => {
        
    });

    it('getImplementationsByImplementable(): ', async () => {
        
    });

    it('addImplementation(): ', async () => {
        
    });

    it('updateImplementation(): ', async () => {
        
    });

    it('deleteImplementation(): ', async () => {
        
    });

    it('completeImplementation(): ', async () => {
        
    });

    it('getEvaluations(): ', async () => {
        
    });

    it('addEvaluation(): ', async () => {
        
    });

    it('updateEvaluation(): ', async () => {
        
    });

    it('getEvaluation(): ', async () => {
        
    });

    it('deleteEvaluation(): ', async () => {
        
    });

    it('getEvidence(): ', async () => {
        
    });

    it('addEvidence(): ', async () => {
        
    });

    it('deleteEvidence(): ', async () => {
        
    });

    afterAll(async () => {
        const http: HttpClient = TestBed.inject(HttpClient);
        await http.delete(`http://localhost:8080/emulator/v1/projects/${environment.firebaseConfig.projectId}/databases/(default)/documents`).toPromise();
    });

/*
    it('(): ', async () => {
        
    });
*/
});