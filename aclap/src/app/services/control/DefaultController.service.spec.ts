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
import { DisciplineMetadata, IModule, IParagraphSection, Module, Section, ISection, File, Implementable, Event, IEducatorRequest, User, EducatorRequest, EducatorRequestState, IImplementation, Implementation, Evaluation, IEvaluation, Score } from '../../models';
import { Factory } from '../database/factory/Factory.service';
import { Session } from '../authentication/Session.model';

describe('DefaultController', () => {

    const STUB_IEDUCATORREQUEST: IEducatorRequest= {
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
    const STUB_IIMPLEMENTATION: IImplementation = {
        date: new Date(),
        participants: 1,
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
    const STUB_IEVALUATION: IEvaluation = {
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
    //This represents a file, because MockStorage actually ignores it altogether.
    const STUB_FILE: any = {};
    
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
        await controller.login(MockAuthenticator.ADMIN_USERNAME, MockAuthenticator.PASSWORD, Role.ADMINISTRATOR);
    });


    it('login(): logs in a user with correct credentials', async () => {
        //an administrator user is logged in on the before each, so they must be logged out
        await controller.logout();
        await expectAsync(
            controller.login(MockAuthenticator.ADMIN_USERNAME, MockAuthenticator.PASSWORD, Role.ADMINISTRATOR)
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

    it('addSections(): adds multiple sections', async () => {
        const implementable: Implementable = await controller.addImplementable(STUB_IMODULE);
        const sections: ISection[] = [ STUB_ISECTION, STUB_ISECTION, STUB_ISECTION];
        const added: Section[] = await controller.addSections(implementable.id, sections);
        expect(added.length).toBe(sections.length);
    });

    it('getSections(): gets an implementable\'s list of sections', async () => {
        const implementable: Implementable = await controller.addImplementable(STUB_IMODULE);
        await controller.addSection(implementable.id, STUB_ISECTION);
        const sections: Section[] = await controller.getSections(implementable.id);
        expect(sections).toBeTruthy();
    });

    it('updateSection(): updates an existing session', async () => {
        const implementable: Implementable = await controller.addImplementable(STUB_IMODULE);
        const added: Section = await controller.addSection(implementable.id, STUB_ISECTION);
        const updated: Section = await controller.updateSection(implementable.id, added.id, STUB_ISECTION);
        expect(updated).toBeTruthy();
    });

    it('deleteSection(): deletes an existing section', async () => {
        const implementable: Implementable = await controller.addImplementable(STUB_IMODULE);
        const added: Section = await controller.addSection(implementable.id, STUB_ISECTION);
        const deleted: Section = await controller.deleteSection(implementable.id, added.id);
        expect(deleted).toBeTruthy();
    });

    it('addFile(): adds a file', async () => {
        const implementable: Implementable = await controller.addImplementable(STUB_IMODULE);
        const section: Section = await controller.addSection(implementable.id, STUB_ISECTION);
        const file: File = await controller.addFile(implementable.id, section.id, STUB_FILE);
        expect(file).toBeTruthy();
    });

    it('getFiles(): gets a section\'s files', async () => {
        const implementable: Implementable = await controller.addImplementable(STUB_IMODULE);
        const section: Section = await controller.addSection(implementable.id, STUB_ISECTION);
        await controller.addFile(implementable.id, section.id, STUB_FILE);
        const files: File[] = await controller.getFiles(implementable.id, section.id);
        expect(files).toBeTruthy();
    });

    it('deleteFile(): deletes an existing file', async () => {
        const implementable: Implementable = await controller.addImplementable(STUB_IMODULE);
        const section: Section = await controller.addSection(implementable.id, STUB_ISECTION);
        const added: File = await controller.addFile(implementable.id, section.id, STUB_FILE);
        const deleted: File = await controller.deleteFile(implementable.id, section.id, added.id);
        expect(deleted).toBeTruthy();
    });

    it('upload(): uploads a file to storage and returns a link to that file', async () => {
        const url: string = await controller.upload(STUB_FILE);
        expect(url).toBeTruthy();
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

    it('updateImplementation(): updates an existing implementation', async () => {
        await controller.login(MockAuthenticator.EDUCATOR_USERNAME, MockAuthenticator.PASSWORD, Role.EDUCATOR);
        const added: Implementation = await controller.addImplementation(STUB_IIMPLEMENTATION);
        const updated: Implementation = await controller.updateImplementation(added.id, STUB_IIMPLEMENTATION);
        expect(updated).toBeTruthy();
    });

    it('deleteImplementation(): updates an existing implementation', async () => {
        await controller.login(MockAuthenticator.EDUCATOR_USERNAME, MockAuthenticator.PASSWORD, Role.EDUCATOR);
        const added: Implementation = await controller.addImplementation(STUB_IIMPLEMENTATION);
        const deleted: Implementation = await controller.deleteImplementation(added.id);
        expect(deleted).toBeTruthy();
    });

    it('completeImplementation(): completes and returns a completed implementation', async () => {
        await controller.login(MockAuthenticator.EDUCATOR_USERNAME, MockAuthenticator.PASSWORD, Role.EDUCATOR);
        const added: Implementation = await controller.addImplementation(STUB_IIMPLEMENTATION);
        const completed: Implementation = await controller.completeImplementation(added.id);
        expect(completed).toBeTruthy();
    });

    it('addEvaluation(): adds an evaluation', async () => {
        await controller.login(MockAuthenticator.EDUCATOR_USERNAME, MockAuthenticator.PASSWORD, Role.EDUCATOR);
        const implementation: Implementation = await controller.addImplementation(STUB_IIMPLEMENTATION);
        const evaluation: Evaluation = await controller.addEvaluation(implementation.id, STUB_IEVALUATION);
        expect(evaluation).toBeTruthy();
    });

    it('getEvaluations(): gets an implementation\'s evaluations', async () => {
        await controller.login(MockAuthenticator.EDUCATOR_USERNAME, MockAuthenticator.PASSWORD, Role.EDUCATOR);
        const implementation: Implementation = await controller.addImplementation(STUB_IIMPLEMENTATION);
        await controller.addEvaluation(implementation.id, STUB_IEVALUATION);
        await controller.addEvaluation(implementation.id, STUB_IEVALUATION);
        const evaluations: Evaluation[] = await controller.getEvaluations(implementation.id);
        expect(evaluations.length).toBeGreaterThanOrEqual(2);
    });

    it('updateEvaluation(): updates an evaluation', async () => {
        await controller.login(MockAuthenticator.EDUCATOR_USERNAME, MockAuthenticator.PASSWORD, Role.EDUCATOR);
        const implementation: Implementation = await controller.addImplementation(STUB_IIMPLEMENTATION);
        const added: Evaluation = await controller.addEvaluation(implementation.id, STUB_IEVALUATION);
        const updated: Evaluation = await controller.updateEvaluation(implementation.id, added.id, STUB_IEVALUATION);
        expect(updated).toBeTruthy();
    });

    it('deleteEvaluation(): deletes an evaluation', async () => {
        await controller.login(MockAuthenticator.EDUCATOR_USERNAME, MockAuthenticator.PASSWORD, Role.EDUCATOR);
        const implementation: Implementation = await controller.addImplementation(STUB_IIMPLEMENTATION);
        const added: Evaluation = await controller.addEvaluation(implementation.id, STUB_IEVALUATION);
        const deleted: Evaluation = await controller.deleteEvaluation(implementation.id, added.id);
        expect(deleted).toBeTruthy();
    });

    it('addEvidence(): add\'s an evidence file', async () => {
        await controller.login(MockAuthenticator.EDUCATOR_USERNAME, MockAuthenticator.PASSWORD, Role.EDUCATOR);
        const implementation: Implementation = await controller.addImplementation(STUB_IIMPLEMENTATION);
        const evidence: File = await controller.addEvidence(implementation.id, STUB_FILE);
        expect(evidence).toBeTruthy();
    });

    it('getEvidence(): gets an implementation\'s evidence', async () => {
        await controller.login(MockAuthenticator.EDUCATOR_USERNAME, MockAuthenticator.PASSWORD, Role.EDUCATOR);
        const implementation: Implementation = await controller.addImplementation(STUB_IIMPLEMENTATION);
        await controller.addEvidence(implementation.id, STUB_FILE);
        await controller.addEvidence(implementation.id, STUB_FILE);
        const evidence: File[] = await controller.getEvidence(implementation.id);
        expect(evidence.length).toBeGreaterThanOrEqual(2);
    });

    it('deleteEvidence(): deletes an existing evidence file', async () => {
        await controller.login(MockAuthenticator.EDUCATOR_USERNAME, MockAuthenticator.PASSWORD, Role.EDUCATOR);
        const implementation: Implementation = await controller.addImplementation(STUB_IIMPLEMENTATION);
        const added: File = await controller.addEvidence(implementation.id, STUB_FILE);
        const deleted: File = await controller.deleteEvidence(implementation.id, added.id);
        expect(deleted).toBeTruthy();
    });

    /*
    it('(): ', async () => {
        
    });
    */
});