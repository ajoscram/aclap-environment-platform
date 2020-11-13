import { Injectable } from '@angular/core';
import { User, Module, DisciplineMetadata, Section, ISection, File, IFile, Implementable, IImplementable, Event } from '../../models';
import { Role, Session } from '../authentication/Session.model';
import { Controller } from './Controller.service';
import { Authenticator } from '../authentication/Authenticator.service';
import { Database } from '../database/Database.service';
import { Storage } from '../storage/Storage.service';
import ControlModule from '../../modules/control/control.module';

@Injectable({
    providedIn: ControlModule
})
export class DefaultController implements Controller{

    constructor(
        private authenticator: Authenticator,
        private database: Database,
        private storage: Storage
    ){}

    //Controller interface implementation
    async login(email: string, password: string): Promise<void>{
        await this.authenticator.login(email, password);
    }

    async logout(): Promise<void>{
        await this.authenticator.logout();
    }

    async getUser(): Promise<User>{
        const session: Session = await this.authenticator.getSession();
        return await this.database.getUser(session.user_id);
    }
    
    async getModules(): Promise<Module[]>{
        return await this.database.getModules();
    }

    async getEvents(): Promise<Event[]>{
        return await this.database.getEvents();
    };

    async getImplementable(id: string): Promise<Implementable>{
        return await this.database.getImplementable(id);
    }

    async addImplementable(implementable: IImplementable): Promise<Implementable>{
        await this.authenticator.validate(Role.ADMINISTRATOR);
        return await this.database.addImplementable(implementable);
    }

    async updateImplementable(id: string, implementable: IImplementable): Promise<Implementable>{
        await this.authenticator.validate(Role.ADMINISTRATOR);
        return await this.database.updateImplementable(id, implementable);
    }

    async deleteImplementable(id: string): Promise<Implementable>{
        await this.authenticator.validate(Role.ADMINISTRATOR);
        return await this.database.deleteImplementable(id);
    }

    async getDisciplineMetadata(): Promise<DisciplineMetadata>{
        await this.authenticator.validate(Role.ADMINISTRATOR);
        return await this.database.getDisciplineMetadata();
    }

    async getSections(moduleId: string): Promise<Section[]>{
        return await this.database.getSections(moduleId);
    }

    async addSection(moduleId: string, section: ISection): Promise<Section>{
        await this.authenticator.validate(Role.ADMINISTRATOR);
        return await this.database.addSection(moduleId, section);
    }

    async updateSection(moduleId: string, sectionId: string, section: ISection): Promise<Section>{
        await this.authenticator.validate(Role.ADMINISTRATOR);
        return await this.database.updateSection(moduleId, sectionId, section);
    }

    async deleteSection(moduleId: string, sectionId: string): Promise<Section>{
        await this.authenticator.validate(Role.ADMINISTRATOR);
        return await this.database.deleteSection(moduleId, sectionId);
    }

    async getFiles(moduleId: string, sectionId: string): Promise<File[]>{
        return await this.database.getFiles(moduleId, sectionId);
    }

    async addFile(moduleId: string, sectionId: string, file: any): Promise<File>{
        await this.authenticator.validate(Role.ADMINISTRATOR);
        const file_: IFile = await this.storage.upload(file);
        return await this.database.addFile(moduleId, sectionId, file_);
    }

    async deleteFile(moduleId: string, sectionId: string, fileId: string): Promise<File>{
        await this.authenticator.validate(Role.ANY);
        const deleted: File = await this.database.deleteFile(moduleId, sectionId, fileId);
        await this.storage.delete(deleted);
        return deleted;
    }

    async upload(file: any): Promise<string>{
        await this.authenticator.validate(Role.ANY);
        const file_: IFile = await this.storage.upload(file);
        return file_.url;
    }
}