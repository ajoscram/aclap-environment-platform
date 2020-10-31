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

    constructor(
        private factory: Factory,
        private validator: Validator,
        private firestore: AngularFirestore
    ){}

    async getDisciplineMetadata(): Promise<DisciplineMetadata>{
        const document: DocumentData = await this.firestore
            .collection(FirebaseDatabase.CONSTANTS)
            .doc(FirebaseDatabase.DISCIPLINE_METADATA)
            .get().toPromise();
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
        await this.firestore
            .collection(FirebaseDatabase.USERS)
            .doc(id)
            .set(user);
        return this.factory.getUser(id, user);
    }

    async getUser(id: string): Promise<User>{
        const document: DocumentData = await this.firestore
            .collection(FirebaseDatabase.USERS)
            .doc(id)
            .get().toPromise();
        const user: any = document.data();
        if(!user)
            throw new Error(DatabaseError.USER_NOT_FOUND);
        else
            return this.factory.getUser(id, user as IUser);
    }

    async getModule(id: string): Promise<Module>{
        const document: DocumentData = await this.firestore
            .collection(FirebaseDatabase.MODULES)
            .doc(id)
            .get().toPromise();
        const module_: any = document.data();
        if(!module_)
            throw new Error(DatabaseError.MODULE_NOT_FOUND);
        else
            return this.factory.getModule(id, module_ as IModule);
    }

    async getModules(): Promise<Module[]>{
        const modules: Module[] = [];
        const documents: QuerySnapshot<DocumentData> = await this.firestore
            .collection(FirebaseDatabase.MODULES)
            .get().toPromise();
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
        await this.firestore
            .collection(FirebaseDatabase.MODULES)
            .doc(id)
            .set(module);
        return this.factory.getModule(id, module);
    }
    
    async updateModule(id: string, module: IModule): Promise<Module>{
        this.validator.validateIModule(module);
        await this.firestore
            .collection(FirebaseDatabase.MODULES)
            .doc(id)
            .update(module);
        return this.factory.getModule(id, module);
    }

    async deleteModule(id: string): Promise<Module>{
        const module: Module = await this.getModule(id);
        await this.firestore
            .collection(FirebaseDatabase.MODULES)
            .doc(id)
            .delete();
        return module;
    }

    async getSections(moduleId: string): Promise<Section[]>{
        const sections: Section[] = [];
        const documents: QuerySnapshot<DocumentData> = await this.firestore
            .collection(FirebaseDatabase.MODULES)
            .doc(moduleId)
            .collection(FirebaseDatabase.SECTIONS)
            .get().toPromise();
        documents.forEach(document => {
            const response: any = document.data();
            const section: Section = this.factory.getSection(response.id, response as ISection);
            sections.push(section);
        });
        return sections;
    }

    private async getSection(moduleId: string, sectionId: string): Promise<Section>{
        const document: DocumentData = await this.firestore
            .collection(FirebaseDatabase.MODULES)
            .doc(moduleId)
            .collection(FirebaseDatabase.SECTIONS)
            .doc(sectionId)
            .get().toPromise();
        const section: any = document.data();
        if(!section)
            throw new Error(DatabaseError.SECTION_NOT_FOUND);
        else
            return this.factory.getSection(sectionId, section as ISection);
    }

    async addSection(moduleId: string, section: ISection): Promise<Section>{
        this.validator.validateISection(section);
        const id: string = this.firestore.createId();
        section['id'] = id;
        await this.firestore
            .collection(FirebaseDatabase.MODULES)
            .doc(moduleId)
            .collection(FirebaseDatabase.SECTIONS)
            .doc(id)
            .set(section);
        return this.factory.getSection(id, section);
    }
    
    async updateSection(moduleId: string, sectionId: string, section: ISection): Promise<Section>{
        this.validator.validateISection(section);
        await this.firestore
            .collection(FirebaseDatabase.MODULES)
            .doc(moduleId)
            .collection(FirebaseDatabase.SECTIONS)
            .doc(sectionId)
            .update(section);
        return this.factory.getSection(sectionId, section);
    }

    async deleteSection(moduleId: string, sectionId: string): Promise<Section>{
        const section: Section = await this.getSection(moduleId, sectionId);
        await this.firestore
            .collection(FirebaseDatabase.MODULES)
            .doc(moduleId)
            .collection(FirebaseDatabase.SECTIONS)
            .doc(sectionId)
            .delete();
        return section;
    }
    
    async getFiles(moduleId: string, sectionId: string): Promise<File[]>{
        const files: File[] = [];
        const documents: QuerySnapshot<DocumentData> = await this.firestore
            .collection(FirebaseDatabase.MODULES)
            .doc(moduleId)
            .collection(FirebaseDatabase.SECTIONS)
            .doc(sectionId)
            .collection(FirebaseDatabase.FILES)
            .get().toPromise();
        documents.forEach(document => {
            const response: any = document.data();
            const file: File = this.factory.getFile(response.id, response as IFile);
            files.push(file);
        });
        return files;
    }

    async getFile(moduleId: string, sectionId: string, fileId: string): Promise<File>{
        const document: DocumentData = await this.firestore
            .collection(FirebaseDatabase.MODULES)
            .doc(moduleId)
            .collection(FirebaseDatabase.SECTIONS)
            .doc(sectionId)
            .collection(FirebaseDatabase.FILES)
            .doc(fileId)
            .get().toPromise();
        const file: any = document.data();
        if(!file)
            throw new Error(DatabaseError.FILE_NOT_FOUND);
        else
            return this.factory.getFile(fileId, file as IFile);
    }

    async addFile(moduleId: string, sectionId: string, file: IFile): Promise<File>{
        this.validator.validateIFile(file);
        const id: string = this.firestore.createId();
        file['id'] = id;
        await this.firestore
            .collection(FirebaseDatabase.MODULES)
            .doc(moduleId)
            .collection(FirebaseDatabase.SECTIONS)
            .doc(sectionId)
            .collection(FirebaseDatabase.FILES)
            .doc(id)
            .set(file);
        return this.factory.getFile(id, file);
    }

    async deleteFile(moduleId: string, sectionId: string, fileId: string): Promise<File>{
        const file: File = await this.getFile(moduleId, sectionId, fileId);
        await this.firestore
            .collection(FirebaseDatabase.MODULES)
            .doc(moduleId)
            .collection(FirebaseDatabase.SECTIONS)
            .doc(sectionId)
            .collection(FirebaseDatabase.FILES)
            .doc(fileId)
            .delete();
        return file;
    }
};