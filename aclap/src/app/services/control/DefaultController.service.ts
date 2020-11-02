import { Injectable } from '@angular/core';
import { User, Module, IModule, DisciplineMetadata, Section, ISection, File, IFile } from '../../models';
import { Role, Session } from '../authentication/Session.model';
import { Controller } from './Controller.service';
import { Authenticator } from '../authentication/Authenticator.service';
import { Database } from '../database/Database.service';
import { Storage } from '../storage/Storage.service';
import { Pathfinder } from './pathfinding/Pathfinder.service';
import ControlModule from '../../modules/control/control.module';

@Injectable({
    providedIn: ControlModule
})
export class DefaultController implements Controller{

    constructor(
        private authenticator: Authenticator,
        private database: Database,
        private storage: Storage,
        private pathfinder: Pathfinder
    ){}

    //Local functions
    
    //WARNING: MUTATES INCOMING OBJECT STATE!
    //uploads all files found by pathfinder and changes the object's
    //string to the new uploaded URLs
    private async uploadFiles(obj: object){
        const paths: Map<string, string> = this.pathfinder.find(obj);
        for (let [key, path] of paths){
            const file: IFile = await this.storage.upload(path);
            obj[key] = file.url;
        }
    }

    //Controller interface implementation
    async login(email: string, password: string, role: Role): Promise<void>{
        await this.authenticator.login(email, password, role);
    }

    async logout(): Promise<void>{
        await this.authenticator.logout();
    }

    async getUser(): Promise<User>{
        const session: Session = await this.authenticator.getSession();
        return await this.database.getUser(session.user_id);
    }
    
    async getModule(id: string): Promise<Module>{
        return await this.database.getModule(id);
    }

    async getModules(): Promise<Module[]>{
        return await this.database.getModules();
    }

    async addModule(module: IModule): Promise<Module>{
        await this.authenticator.validate(Role.ADMINISTRATOR);
        await this.uploadFiles(module);
        return await this.database.addModule(module);
    }

    async updateModule(id: string, module: IModule): Promise<Module>{
        await this.authenticator.validate(Role.ADMINISTRATOR);
        await this.uploadFiles(module);
        return await this.database.updateModule(id, module);
    }

    async deleteModule(id: string): Promise<Module>{
        await this.authenticator.validate(Role.ADMINISTRATOR);
        return await this.database.deleteModule(id);
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
        await this.uploadFiles(section);
        return await this.database.addSection(moduleId, section);
    }

    async updateSection(moduleId: string, sectionId: string, section: ISection): Promise<Section>{
        await this.authenticator.validate(Role.ADMINISTRATOR);
        await this.uploadFiles(section);
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

    async deleteFile(moduleId: string, sectionId: string, file: File): Promise<File>{
        await this.authenticator.validate(Role.ANY);
        const deleted: File = await this.database.deleteFile(moduleId, sectionId, file.id);
        await this.storage.delete(file);
        return deleted;
    }
}