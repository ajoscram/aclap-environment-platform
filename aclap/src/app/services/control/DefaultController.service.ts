import { User, Module, IModule, DisciplineMetadata, Component, IComponent, File, IFile } from '@src/app/models';
import { Role, Session } from '../authentication/Session.model';
import { Controller } from './Controller.service';
import { Authenticator } from '../authentication/Authenticator.service';
import { Database } from '../database/Database.service';
import { Storage } from '../storage/Storage.service';
import { Injectable } from '@angular/core';
import ControlModule from '../../modules/control.module';

@Injectable({
    providedIn: ControlModule
})
export class DefaultController implements Controller{

    constructor(
        private authenticator: Authenticator,
        private database: Database,
        private storage: Storage
    ){}

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

    async addModule(module: IModule): Promise<void>{
        await this.authenticator.validate(Role.ADMINISTRATOR);
        return await this.database.addModule(module);
    }

    async updateModule(id: string, module: IModule): Promise<void>{
        await this.authenticator.validate(Role.EDUCATOR);
        return await this.database.updateModule(id, module);
    }

    async deleteModule(id: string): Promise<void>{
        await this.authenticator.validate(Role.ADMINISTRATOR);
        return await this.database.deleteModule(id);
    }

    async getDisciplineMetadata(): Promise<DisciplineMetadata>{
        await this.authenticator.validate(Role.ADMINISTRATOR);
        return await this.database.getDisciplineMetadata();
    }

    async getComponents(moduleId: string): Promise<Component[]>{
        return await this.database.getComponents(moduleId);
    }

    async addComponent(moduleId: string, component: IComponent): Promise<void>{
        await this.authenticator.validate(Role.ADMINISTRATOR);
        return await this.database.addComponent(moduleId, component);
    }

    async updateComponent(moduleId: string, componentId: string, component: IComponent): Promise<void>{
        await this.authenticator.validate(Role.ADMINISTRATOR);
        return await this.database.updateComponent(moduleId, componentId, component);
    }

    async deleteComponent(moduleId: string, componentId: string): Promise<void>{
        await this.authenticator.validate(Role.ADMINISTRATOR);
        return await this.database.deleteComponent(moduleId, componentId);
    }

    async getFiles(moduleId: string, componentId: string): Promise<File[]>{
        return await this.database.getFiles(moduleId, componentId);
    }

    async addFile(moduleId: string, componentId: string, path: string): Promise<void>{
        await this.authenticator.validate(Role.ADMINISTRATOR);
        const file: IFile = await this.storage.upload(path);
        return await this.database.addFile(moduleId, componentId, file);
    }

    async deleteFile(moduleId: string, componentId: string, file: File): Promise<void>{
        await this.authenticator.validate(Role.ADMINISTRATOR);
        await this.storage.delete(file);
        await this.database.deleteFile(moduleId, componentId, file.id);
    }
}