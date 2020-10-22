import { Module, IModule, DisciplineMetadata, Component, IComponent, File, IFile, User } from '@src/app/models';
import { Database, DatabaseError } from './Database.service';


const firebase = require('nativescript-plugin-firebase');

export class FirebaseDatabase implements Database{
    
    async getUser(id: string): Promise<User>{ throw new Error(DatabaseError.NOT_YET_IMPLEMENTED) };
    
    async getModule (id: string): Promise<Module>{ throw new Error(DatabaseError.NOT_YET_IMPLEMENTED) }

    async getModules (): Promise<Module[]>{ throw new Error(DatabaseError.NOT_YET_IMPLEMENTED) };

    async addModule (module: IModule): Promise<void>{ throw new Error(DatabaseError.NOT_YET_IMPLEMENTED) };

    async updateModule (id: string, module: IModule): Promise<void>{ throw new Error(DatabaseError.NOT_YET_IMPLEMENTED) };

    async deleteModule (id: string): Promise<void>{ throw new Error(DatabaseError.NOT_YET_IMPLEMENTED) };

    async getDisciplineMetadata (): Promise<DisciplineMetadata>{ throw new Error(DatabaseError.NOT_YET_IMPLEMENTED) };

    async getComponents (moduleId: string): Promise<Component[]>{ throw new Error(DatabaseError.NOT_YET_IMPLEMENTED) };

    async addComponent (moduleId: string, component: IComponent): Promise<void>{ throw new Error(DatabaseError.NOT_YET_IMPLEMENTED) };

    async updateComponent (moduleId: string, componentId: string, component: IComponent): Promise<void>{ throw new Error(DatabaseError.NOT_YET_IMPLEMENTED) };

    async deleteComponent (moduleId: string, componentId: string): Promise<void>{ throw new Error(DatabaseError.NOT_YET_IMPLEMENTED) };

    async getFiles (moduleId: string, componentId: string): Promise<File[]>{ throw new Error(DatabaseError.NOT_YET_IMPLEMENTED) };

    async addFile (moduleId: string, componentId: string, file: IFile): Promise<void>{ throw new Error(DatabaseError.NOT_YET_IMPLEMENTED) };

    async deleteFile (moduleId: string, componentId: string, fileId: string): Promise<void>{ throw new Error(DatabaseError.NOT_YET_IMPLEMENTED) };
    
};