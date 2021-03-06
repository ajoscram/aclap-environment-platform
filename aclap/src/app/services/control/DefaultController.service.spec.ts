import { TestBed } from '@angular/core/testing';
import ControlModule from '@src/app/modules/control/control.module';
import { Role } from '../authentication/Session.model';
import { Authenticator } from '../authentication/Authenticator.service';
import { MockAuthenticator } from '../authentication/mock/MockAuthenticator.service';
import { Database } from '../database/Database.service';
import { MockDatabase } from '../database/MockDatabase.service';
import { Storage } from '../storage/Storage.service';
import { MockStorage } from '../storage/MockStorage.service';
import { Controller } from "./Controller.service";
import { DefaultController } from './DefaultController.service';
import { DisciplineMetadata, IModule, IParagraphSection, Module, Section, ISection, File, Implementable, Event, IEducatorRequest, User, EducatorRequest, EducatorRequestState, IImplementation, Implementation, Score, IAnswer, IQuestion, Question, Answer, IAlly, Ally } from '../../models';
import { Factory } from '../database/factory/Factory.service';
import { Session } from '../authentication/Session.model';

describe('DefaultController', () => {

    const STUB_IEDUCATORREQUEST: IEducatorRequest = {
        name: 'STUB_IEDUCATORREQUEST.name',
        lastname: 'STUB_IEDUCATORREQUEST.lastname',
        email: 'STUB_IEDUCATORREQUEST.email',
        phone: 'STUB_IEDUCATORREQUEST.phone',
        birthday: new Date(),
        organization: 'STUB_IEDUCATORREQUEST.organization',
        address: {
            name: 'STUB_IEDUCATORREQUEST.address.name',
            latitude: 0,
            longitude: 0
        }
    };
    const STUB_IMODULE: IModule = {
        name: 'name',
        color: '#EF6423',
        imageUrl: 'imageUrl',
        bannerImageUrl: 'bannerImageUrl',
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
    const STUB_IQUESTION: IQuestion = {
        question: "is this a question?",
        options: new Map()
    };
    const STUB_IIMPLEMENTATION: IImplementation = {
        date: new Date(),
        maleParticipants: 1,
        femaleParticipants: 1,
        otherParticipants: 1,
        location: {
            name: 'stubIImplementation.name',
            latitude: 0,
            longitude: 2
        },
        educatorId: '0', //this must be '0' to match MockAuthenticator's session.user_id
        educatorName: 'stubIImplementation.educatorName',
        educatorLastname: 'stubIImplementation.educatorLastname',
        implementableId: 'stubIImplementation.implementableId',
        implementableName: 'stubIImplementation.implementableName'
    };
    const STUB_ISECTION: IParagraphSection = {
        index: 0,
        text: 'text'
    };
    const STUB_IANSWER: IAnswer = {
        questionId: 'ANSWER.questionId',
        question: 'ANSWER.question',
        option: 'ANSWER.option',
        score: Score.LOW
    };

    const STUB_IALLY: IAlly = {
        name: 'STUB_ALLY.name',
        imageUrl: 'STUB_ALLY.imageUrl',
        link: 'STUB_ALLY.link'
    }

    //This represents a file, because MockStorage actually ignores it altogether.
    const STUB_IFILE: any = {};
    
    let controller: Controller;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [ ControlModule ],
            providers: [
                { provide: Authenticator, useClass: MockAuthenticator },
                { provide: Database, useClass: MockDatabase },
                { provide: Storage, useClass: MockStorage },
                { provide: Controller, useClass: DefaultController },
                Factory
            ] 
        });
        controller = TestBed.inject(Controller);
        await controller.login(MockAuthenticator.ADMIN_USERNAME, MockAuthenticator.PASSWORD);
    });


    it('login(): logs in a user with correct credentials', async () => {
        //an administrator user is logged in on the before each, so they must be logged out
        await controller.logout();
        await expectAsync(
            controller.login(MockAuthenticator.ADMIN_USERNAME, MockAuthenticator.PASSWORD)
        ).toBeResolved();
    });

    it('logout(): logs out an already logged in user', async () => {
        //an administrator user is logged in on the before each
        await expectAsync(controller.logout()).toBeResolved();
    });

    it('getUser(): returns the current session\'s user', async () => {
        //an administrator user is logged in on the before each
        const user: User = await controller.getUser();
        expect(user).toBeTruthy();
    });

    it('getSession(): returns the current session', async () => {
        //an administrator user is logged in on the before each
        const session: Session = await controller.getSession();
        expect(session).toBeTruthy();
    });

    it('setPassword(): changes the current user\'s password', async () => {
        //an administrator user is logged in on the before each
        const OLD_PASSWORD: string = MockAuthenticator.PASSWORD;
        const NEW_PASSWORD: string = 'new';
        await controller.setPassword(NEW_PASSWORD);
        expect(MockAuthenticator.PASSWORD).toBe(NEW_PASSWORD);
        await controller.setPassword(OLD_PASSWORD);
    });

    it('requestPasswordReset(): returns the email it was called with', async () => {
        const STUB_EMAIL: string = 'email';
        const email: string = await controller.requestPasswordReset(STUB_EMAIL);
        expect(email).toBe(STUB_EMAIL);
    });

    it('addEducatorRequest(): adds an educator request', async () => {
        const request: EducatorRequest = await controller.addEducatorRequest(STUB_IEDUCATORREQUEST);
        expect(request).toBeTruthy();
    });

    it('getEducatorRequest(): gets the list of all available educator requests', async () => {
        await controller.addEducatorRequest(STUB_IEDUCATORREQUEST);
        await controller.addEducatorRequest(STUB_IEDUCATORREQUEST);
        const requests: EducatorRequest[] = await controller.getEducatorRequests();
        expect(requests.length).toBeGreaterThanOrEqual(2);
    });

    it('approveEducatorRequest(): sets an educator request\'s state to approved', async () => {
        const request: EducatorRequest = await controller.addEducatorRequest(STUB_IEDUCATORREQUEST);
        const approved: EducatorRequest = await controller.approveEducatorRequest(request.id);
        expect(approved.state).toBe(EducatorRequestState.APPROVED);
    });

    it('denyEducatorRequest(): sets an educator request\'s state to denied', async () => {
        const request: EducatorRequest = await controller.addEducatorRequest(STUB_IEDUCATORREQUEST);
        const denied: EducatorRequest = await controller.denyEducatorRequest(request.id);
        expect(denied.state).toBe(EducatorRequestState.DENIED);
    });

    it('getModules(): gets the list of all available modules', async () => {
        const modules: Module[] = await controller.getModules();
        expect(modules).toBeTruthy();
    });

    it('getEvents(): gets the list of all available events', async () => {
        const events: Event[] = await controller.getEvents();
        expect(events).toBeTruthy();
    });

    it('addImplementable(): adds an implementable', async () => {
        const implementable: Implementable = await controller.addImplementable(STUB_IMODULE);
        expect(implementable).toBeTruthy();
    });

    it('getImplementable(): gets an implementable given the correct id', async () => {
        const added: Implementable = await controller.addImplementable(STUB_IMODULE);
        const gotten: Implementable = await controller.getImplementable(added.id);
        expect(gotten).toBeTruthy();
    });

    it('updateImplementable(): updates an existing implementable', async () => {
        const added: Implementable = await controller.addImplementable(STUB_IMODULE);
        const updated: Implementable = await controller.updateImplementable(added.id, STUB_IMODULE);
        expect(updated).toBeTruthy();
    });

    it('deleteImplementable(): deletes an implmentable given the correct id', async () => {
        const added: Implementable = await controller.addImplementable(STUB_IMODULE);
        const deleted: Implementable = await controller.deleteImplementable(added.id);
        expect(deleted).toBeTruthy();
    });

    it('getDisciplineMetadata(): returns a DisciplineMetadata object', async () => {
        const metadata: DisciplineMetadata = await controller.getDisciplineMetadata();
        expect(metadata).toBeTruthy();
    });

    it('addSection(): adds a section', async () => {
        const implementable: Implementable = await controller.addImplementable(STUB_IMODULE);
        const section: Section = await controller.addSection(implementable.id, STUB_ISECTION);
        expect(section).toBeTruthy();
    });

    it('getSections(): gets an implementable\'s list of sections', async () => {
        const implementable: Implementable = await controller.addImplementable(STUB_IMODULE);
        await controller.addSection(implementable.id, STUB_ISECTION);
        const sections: Section[] = await controller.getSections(implementable.id);
        expect(sections).toBeTruthy();
    });

    it('updateSection(): updates an existing section', async () => {
        const implementable: Implementable = await controller.addImplementable(STUB_IMODULE);
        const added: Section = await controller.addSection(implementable.id, STUB_ISECTION);
        const updated: Section = await controller.updateSection(implementable.id, added.id, STUB_ISECTION);
        expect(updated).toBeTruthy();
    });

    it('setSection(): adds or updates a section, depending on whether a section id was provided', async () => {
        const implementable: Implementable = await controller.addImplementable(STUB_IMODULE);
        const added: Section = await controller.setSection(STUB_ISECTION, implementable.id);
        const updated: Section = await controller.setSection(STUB_ISECTION, implementable.id, added.id);
        expect(updated).toBeTruthy();
        expect(updated.id).toBe(added.id);
    });

    it('deleteSection(): deletes an existing section', async () => {
        const implementable: Implementable = await controller.addImplementable(STUB_IMODULE);
        const added: Section = await controller.addSection(implementable.id, STUB_ISECTION);
        const deleted: Section = await controller.deleteSection(implementable.id, added.id);
        expect(deleted).toBeTruthy();
    });

    it('addFile(): adds a file', async () => {
        const implementable: Implementable = await controller.addImplementable(STUB_IMODULE);
        const file: File = await controller.addFile(implementable.id, STUB_IFILE);
        expect(file).toBeTruthy();
    });

    it('getFiles(): gets a implementable\'s files', async () => {
        const implementable: Implementable = await controller.addImplementable(STUB_IMODULE);
        await controller.addFile(implementable.id, STUB_IFILE);
        const files: File[] = await controller.getFiles(implementable.id);
        expect(files).toBeTruthy();
    });

    it('deleteFile(): deletes an existing file', async () => {
        const implementable: Implementable = await controller.addImplementable(STUB_IMODULE);
        const added: File = await controller.addFile(implementable.id, STUB_IFILE);
        const deleted: File = await controller.deleteFile(implementable.id, added.id);
        expect(deleted).toBeTruthy();
    });

    it('upload(): uploads a file to storage and returns a link to that file', async () => {
        const url: string = await controller.upload(STUB_IFILE);
        expect(url).toBeTruthy();
    });

    it('addQuestion(): adds a question to an implementable', async () => {
        await controller.login(MockAuthenticator.ADMIN_USERNAME, MockAuthenticator.PASSWORD);
        const implementable: Implementable = await controller.addImplementable(STUB_IMODULE);
        const question: Question = await controller.addQuestion(implementable.id, STUB_IQUESTION);
        expect(question).toBeTruthy();
    });

    it('getQuestions(): gets an implementable\'s questions', async () => {
        await controller.login(MockAuthenticator.ADMIN_USERNAME, MockAuthenticator.PASSWORD);
        const implementable: Implementable = await controller.addImplementable(STUB_IMODULE);
        await controller.addQuestion(implementable.id, STUB_IQUESTION);
        await controller.addQuestion(implementable.id, STUB_IQUESTION);
        const questions: Question[] = await controller.getQuestions(implementable.id);
        expect(questions.length).toBeGreaterThanOrEqual(2);
    });

    it('updateQuestion(): updates a question', async () => {
        await controller.login(MockAuthenticator.ADMIN_USERNAME, MockAuthenticator.PASSWORD);
        const implementable: Implementable = await controller.addImplementable(STUB_IMODULE);
        const added: Question = await controller.addQuestion(implementable.id, STUB_IQUESTION);
        const updated: Question = await controller.updateQuestion(implementable.id, added.id, STUB_IQUESTION);
        expect(updated).toBeTruthy();
    });

    it('setQuestion(): adds a question to an implementable if no id is provided', async () => {
        await controller.login(MockAuthenticator.ADMIN_USERNAME, MockAuthenticator.PASSWORD);
        const implementable: Implementable = await controller.addImplementable(STUB_IMODULE);
        const question: Question = await controller.setQuestion(STUB_IQUESTION, implementable.id);
        expect(question).toBeTruthy();
    });

    it('setQuestion(): updates a question to an implementable if an id is provided', async () => {
        await controller.login(MockAuthenticator.ADMIN_USERNAME, MockAuthenticator.PASSWORD);
        const implementable: Implementable = await controller.addImplementable(STUB_IMODULE);
        const added: Question = await controller.addQuestion(implementable.id, STUB_IQUESTION);
        const set: Question = await controller.setQuestion(STUB_IQUESTION, implementable.id, added.id);
        expect(set).toBeTruthy();
        expect(set.id).toBe(added.id);
    });

    it('deleteQuestion(): deletes a question', async () => {
        await controller.login(MockAuthenticator.ADMIN_USERNAME, MockAuthenticator.PASSWORD);
        const implementable: Implementable = await controller.addImplementable(STUB_IMODULE);
        const added: Question = await controller.addQuestion(implementable.id, STUB_IQUESTION);
        const deleted: Question = await controller.deleteQuestion(implementable.id, added.id);
        expect(deleted).toBeTruthy();
    });

    it('draftImplementation(): returns an incomplete IImplementation with basic profile information', async () => {
        const implementable: Implementable = await controller.addImplementable(STUB_IMODULE);
        await controller.login(MockAuthenticator.EDUCATOR_USERNAME, MockAuthenticator.PASSWORD);
        const implementation: IImplementation = await controller.draftImplementation(implementable.id);
        expect(implementation).toBeTruthy();
    });

    it('addImplementation(): adds an implementation', async () => {
       const implementation: Implementation = await controller.addImplementation(STUB_IIMPLEMENTATION);
       expect(implementation).toBeTruthy();
    });

    it('getImplementations(): gets all completed or uncompleted implementations for a user', async () => {
        await controller.addImplementation(STUB_IIMPLEMENTATION);
        await controller.addImplementation(STUB_IIMPLEMENTATION);
        const implementations: Implementation[] = await controller.getImplementations(false);
        expect(implementations.length).toBeGreaterThanOrEqual(2);
    });

    it('getImplementations(): gets all completed or uncompleted implementations for an implementable', async () => {
        await controller.addImplementation(STUB_IIMPLEMENTATION);
        await controller.addImplementation(STUB_IIMPLEMENTATION);
        const implementations: Implementation[] = await controller.getImplementations(false, STUB_IIMPLEMENTATION.implementableId);
        expect(implementations.length).toBeGreaterThanOrEqual(2);
    });

    it('getImplementation(): gets an implementation given the correct id', async () => {
        const added: Implementation = await controller.addImplementation(STUB_IIMPLEMENTATION);
        const gotten: Implementation = await controller.getImplementation(added.id);
        expect(gotten).toBeTruthy();
    });

    it('updateImplementation(): updates an existing implementation', async () => {
        await controller.login(MockAuthenticator.EDUCATOR_USERNAME, MockAuthenticator.PASSWORD);
        const added: Implementation = await controller.addImplementation(STUB_IIMPLEMENTATION);
        const updated: Implementation = await controller.updateImplementation(added.id, STUB_IIMPLEMENTATION);
        expect(updated).toBeTruthy();
    });

    it('deleteImplementation(): updates an existing implementation', async () => {
        await controller.login(MockAuthenticator.EDUCATOR_USERNAME, MockAuthenticator.PASSWORD);
        const added: Implementation = await controller.addImplementation(STUB_IIMPLEMENTATION);
        const deleted: Implementation = await controller.deleteImplementation(added.id);
        expect(deleted).toBeTruthy();
    });

    it('completeImplementation(): completes and returns a completed implementation', async () => {
        await controller.login(MockAuthenticator.EDUCATOR_USERNAME, MockAuthenticator.PASSWORD);
        const added: Implementation = await controller.addImplementation(STUB_IIMPLEMENTATION);
        const completed: Implementation = await controller.completeImplementation(added.id);
        expect(completed).toBeTruthy();
    });

    it('addAnswer(): adds an answer to an implementation', async () => {
        await controller.login(MockAuthenticator.EDUCATOR_USERNAME, MockAuthenticator.PASSWORD);
        const implementation: Implementation = await controller.addImplementation(STUB_IIMPLEMENTATION);
        const answer: Answer = await controller.addAnswer(implementation.id, STUB_IANSWER);
        expect(answer).toBeTruthy();
    });

    it('getAnswers(): gets an implementation\'s answers', async () => {
        await controller.login(MockAuthenticator.EDUCATOR_USERNAME, MockAuthenticator.PASSWORD);
        const implementation: Implementation = await controller.addImplementation(STUB_IIMPLEMENTATION);
        await controller.addAnswer(implementation.id, STUB_IANSWER);
        await controller.addAnswer(implementation.id, STUB_IANSWER);
        const answers: Answer[] = await controller.getAnswers(implementation.id);
        expect(answers.length).toBeGreaterThanOrEqual(2);
    });

    it('updateAnswer(): updates an answer', async () => {
        await controller.login(MockAuthenticator.EDUCATOR_USERNAME, MockAuthenticator.PASSWORD);
        const implementation: Implementation = await controller.addImplementation(STUB_IIMPLEMENTATION);
        const added: Answer = await controller.addAnswer(implementation.id, STUB_IANSWER);
        const updated: Answer = await controller.updateAnswer(implementation.id, added.id, STUB_IANSWER);
        expect(updated).toBeTruthy();
    });

    it('setAnswer(): adds an answer to an implementation if no id is provided', async () => {
        await controller.login(MockAuthenticator.EDUCATOR_USERNAME, MockAuthenticator.PASSWORD);
        const implementation: Implementation = await controller.addImplementation(STUB_IIMPLEMENTATION);
        const answer: Answer = await controller.setAnswer(STUB_IANSWER, implementation.id);
        expect(answer).toBeTruthy();
    });

    it('setAnswer(): updates an implementation\'s answer if an id is provided', async () => {
        await controller.login(MockAuthenticator.EDUCATOR_USERNAME, MockAuthenticator.PASSWORD);
        const implementation: Implementation = await controller.addImplementation(STUB_IIMPLEMENTATION);
        const added: Answer = await controller.addAnswer(implementation.id, STUB_IANSWER);
        const set: Answer = await controller.setAnswer(STUB_IANSWER, implementation.id, added.id);
        expect(set).toBeTruthy();
        expect(set.id).toBe(added.id);
    });

    it('deleteAnswer(): deletes an answer', async () => {
        await controller.login(MockAuthenticator.EDUCATOR_USERNAME, MockAuthenticator.PASSWORD);
        const implementation: Implementation = await controller.addImplementation(STUB_IIMPLEMENTATION);
        const added: Answer = await controller.addAnswer(implementation.id, STUB_IANSWER);
        const deleted: Answer = await controller.deleteAnswer(implementation.id, added.id);
        expect(deleted).toBeTruthy();
    });

    it('addEvidence(): adds an evidence file', async () => {
        await controller.login(MockAuthenticator.EDUCATOR_USERNAME, MockAuthenticator.PASSWORD);
        const implementation: Implementation = await controller.addImplementation(STUB_IIMPLEMENTATION);
        const evidence: File = await controller.addEvidence(implementation.id, STUB_IFILE);
        expect(evidence).toBeTruthy();
    });

    it('getEvidence(): gets an implementation\'s evidence', async () => {
        await controller.login(MockAuthenticator.EDUCATOR_USERNAME, MockAuthenticator.PASSWORD);
        const implementation: Implementation = await controller.addImplementation(STUB_IIMPLEMENTATION);
        await controller.addEvidence(implementation.id, STUB_IFILE);
        await controller.addEvidence(implementation.id, STUB_IFILE);
        const evidence: File[] = await controller.getEvidence(implementation.id);
        expect(evidence.length).toBeGreaterThanOrEqual(2);
    });

    it('deleteEvidence(): deletes an existing evidence file', async () => {
        await controller.login(MockAuthenticator.EDUCATOR_USERNAME, MockAuthenticator.PASSWORD);
        const implementation: Implementation = await controller.addImplementation(STUB_IIMPLEMENTATION);
        const added: File = await controller.addEvidence(implementation.id, STUB_IFILE);
        const deleted: File = await controller.deleteEvidence(implementation.id, added.id);
        expect(deleted).toBeTruthy();
    });

    it('getAllies(): returns the list of existing allies', async () => {
        await controller.addAlly(STUB_IALLY);
        await controller.addAlly(STUB_IALLY);
        const allies: Ally[] = await controller.getAllies();
        expect(allies).toBeTruthy();
        expect(allies.length).toBeGreaterThanOrEqual(2);
    });

    it('addAlly(): adds a new ally and returns it', async () => {
        const ally: Ally = await controller.addAlly(STUB_IALLY);
        expect(ally).toBeTruthy();
    });

    it('updateAlly(): updates an ally and returns it', async () => {
        const added: Ally = await controller.addAlly(STUB_IALLY);
        const updated: Ally = await controller.updateAlly(added.id, STUB_IALLY);
        expect(updated).toBeTruthy();
        expect(added.id).toBe(added.id);
    });

    it('deleteAlly(): deletes an ally and returns it', async () => {
        const added: Ally = await controller.addAlly(STUB_IALLY);
        const deleted: Ally = await controller.deleteAlly(added.id);
        expect(deleted).toBeTruthy();
        expect(deleted.id).toBe(added.id);
    });

    /*
    it('(): ', async () => {
        
    });
    */
});