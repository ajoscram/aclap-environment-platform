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
import { correctPath as IMAGE_PATH } from './pathfinding/Pathfinder.service.spec.split';
import { DisciplineMetadata, IModule, IParagraphSection, Module, Section, File } from '../../models';
import { Factory } from '../database/factory/Factory.service';
import { Pathfinder } from './pathfinding/Pathfinder.service';

describe('DefaultController', () => {

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
                Factory,
                Pathfinder
            ] 
        });
        controller = TestBed.inject(Controller);
        await controller.login(MockAuthenticator.ADMIN_USERNAME, MockAuthenticator.PASSWORD, Role.ADMINISTRATOR);
        stubIModule = {
            name: 'name',
            $imageUrl: IMAGE_PATH,
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

    it('logout(): logs out an already logged in user', async () => {
        //an administrator user is logged in on the before each
        await expectAsync(controller.logout()).toBeResolved();
    });

    it('addModule(): adds a module', async () => {
        const module: Module = await controller.addModule(stubIModule);
        expect(module).toBeTruthy();
    });

    it('getModule(): gets a module given the correct id', async () => {
        const added: Module = await controller.addModule(stubIModule);
        const gotten: Module = await controller.getModule(added.id);
        expect(gotten).toBeTruthy();
    });

    it('getModules(): gets the list of all available modules', async () => {
        const modules: Module[] = await controller.getModules();
        expect(modules).toBeTruthy();
    });

    it('updateModule(): updates an existing module', async () => {
        const added: Module = await controller.addModule(stubIModule);
        const updated: Module = await controller.updateModule(added.id, stubIModule);
        expect(updated).toBeTruthy();
    });

    it('deleteModule(): ', async () => {
        const added: Module = await controller.addModule(stubIModule);
        const deleted: Module = await controller.deleteModule(added.id);
        expect(deleted).toBeTruthy();
    });

    it('getDisciplineMetadata(): returns a DisciplineMetadata object', async () => {
        const metadata: DisciplineMetadata = await controller.getDisciplineMetadata();
        expect(metadata).toBeTruthy();
    });

    it('addSection(): adds a section', async () => {
        const module: Module = await controller.addModule(stubIModule);
        const section: Section = await controller.addSection(module.id, stubISection);
        expect(section).toBeTruthy();
    });

    it('getSections(): gets a module\'s list of sections', async () => {
        const module: Module = await controller.addModule(stubIModule);
        await controller.addSection(module.id, stubISection);
        const sections: Section[] = await controller.getSections(module.id);
        expect(sections).toBeTruthy();
    });

    it('updateSection(): updates an existing session', async () => {
        const module: Module = await controller.addModule(stubIModule);
        const added: Section = await controller.addSection(module.id, stubISection);
        const updated: Section = await controller.updateSection(module.id, added.id, stubISection);
        expect(updated).toBeTruthy();
    });

    it('deleteSection(): deletes an existing section', async () => {
        const module: Module = await controller.addModule(stubIModule);
        const added: Section = await controller.addSection(module.id, stubISection);
        const deleted: Section = await controller.deleteSection(module.id, added.id);
        expect(deleted).toBeTruthy();
    });

    it('addFile(): adds a file', async () => {
        const module: Module = await controller.addModule(stubIModule);
        const section: Section = await controller.addSection(module.id, stubISection);
        const file: File = await controller.addFile(module.id, section.id, IMAGE_PATH);
        expect(file).toBeTruthy();
    });

    it('getFiles(): gets a section\'s files', async () => {
        const module: Module = await controller.addModule(stubIModule);
        const section: Section = await controller.addSection(module.id, stubISection);
        await controller.addFile(module.id, section.id, IMAGE_PATH);
        const files: File[] = await controller.getFiles(module.id, section.id);
        expect(files).toBeTruthy();
    });

    it('deleteFile(): deletes an existing file', async () => {
        const module: Module = await controller.addModule(stubIModule);
        const section: Section = await controller.addSection(module.id, stubISection);
        const added: File = await controller.addFile(module.id, section.id, IMAGE_PATH);
        const deleted: File = await controller.deleteFile(module.id, section.id, added);
        expect(deleted).toBeTruthy();
    });

    /*
    it('(): ', async () => {
        
    });
    */
});