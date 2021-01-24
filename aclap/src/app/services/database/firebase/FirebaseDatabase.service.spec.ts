import { TestBed } from '@angular/core/testing';
import { Database, DatabaseError } from "../Database.service";
import { HttpClient } from '@angular/common/http';
import { cleanup, TEST_MODULE } from './FirebaseDatabase.service.spec.split';
import { DisciplineMetadata, IAdministrator, IDisciplineMetadata, IEducator, IFile, File, IModule, ISection, Module, Section, User, IEvent, Implementable, Event, IEducatorRequest, EducatorRequest, EducatorRequestState, IImplementation, Score, Implementation, IAnswer, IQuestion, Question, Answer, IAlly, Ally } from '../../../models';

describe('FirebaseDatabase', () => {

    const STUB_ID: string = 'id';
    const STUB_INCORRECT_ID: string = 'incorrect';
    const STUB_OPTIONS: Map<Score, string> = new Map();
    STUB_OPTIONS.set(Score.VERY_LOW, 'STUB_OPTIONS.VERY_LOW');
    STUB_OPTIONS.set(Score.LOW, 'STUB_OPTIONS.LOW');
    STUB_OPTIONS.set(Score.AVERAGE, 'STUB_OPTIONS.AVERAGE');
    STUB_OPTIONS.set(Score.HIGH, 'STUB_OPTIONS.HIGH');
    STUB_OPTIONS.set(Score.VERY_HIGH, 'STUB_OPTIONS.VERY_HIGH');
    
    let database: Database;
    let stubDisciplineMetadata: IDisciplineMetadata;
    let stubEducatorRequest: IEducatorRequest
    let stubAdministrator: IAdministrator;
    let stubEducator: IEducator;
    let stubModule: IModule;
    let stubEvent: IEvent;
    let stubSection: ISection;
    let stubFile: IFile;
    let stubQuestion: IQuestion;
    let stubImplementation: IImplementation;
    let stubAnswer: IAnswer;
    let stubAlly: IAlly;

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
            imageUrl: 'STUB_EDUCATOR.imageUrl',
            name: 'STUB_EDUCATOR.name',
            lastname: 'STUB_EDUCATOR.lastname',
            email: 'STUB_EDUCATOR.email',
            phone: 'STUB_EDUCATOR.phone',
            birthday: new Date(),
            organization: 'STUB_EDUCATOR.organization',
            address: {
                name: 'STUB_EDUCATOR.address.name',
                latitude: 0,
                longitude: 0
            },
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
            recommendedAge: '1',
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
        stubQuestion = {
            question: "is this a question?",
            options: STUB_OPTIONS
        };
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
        stubAnswer  = {
            questionId: 'ANSWER.questionId',
            question: 'ANSWER.question',
            option: 'ANSWER.option',
            score: Score.LOW
        };
        stubAlly = {
            name: 'STUB_ALLY.name',
            description: 'STUB_ALLY.description',
            imageUrl: 'https://example.com/image.jpg',
            link: 'https://example.com',
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
        stubEducatorRequest.email = 'addEducatorRequestFAIL_PENDING' + stubEducatorRequest.email;
        await database.addEducatorRequest(stubEducatorRequest);
        await expectAsync(database.addEducatorRequest(stubEducatorRequest)).toBeRejectedWith(
            new Error(DatabaseError.EDUCATOR_REQUEST_ALREADY_PENDING)
        );
    });

    it('addEducatorRequest(): fails if there is an existing user with the same email', async () => {
        const user: User = await database.addUser(STUB_ID, stubAdministrator);
        stubEducatorRequest.email = user.email;
        await expectAsync(database.addEducatorRequest(stubEducatorRequest)).toBeRejectedWith(
            new Error(DatabaseError.USER_ALREADY_EXISTS)
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

    it('updateEducatorRequestState(): updates the state of an existing educator request', async () => {
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
        const file: File = await database.addFile(implementable.id, stubFile);
        expect(file).toBeTruthy();
    });

    it('getFiles(): gets a implementable\'s files', async () => {
        const implementable: Implementable = await database.addImplementable(stubModule);
        await database.addFile(implementable.id, stubFile);
        await database.addFile(implementable.id, stubFile);
        const files: File[] = await database.getFiles(implementable.id);
        expect(files).toBeTruthy();
        expect(files.length).toBe(2);
    });

    it('deleteFile(): deletes a file and returns it', async () =>{
        const implementable: Implementable = await database.addImplementable(stubModule);
        const added: File = await database.addFile(implementable.id, stubFile);
        const deleted: File = await database.deleteFile(implementable.id, added.id);
        expect(deleted).toBeTruthy();
        expect(deleted.id).toBe(added.id);
    });

    it('getQuestions(): gets a list of an implementable\'s questions', async () => {
        const implementable: Implementable = await database.addImplementable(stubModule);
        await database.addQuestion(implementable.id, stubQuestion);
        await database.addQuestion(implementable.id, stubQuestion);
        const questions: Question[] = await database.getQuestions(implementable.id);
        expect(questions).toBeTruthy();
        expect(questions.length).toBe(2);
    });

    it('addQuestion(): adds a question and returns it', async () => {
        const implementable: Implementable = await database.addImplementable(stubModule);
        const question: Question = await database.addQuestion(implementable.id, stubQuestion);
        expect(question).toBeTruthy();
    });

    it('updateQuestion(): updates a question and returns it', async () => {
        const implementable: Implementable = await database.addImplementable(stubModule);
        const added: Question = await database.addQuestion(implementable.id, stubQuestion);
        const updated: Question = await database.updateQuestion(implementable.id, added.id, stubQuestion);
        expect(updated).toBeTruthy();
        expect(updated.id).toBe(added.id);
    });

    it('deleteQuestion(): deletes a question and returns it', async () => {
        const implementable: Implementable = await database.addImplementable(stubModule);
        const added: Question = await database.addQuestion(implementable.id, stubQuestion);
        const deleted: Question = await database.deleteQuestion(implementable.id, added.id);
        expect(deleted).toBeTruthy();
        expect(deleted.id).toBe(added.id);
    });

    it('deleteQuestion(): fails when given an incorrect question id', async () => {
        const implementable: Implementable = await database.addImplementable(stubModule);
        await expectAsync(database.deleteQuestion(implementable.id, STUB_INCORRECT_ID)).toBeRejectedWith(
            new Error(DatabaseError.QUESTION_NOT_FOUND)
        );
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

    it('getImplementation(): gets an existing implementation given it\'s id', async () => {
        const added: Implementation = await database.addImplementation(stubImplementation);
        const gotten: Implementation = await database.getImplementation(added.id);
        expect(gotten).toBeTruthy();
        expect(gotten.id).toBe(added.id);
    });

    it('getImplementation(): fails when given an incorrect implementation id', async () => {
        await expectAsync(database.getImplementation(STUB_INCORRECT_ID)).toBeRejectedWith(
            new Error(DatabaseError.IMPLEMENTATION_NOT_FOUND)
        );
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

    it('getAnswers(): gets a list of an implementation\'s answers', async () => {
        const implementation: Implementation = await database.addImplementation(stubImplementation);
        await database.addAnswer(implementation.id, STUB_ID, stubAnswer);
        await database.addAnswer(implementation.id, STUB_ID, stubAnswer);
        const answers: Answer[] = await database.getAnswers(implementation.id);
        expect(answers).toBeTruthy();
        expect(answers.length).toBe(2);
    });

    it('addAnswers(): adds an answer and returns it', async () => {
        const implementation: Implementation = await database.addImplementation(stubImplementation);
        const answer: Answer = await database.addAnswer(implementation.id, STUB_ID, stubAnswer);
        expect(answer).toBeTruthy();
    });

    it('updateAnswer(): updates an answer and returns it', async () => {
        const implementation: Implementation = await database.addImplementation(stubImplementation);
        const added: Answer = await database.addAnswer(implementation.id, STUB_ID ,stubAnswer);
        const updated: Answer = await database.updateAnswer(implementation.id, added.id, stubAnswer);
        expect(updated).toBeTruthy();
        expect(updated.id).toBe(added.id);
    });

    it('deleteAnswer(): deletes an answer and returns it', async () => {
        const implementation: Implementation = await database.addImplementation(stubImplementation);
        const added: Answer = await database.addAnswer(implementation.id, STUB_ID, stubAnswer);
        const deleted: Answer = await database.deleteAnswer(implementation.id, added.id);
        expect(deleted).toBeTruthy();
        expect(deleted.id).toBe(added.id);
    });

    it('deleteAnswer(): fails when given an incorrect answer id', async () => {
        const implementation: Implementation = await database.addImplementation(stubImplementation);
        await expectAsync(database.deleteAnswer(implementation.id, STUB_INCORRECT_ID)).toBeRejectedWith(
            new Error(DatabaseError.ANSWER_NOT_FOUND)
        );
    });

    it('getEvidence(): gets a list of an implementation\'s evidence files', async () => {
        const implementation: Implementation = await database.addImplementation(stubImplementation);
        await database.addEvidence(implementation.id, STUB_ID, stubFile);
        await database.addEvidence(implementation.id, STUB_ID, stubFile);
        const evidence: File[] = await database.getEvidence(implementation.id);
        expect(evidence).toBeTruthy();
        expect(evidence.length).toBe(2);
    });

    it('addEvidence(): adds an evidence file and returns it', async () => {
        const implementation: Implementation = await database.addImplementation(stubImplementation);
        const evidence: File = await database.addEvidence(implementation.id, STUB_ID, stubFile);
        expect(evidence).toBeTruthy();
    });

    it('deleteEvidence(): deletes an evidence file and returns it', async () => {
        const implementation: Implementation = await database.addImplementation(stubImplementation);
        const added: File = await database.addEvidence(implementation.id, STUB_ID, stubFile);
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

    it('getAllies(): returns the list of existing allies', async () => {
        await database.addAlly(stubAlly);
        await database.addAlly(stubAlly);
        const allies: Ally[] = await database.getAllies();
        expect(allies).toBeTruthy();
        expect(allies.length).toBeGreaterThanOrEqual(2);
    });

    it('addAlly(): adds a new ally and returns it', async () => {
        const ally: Ally = await database.addAlly(stubAlly);
        expect(ally).toBeTruthy();
    });

    it('deleteAlly(): deletes an ally and returns it', async () => {
        const added: Ally = await database.addAlly(stubAlly);
        const deleted: Ally = await database.deleteAlly(added.id);
        expect(deleted).toBeTruthy();
        expect(deleted.id).toBe(added.id);
    });

    it('deleteAlly(): fails when given an incorrect ally id', async () => {
        await expectAsync(database.deleteAlly(STUB_INCORRECT_ID)).toBeRejectedWith(
            new Error(DatabaseError.ALLY_NOT_FOUND)
        );
    });

    afterAll(async () => {
        const http: HttpClient = TestBed.inject(HttpClient);
        await cleanup(http);
    });

/*
    it('(): ', async () => {
        
    });
*/
});