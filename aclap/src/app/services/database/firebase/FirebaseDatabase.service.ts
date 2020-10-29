import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentData, QuerySnapshot } from '@angular/fire/firestore';
import ControlModule from '@src/app/modules/control/control.module.tns';
import { Database, DatabaseError } from '../Database.service';   
import { Factory } from '../factory/Factory.service';
import { Validator } from '../validation/Validator.service';
import { Module, IModule, DisciplineMetadata, Section, ISection, File, IFile, User, Administrator, Educator, IDisciplineMetadata, IUser } from '../../../models';

@Injectable({
    providedIn: ControlModule
})
export class FirebaseDatabase implements Database{
    
    //collection names
    private static readonly CONSTANTS = 'constants';
    private static readonly USERS: string = 'users';
    private static readonly MODULES: string = 'modules';
    private static readonly SECTIONS: string = 'sections';
    private static readonly FILES: string = 'files';

    //constant document ids
    private static readonly DISCIPLINE_METADATA = 'DISCIPLINE_METADATA';

    //in document constants
    private static readonly ADMINISTRATOR: string = 'ADMINISTRATOR';
    private static readonly EDUCATOR: string = 'EDUCATOR';

    constructor(
        private factory: Factory,
        private validator: Validator,
        private firestore: AngularFirestore
    ){}
    
    async getDisciplineMetadata(): Promise<DisciplineMetadata>{
        const document: DocumentData = await this.firestore
            .collection(FirebaseDatabase.CONSTANTS)
            .doc(FirebaseDatabase.DISCIPLINE_METADATA).get().toPromise();
        const metadata: any = document.data();
        if(!metadata)
            throw new Error(DatabaseError.DISCIPLINE_METADATA_NOT_FOUND);
        else
            return this.factory.getDisciplineMetadata(metadata);
    }

    async setDisciplineMetadata(metadata: IDisciplineMetadata): Promise<DisciplineMetadata>{
        this.validator.validateDisciplineMetadata(metadata);
        await this.firestore
            .collection(FirebaseDatabase.CONSTANTS)
            .doc(FirebaseDatabase.DISCIPLINE_METADATA)
            .set(metadata);
        return this.factory.getDisciplineMetadata(metadata);
    }
    
    async addUser(id: string, user: IUser): Promise<User>{
        this.validator.validateIUser(user);
        user['id'] = id;
        await this.firestore.collection(FirebaseDatabase.USERS).doc(id).set(user);
        return this.factory.getUser(id, user);
    }

    async getUser(id: string): Promise<User>{
        const document: DocumentData = await this.firestore.collection(FirebaseDatabase.USERS).doc(id).get().toPromise();
        const user: any = document.data();
        if(!user)
            throw new Error(DatabaseError.USER_NOT_FOUND);
        else
            return this.factory.getUser(id, user as IUser);
    }

    async getModule(id: string): Promise<Module>{
        const document: DocumentData = await this.firestore.collection(FirebaseDatabase.MODULES).doc(id).get().toPromise();
        const module_: any = document.data();
        if(!module_)
            throw new Error(DatabaseError.MODULE_NOT_FOUND);
        else
            return this.factory.getModule(id, module_ as IModule);
    }

    async getModules(): Promise<Module[]>{
        const modules: Module[] = [];
        const documents: QuerySnapshot<DocumentData> = await this.firestore.collection(FirebaseDatabase.MODULES).get().toPromise();
        documents.forEach(document => {
            const response: any = document.data();
            const module: Module = this.factory.getModule(response.id, response as IModule);
            modules.push(module);
        });
        return modules;
    }

    async addModule(module: IModule): Promise<Module>{
        this.validator.validateIModule(module);
        const id: string = this.firestore.createId();
        module['id'] = id;
        await this.firestore.collection(FirebaseDatabase.MODULES).doc(id).set(module);
        return this.factory.getModule(id, module);
    }
    
    async updateModule(id: string, module: IModule): Promise<Module>{
        this.validator.validateIModule(module);
        await this.firestore.collection(FirebaseDatabase.MODULES).doc(id).update(module);
        return this.factory.getModule(id, module);
    }

    async deleteModule(id: string): Promise<Module>{
        const module: Module = await this.getModule(id);
        await this.firestore.collection(FirebaseDatabase.MODULES).doc(id).delete();
        return module;
    }

    async getSections(moduleId: string): Promise<Section[]>{ throw new Error('Not impemented yet'); }
    async addSection(moduleId: string, section: ISection): Promise<Section>{ throw new Error('Not impemented yet'); }
    async updateSection(moduleId: string, sectionId: string, section: ISection): Promise<Section>{ throw new Error('Not impemented yet'); }
    async deleteSection(moduleId: string, sectionId: string): Promise<Section>{ throw new Error('Not impemented yet'); }
    async getFiles(moduleId: string, sectionId: string): Promise<File[]>{ throw new Error('Not impemented yet'); }
    async addFile(moduleId: string, sectionId: string, file: IFile): Promise<File>{ throw new Error('Not impemented yet'); }
    async deleteFile(moduleId: string, sectionId: string, fileId: string): Promise<File>{ throw new Error('Not impemented yet'); }
};