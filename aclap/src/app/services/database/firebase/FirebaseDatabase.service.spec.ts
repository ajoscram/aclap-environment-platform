import { TestBed } from '@angular/core/testing';
import { environment } from '@src/environments/environment';
import { Database, DatabaseError } from "../Database.service";
import { HttpClient } from '@angular/common/http';
import { TEST_MODULE } from './FirebaseDatabase.service.spec.split';
import { DisciplineMetadata, IAdministrator, IDisciplineMetadata, IEducator, IFile, File, IModule, ISection, Module, Section, User, IEvent, Implementable, Event, IEducatorRequest, EducatorRequest, EducatorRequestState, IImplementation, IEvaluation, Score, Implementation, Evaluation } from '../../../models';

describe('FirebaseDatabase', () => {

    const STUB_ID: string = 'id';
    const STUB_INCORRECT_ID: string = 'incorrect';
    
    let database: Database;
    let stubDisciplineMetadata: IDisciplineMetadata;
    let stubEducatorRequest: IEducatorRequest
    let stubAdministrator: IAdministrator;
    let stubEducator: IEducator;
    let stubModule: IModule;
    let stubEvent: IEvent;
    let stubSection: ISection;
    let stubFile: IFile;
    let stubImplementation: IImplementation;
    let stubEvaluation: IEvaluation;

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
        stubEducatorRequest = {
            name: 'STUB_IEDUCATORREQUEST.name',
            lastname: 'STUB_IEDUCATORREQUEST.lastname',
            email: '@email.com',
            phone: '88888888',
            birthday: new Date(),
            organization: 'STUB_IEDUCATORREQUEST.organization',
            address: {
                name: 'STUB_IEDUCATORREQUEST.address.name',
                latitude: 0,
                longitude: 0
            }
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
        stubImplementation = {
            date: new Date(),
            participants: 1,
            location: {
                name: 'stubIImplementation.name',
                latitude: 0,
                longitude: 2
            },
            educatorId: 'stubImplementation.educatorId',
            educatorName: 'stubIImplementation.educatorName',
            educatorLastname: 'stubIImplementation.educatorLastname',
            implementableId: 'stubIImplementation.implementableId',
            implementableName: 'stubIImplementation.implementableName'
        };
        stubEvaluation = {
            activityId: 'STUB_EVALUATION.activityId',
            activityName: 'STUB_EVALUATION.activityName',
            answers: [
                {
                    question: 'ANSWER1.question',
                    option: 'ANSWER1.option',
                    score: Score.LOW
                },
                {
                    question: 'ANSWER2.question',
                    option: 'ANSWER2.option',
                    score: Score.AVERAGE
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
        await expectAsync(database.getUser(STUB_INCORRECT_ID)).toBeRejectedWith(
            new Error(DatabaseError.USER_NOT_FOUND)
        );
    });

    it('addEducatorRequest(): adds a new educator request', async () => {
        stubEducatorRequest.email = 'addEducatorRequest' + stubEducatorRequest.email;
        const request: EducatorRequest = await database.addEducatorRequest(stubEducatorRequest);
        expect(request).toBeTruthy();
    });

    it('addEducatorRequest(): fails if there is an existing PENDING educator request with the same email', async () => {
        stubEducatorRequest.email = 'addEducatorRequestFAIL' + stubEducatorRequest.email;
        await database.addEducatorRequest(stubEducatorRequest);
        await expectAsync(database.addEducatorRequest(stubEducatorRequest)).toBeRejectedWith(
            new Error(DatabaseError.EDUCATOR_REQUEST_ALREADY_PENDING)
        );
    });

    it('getEducatorRequests(): gets all PENDING educator requests in the system', async () => {
        const email: string = stubEducatorRequest.email;
        stubEducatorRequest.email = 'getEducatorRequests1' + email;
        await database.addEducatorRequest(stubEducatorRequest);
        stubEducatorRequest.email = 'getEducatorRequests2' + email;
        await database.addEducatorRequest(stubEducatorRequest);
        const requests: EducatorRequest[] = await database.getEducatorRequests();
        expect(requests.length).toBeGreaterThanOrEqual(2);
        for(let request of requests)
            expect(request.state).toBe(EducatorRequestState.PENDING);
    });

    it('updateEducatorRequestState(): ', async () => {
        const state: EducatorRequestState = EducatorRequestState.APPROVED;
        stubEducatorRequest.email = 'updateEducatorRequestState' + stubEducatorRequest.email;
        const added: EducatorRequest = await database.addEducatorRequest(stubEducatorRequest);
        const updated: EducatorRequest = await database.updateEducatorRequestState(added.id, state);
        expect(updated).toBeTruthy();
        expect(updated.state).toBe(state);
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
        await expectAsync(database.getImplementable(STUB_INCORRECT_ID)).toBeRejectedWith(
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
        stubSection.index = stubSection.index + 1;
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

    it('deleteSection(): fails with an incorrect section id', async () =>{
        const implementable: Implementable = await database.addImplementable(stubModule);
        await expectAsync(database.deleteSection(implementable.id, STUB_INCORRECT_ID)).toBeRejectedWith(
            new Error(DatabaseError.SECTION_NOT_FOUND)
        );
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

    it('getImplementationsByUser(): gets a list of implementables by userID', async () => {
        await database.addImplementation(stubImplementation);
        await database.addImplementation(stubImplementation);
        const completed: boolean = false; //implementations are always initialized to false
        const userId: string = stubImplementation.educatorId;
        const implementations: Implementation[] = await database.getImplementationsByUser(completed, userId);
        expect(implementations.length).toBeGreaterThanOrEqual(2);
    });

    it('getImplementationsByImplementable(): gets a list of implementables by implementableID', async () => {
        await database.addImplementation(stubImplementation);
        await database.addImplementation(stubImplementation);
        const completed: boolean = false; //implementations are always initialized to false
        const implementableId: string = stubImplementation.implementableId;
        const implementations: Implementation[] = await database.getImplementationsByImplementable(completed, implementableId);
        expect(implementations.length).toBeGreaterThanOrEqual(2);
    });

    it('addImplementation(): adds an implementation', async () => {
        const implementation: Implementation = await database.addImplementation(stubImplementation);
        expect(implementation).toBeTruthy();
    });

    it('updateImplementation(): updates an existing implementation', async () => {
        const added: Implementation = await database.addImplementation(stubImplementation);
        const updated: Implementation = await database.updateImplementation(added.id, stubImplementation);
        expect(updated).toBeTruthy();
        expect(updated.id).toBe(added.id);
    });

    it('updateImplementation(): fails when given an incorrect implementation id', async () => {
        await expectAsync(database.updateImplementation(STUB_INCORRECT_ID, stubImplementation)).toBeRejectedWith(
            new Error(DatabaseError.IMPLEMENTATION_NOT_FOUND)
        );
    });

    it('updateImplementation(): fails on completed implementations', async () => {
        const implementation: Implementation = await database.addImplementation(stubImplementation);
        await database.completeImplementation(implementation.id);
        await expectAsync(database.updateImplementation(implementation.id, stubImplementation)).toBeRejectedWith(
            new Error(DatabaseError.IMPLEMENTATION_IS_COMPLETE)
        );
    });

    it('deleteImplementation(): deletes an existing implementation', async () => {
        const added: Implementation = await database.addImplementation(stubImplementation);
        const deleted: Implementation = await database.deleteImplementation(added.id);
        expect(deleted).toBeTruthy();
        expect(deleted.id).toBe(added.id);
        expect(deleted.deleted).toBeTrue();
    });

    it('deleteImplementation(): fails when given an incorrect implementation id', async () => {
        await expectAsync(database.deleteImplementation(STUB_INCORRECT_ID)).toBeRejectedWith(
            new Error(DatabaseError.IMPLEMENTATION_NOT_FOUND)
        );
    });

    it('completeImplementation(): completes an existing implementation', async () => {
        const added: Implementation = await database.addImplementation(stubImplementation);
        const completed: Implementation = await database.completeImplementation(added.id);
        expect(completed).toBeTruthy();
        expect(completed.id).toBe(added.id);
        expect(completed.completed).toBeTrue();
    });

    it('completeImplementation(): fails when given an incorrect implementation id', async () => {
        await expectAsync(database.completeImplementation(STUB_INCORRECT_ID)).toBeRejectedWith(
            new Error(DatabaseError.IMPLEMENTATION_NOT_FOUND)
        );
    });

    it('getEvaluations(): gets a list of an implementation\'s evaluations', async () => {
        const implementation: Implementation = await database.addImplementation(stubImplementation);
        await database.addEvaluation(implementation.id, stubEvaluation);
        await database.addEvaluation(implementation.id, stubEvaluation);
        const evaluations: Evaluation[] = await database.getEvaluations(implementation.id);
        expect(evaluations).toBeTruthy();
        expect(evaluations.length).toBe(2);
    });

    it('addEvaluation(): adds an evaluation and returns it', async () => {
        const implementation: Implementation = await database.addImplementation(stubImplementation);
        const evaluation: Evaluation = await database.addEvaluation(implementation.id, stubEvaluation);
        expect(evaluation).toBeTruthy();
    });

    it('updateEvaluation(): updates an evaluation and returns it', async () => {
        const implementation: Implementation = await database.addImplementation(stubImplementation);
        const added: Evaluation = await database.addEvaluation(implementation.id, stubEvaluation);
        const updated: Evaluation = await database.updateEvaluation(implementation.id, added.id, stubEvaluation);
        expect(updated).toBeTruthy();
        expect(updated.id).toBe(added.id);
    });

    it('deleteEvaluation(): deletes an evaluation and returns it', async () => {
        const implementation: Implementation = await database.addImplementation(stubImplementation);
        const added: Evaluation = await database.addEvaluation(implementation.id, stubEvaluation);
        const deleted: Evaluation = await database.deleteEvaluation(implementation.id, added.id);
        expect(deleted).toBeTruthy();
        expect(deleted.id).toBe(added.id);
    });

    it('deleteEvaluation(): fails when given an incorrect evaluation id', async () => {
        const implementation: Implementation = await database.addImplementation(stubImplementation);
        await expectAsync(database.deleteEvaluation(implementation.id, STUB_INCORRECT_ID)).toBeRejectedWith(
            new Error(DatabaseError.EVALUATION_NOT_FOUND)
        );
    });

    it('getEvidence(): gets a list of an implementation\'s evidence files', async () => {
        const implementation: Implementation = await database.addImplementation(stubImplementation);
        await database.addEvidence(implementation.id, stubFile);
        await database.addEvidence(implementation.id, stubFile);
        const evidence: File[] = await database.getEvidence(implementation.id);
        expect(evidence).toBeTruthy();
        expect(evidence.length).toBe(2);
    });

    it('addEvidence(): adds an evidence file and returns it', async () => {
        const implementation: Implementation = await database.addImplementation(stubImplementation);
        const evidence: File = await database.addEvidence(implementation.id, stubFile);
        expect(evidence).toBeTruthy();
    });

    it('deleteEvidence(): deletes an evidence file and returns it', async () => {
        const implementation: Implementation = await database.addImplementation(stubImplementation);
        const added: File = await database.addEvidence(implementation.id, stubFile);
        const deleted: File = await database.deleteEvidence(implementation.id, added.id);
        expect(deleted).toBeTruthy();
        expect(deleted.id).toBe(added.id);
    });

    it('deleteEvidence(): fails when given an incorrect evidence file id', async () => {
        const implementation: Implementation = await database.addImplementation(stubImplementation);
        await expectAsync(database.deleteEvidence(implementation.id, STUB_INCORRECT_ID)).toBeRejectedWith(
            new Error(DatabaseError.EVIDENCE_NOT_FOUND)
        );
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