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
import { DisciplineMetadata, IModule, IParagraphSection, Module, Section, File, Implementable, Event } from '../../models';
import { Factory } from '../database/factory/Factory.service';

describe('DefaultController', () => {

    const IMAGE_PATH: string = 'https://example.com/image.png';

    let stubIModule: IModule;
    let stubISection: IParagraphSection;
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
        stubIModule = {
            name: 'name',
            color: '#EF6423',
            imageUrl: IMAGE_PATH,
            bannerImageUrl: IMAGE_PATH,
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
        stubISection  = {
            index: 0,
            text: 'text'
        };
    });


    it('login(): logs in a user with correct credentials', async () => {
        //an administrator user is logged in on the before each, so they must be logged out
        await controller.logout();
        await expectAsync(
            controller.login(MockAuthenticator.ADMIN_USERNAME, MockAuthenticator.PASSWORD, Role.ADMINISTRATOR)
        ).toBeResolved();
    });

    it('getModules(): gets the list of all available modules', async () => {
        const modules: Module[] = await controller.getModules();
        expect(modules).toBeTruthy();
    });

    it('getEvents(): gets the list of all available events', async () => {
        const events: Event[] = await controller.getEvents();
        expect(events).toBeTruthy();
    });

    it('logout(): logs out an already logged in user', async () => {
        //an administrator user is logged in on the before each
        await expectAsync(controller.logout()).toBeResolved();
    });

    it('addImplementable(): adds an implementable', async () => {
        const implementable: Implementable = await controller.addImplementable(stubIModule);
        expect(implementable).toBeTruthy();
    });

    it('getImplementable(): gets an implementable given the correct id', async () => {
        const added: Implementable = await controller.addImplementable(stubIModule);
        const gotten: Implementable = await controller.getImplementable(added.id);
        expect(gotten).toBeTruthy();
    });

    it('updateImplementable(): updates an existing implementable', async () => {
        const added: Implementable = await controller.addImplementable(stubIModule);
        const updated: Implementable = await controller.updateImplementable(added.id, stubIModule);
        expect(updated).toBeTruthy();
    });

    it('deleteImplementable(): deletes an implmentable given the correct id', async () => {
        const added: Implementable = await controller.addImplementable(stubIModule);
        const deleted: Implementable = await controller.deleteImplementable(added.id);
        expect(deleted).toBeTruthy();
    });

    it('getDisciplineMetadata(): returns a DisciplineMetadata object', async () => {
        const metadata: DisciplineMetadata = await controller.getDisciplineMetadata();
        expect(metadata).toBeTruthy();
    });

    it('addSection(): adds a section', async () => {
        const implementable: Implementable = await controller.addImplementable(stubIModule);
        const section: Section = await controller.addSection(implementable.id, stubISection);
        expect(section).toBeTruthy();
    });

    it('getSections(): gets an implementable\'s list of sections', async () => {
        const implementable: Implementable = await controller.addImplementable(stubIModule);
        await controller.addSection(implementable.id, stubISection);
        const sections: Section[] = await controller.getSections(implementable.id);
        expect(sections).toBeTruthy();
    });

    it('updateSection(): updates an existing session', async () => {
        const implementable: Implementable = await controller.addImplementable(stubIModule);
        const added: Section = await controller.addSection(implementable.id, stubISection);
        const updated: Section = await controller.updateSection(implementable.id, added.id, stubISection);
        expect(updated).toBeTruthy();
    });

    it('deleteSection(): deletes an existing section', async () => {
        const implementable: Implementable = await controller.addImplementable(stubIModule);
        const added: Section = await controller.addSection(implementable.id, stubISection);
        const deleted: Section = await controller.deleteSection(implementable.id, added.id);
        expect(deleted).toBeTruthy();
    });

    it('addFile(): adds a file', async () => {
        const implementable: Implementable = await controller.addImplementable(stubIModule);
        const section: Section = await controller.addSection(implementable.id, stubISection);
        const file: File = await controller.addFile(implementable.id, section.id, IMAGE_PATH);
        expect(file).toBeTruthy();
    });

    it('getFiles(): gets a section\'s files', async () => {
        const implementable: Implementable = await controller.addImplementable(stubIModule);
        const section: Section = await controller.addSection(implementable.id, stubISection);
        await controller.addFile(implementable.id, section.id, IMAGE_PATH);
        const files: File[] = await controller.getFiles(implementable.id, section.id);
        expect(files).toBeTruthy();
    });

    it('deleteFile(): deletes an existing file', async () => {
        const implementable: Implementable = await controller.addImplementable(stubIModule);
        const section: Section = await controller.addSection(implementable.id, stubISection);
        const added: File = await controller.addFile(implementable.id, section.id, IMAGE_PATH);
        const deleted: File = await controller.deleteFile(implementable.id, section.id, added.id);
        expect(deleted).toBeTruthy();
    });

    /*
    it('(): ', async () => {
        
    });
    */
});