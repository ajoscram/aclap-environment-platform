import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import ControlModule from '@src/app/modules/control/control.module.tns';
import { Database, DatabaseError } from './Database.service';   
import { SectionFactory } from './sections/SectionFactory.service';
import { Validator } from './validation/Validator.service';
import { Module, IModule, DisciplineMetadata, Section, ISection, File, IFile, User, Administrator, Educator } from '../../models';

@Injectable({
    providedIn: ControlModule
})
export class FirebaseDatabase implements Database{
    
    //collection names
    private static readonly USERS: string = 'users';
    private static readonly MODULES: string = 'modules';
    private static readonly SECTIONS: string = 'sections';
    private static readonly FILES: string = 'files';

    //in document constants
    private static readonly ADMINISTRATOR: string = 'ADMINISTRATOR';
    private static readonly EDUCATOR: string = 'EDUCATOR';

    constructor(
        private sectionFactory: SectionFactory,
        private validator: Validator,
        private firestore: AngularFirestore
    ){}

    async getUser(id: string): Promise<User>{
        const user: any = await this.firestore.collection(FirebaseDatabase.USERS).doc(id).get().toPromise();
        if(!user)
            throw new Error(DatabaseError.USER_NOT_FOUND);
        else if(user.type === FirebaseDatabase.ADMINISTRATOR)
            return new Administrator(
                user.id, 
                user.imageUrl, 
                user.name, 
                user.lastname, 
                user.email
            );
        else if(user.type === FirebaseDatabase.EDUCATOR)
            return new Educator(
                user.id,
                user.imageUrl,
                user.name,
                user.lastname,
                user.email,
                user.phone,
                user.joined
            );
        else
            throw new Error(DatabaseError.UNKNOWN_USER_TYPE);
    }

    async getModule(id: string): Promise<Module>{ throw new Error('Not impemented yet'); }
    async getModules(): Promise<Module[]>{ throw new Error('Not impemented yet'); }

    async addModule(module: IModule): Promise<Module>{
        this.validator.validateIModule(module);
        const id: string = this.firestore.createId();
        const module_: Module = new Module(
            id,
            module.name,
            module.$imageUrl,
            module.publisherId,
            module.publisherName,
            module.publisherLastname,
            module.recommendedAge,
            module.objectives,
            module.requirements,
            module.disciplines
        );
        this.firestore.collection(FirebaseDatabase.MODULES).doc(id).set(module_);
        return module_;
    }
    
    async updateModule(id: string, module: IModule): Promise<Module>{ throw new Error('Not impemented yet'); }
    async deleteModule(id: string): Promise<Module>{ throw new Error('Not impemented yet'); }
    async getDisciplineMetadata(): Promise<DisciplineMetadata>{ throw new Error('Not impemented yet'); }
    async getSections(moduleId: string): Promise<Section[]>{ throw new Error('Not impemented yet'); }
    async addSection(moduleId: string, section: ISection): Promise<Section>{ throw new Error('Not impemented yet'); }
    async updateSection(moduleId: string, sectionId: string, section: ISection): Promise<Section>{ throw new Error('Not impemented yet'); }
    async deleteSection(moduleId: string, sectionId: string): Promise<Section>{ throw new Error('Not impemented yet'); }
    async getFiles(moduleId: string, sectionId: string): Promise<File[]>{ throw new Error('Not impemented yet'); }
    async addFile(moduleId: string, sectionId: string, file: IFile): Promise<File>{ throw new Error('Not impemented yet'); }
    async deleteFile(moduleId: string, sectionId: string, fileId: string): Promise<File>{ throw new Error('Not impemented yet'); }
};