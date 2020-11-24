import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentData, QuerySnapshot } from '@angular/fire/firestore';
import ControlModule from '@src/app/modules/control/control.module.tns';
import { Database, DatabaseError } from '../Database.service';   
import { Factory } from '../factory/Factory.service';
import { Validator } from '../validation/Validator.service';
import { Event, Module, IModule, DisciplineMetadata, Section, ISection, File, IFile, User, Administrator, Educator, IDisciplineMetadata, IUser, Implementable, IImplementable, EducatorRequest, EducatorRequestState, Evaluation, IEducatorRequest, IEvaluation, IImplementation, Implementation } from '../../../models';

@Injectable({
    providedIn: ControlModule
})
export class FirebaseDatabase implements Database{
    
    //collection names
    private static readonly CONSTANTS = 'constants';
    private static readonly USERS: string = 'users';
    private static readonly IMPLEMENTABLES: string = 'implementables';
    private static readonly SECTIONS: string = 'sections';
    private static readonly FILES: string = 'files';

    //constant document ids
    private static readonly DISCIPLINE_METADATA = 'DISCIPLINE_METADATA';

    //implementable tags
    private static readonly IMPLEMENTABLE_TAG_KEY = "tag";
    private static readonly EVENT_TAG = "EVENT";
    private static readonly MODULE_TAG = "MODULE";

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

    addEducatorRequest: (request: IEducatorRequest) => Promise<EducatorRequest>;
    getEducatorRequests: () => Promise<EducatorRequest[]>;
    updateEducatorRequestState: (id: string, state: EducatorRequestState) => Promise<EducatorRequest>;

    async getModules(): Promise<Module[]>{
        const modules: Module[] = [];
        const documents: QuerySnapshot<DocumentData> = await this.firestore
            .collection(FirebaseDatabase.IMPLEMENTABLES, ref => ref.where(
                FirebaseDatabase.IMPLEMENTABLE_TAG_KEY, '==', FirebaseDatabase.MODULE_TAG
            ))
            .get().toPromise();
        documents.forEach(document => {
            const response: any = document.data();
            const module: Module = <Module>this.factory.getImplementable(response.id, response as IModule);
            modules.push(module);
        });
        return modules;
    }

    async getEvents(): Promise<Event[]>{
        const events: Event[] = [];
        const documents: QuerySnapshot<DocumentData> = await this.firestore
            .collection(FirebaseDatabase.IMPLEMENTABLES, ref => ref.where(
                FirebaseDatabase.IMPLEMENTABLE_TAG_KEY, '==', FirebaseDatabase.EVENT_TAG
            ))
            .get().toPromise();
        documents.forEach(document => {
            const response: any = document.data();
            const event: Event = <Event>this.factory.getImplementable(response.id, response as IModule);
            events.push(event);
        });
        return events;
    }

    async getImplementable(id: string): Promise<Implementable>{
        const document: DocumentData = await this.firestore
            .collection(FirebaseDatabase.IMPLEMENTABLES)
            .doc(id)
            .get().toPromise();
        const implementable: any = document.data();
        if(!implementable)
            throw new Error(DatabaseError.IMPLEMENTABLE_NOT_FOUND);
        else
            return this.factory.getImplementable(id, implementable as IImplementable);
    }

    private getImplementableTag(implementable: Implementable){
        if(implementable instanceof Module)
            return FirebaseDatabase.MODULE_TAG;
        else if(implementable instanceof Event)
            return FirebaseDatabase.EVENT_TAG;
        else
            throw new Error(DatabaseError.UNKNOWN_IMPLEMENTABLE_TYPE)
    }

    async addImplementable(implementable: IImplementable): Promise<Implementable>{
        this.validator.validateIImplementable(implementable);
        const id: string = this.firestore.createId();
        const implementable_: Implementable = this.factory.getImplementable(id, implementable);
        implementable['id'] = id;
        implementable[FirebaseDatabase.IMPLEMENTABLE_TAG_KEY] = this.getImplementableTag(implementable_);
        await this.firestore
            .collection(FirebaseDatabase.IMPLEMENTABLES)
            .doc(id)
            .set(implementable);
        return implementable_;
    }
    
    async updateImplementable(id: string, implementable: IImplementable): Promise<Implementable>{
        this.validator.validateIImplementable(implementable);
        await this.firestore
            .collection(FirebaseDatabase.IMPLEMENTABLES)
            .doc(id)
            .update(implementable);
        return this.factory.getImplementable(id, implementable);
    }

    async deleteImplementable(id: string): Promise<Implementable>{
        const implementable: Implementable = await this.getImplementable(id);
        await this.firestore
            .collection(FirebaseDatabase.IMPLEMENTABLES)
            .doc(id)
            .delete();
        return implementable;
    }

    async getSections(implementableId: string): Promise<Section[]>{
        const sections: Section[] = [];
        const documents: QuerySnapshot<DocumentData> = await this.firestore
            .collection(FirebaseDatabase.IMPLEMENTABLES)
            .doc(implementableId)
            .collection(FirebaseDatabase.SECTIONS, ref => ref.orderBy('index'))
            .get().toPromise();
        documents.forEach(document => {
            const response: any = document.data();
            const section: Section = this.factory.getSection(response.id, response as ISection);
            sections.push(section);
        });
        return sections;
    }

    private async getSection(implementableId: string, sectionId: string): Promise<Section>{
        const document: DocumentData = await this.firestore
            .collection(FirebaseDatabase.IMPLEMENTABLES)
            .doc(implementableId)
            .collection(FirebaseDatabase.SECTIONS)
            .doc(sectionId)
            .get().toPromise();
        const section: any = document.data();
        if(!section)
            throw new Error(DatabaseError.SECTION_NOT_FOUND);
        else
            return this.factory.getSection(sectionId, section as ISection);
    }

    async addSection(implementableId: string, section: ISection): Promise<Section>{
        this.validator.validateISection(section);
        const id: string = this.firestore.createId();
        section['id'] = id;
        await this.firestore
            .collection(FirebaseDatabase.IMPLEMENTABLES)
            .doc(implementableId)
            .collection(FirebaseDatabase.SECTIONS)
            .doc(id)
            .set(section);
        return this.factory.getSection(id, section);
    }
    
    async updateSection(implementableId: string, sectionId: string, section: ISection): Promise<Section>{
        this.validator.validateISection(section);
        await this.firestore
            .collection(FirebaseDatabase.IMPLEMENTABLES)
            .doc(implementableId)
            .collection(FirebaseDatabase.SECTIONS)
            .doc(sectionId)
            .update(section);
        return this.factory.getSection(sectionId, section);
    }

    async deleteSection(implementableId: string, sectionId: string): Promise<Section>{
        const section: Section = await this.getSection(implementableId, sectionId);
        await this.firestore
            .collection(FirebaseDatabase.IMPLEMENTABLES)
            .doc(implementableId)
            .collection(FirebaseDatabase.SECTIONS)
            .doc(sectionId)
            .delete();
        return section;
    }
    
    async getFiles(implementableId: string, sectionId: string): Promise<File[]>{
        const files: File[] = [];
        const documents: QuerySnapshot<DocumentData> = await this.firestore
            .collection(FirebaseDatabase.IMPLEMENTABLES)
            .doc(implementableId)
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

    async getFile(implementableId: string, sectionId: string, fileId: string): Promise<File>{
        const document: DocumentData = await this.firestore
            .collection(FirebaseDatabase.IMPLEMENTABLES)
            .doc(implementableId)
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

    async addFile(implementableId: string, sectionId: string, file: IFile): Promise<File>{
        this.validator.validateIFile(file);
        const id: string = this.firestore.createId();
        file['id'] = id;
        await this.firestore
            .collection(FirebaseDatabase.IMPLEMENTABLES)
            .doc(implementableId)
            .collection(FirebaseDatabase.SECTIONS)
            .doc(sectionId)
            .collection(FirebaseDatabase.FILES)
            .doc(id)
            .set(file);
        return this.factory.getFile(id, file);
    }

    async deleteFile(implementableId: string, sectionId: string, fileId: string): Promise<File>{
        const file: File = await this.getFile(implementableId, sectionId, fileId);
        await this.firestore
            .collection(FirebaseDatabase.IMPLEMENTABLES)
            .doc(implementableId)
            .collection(FirebaseDatabase.SECTIONS)
            .doc(sectionId)
            .collection(FirebaseDatabase.FILES)
            .doc(fileId)
            .delete();
        return file;
    }

    getImplementationsByUser: (completed: boolean, userId: string) => Promise<Implementation[]>;
    getImplementationsByImplementable: (completed: boolean, implementableId: string) => Promise<Implementation[]>;
    addImplementation: (implementation: IImplementation) => Promise<Implementation>;
    updateImplementation: (id: string, implementation: IImplementation) => Promise<Implementation>;
    deleteImplementation: (id: string) => Promise<Implementation>;
    completeImplementation: (id: string) => Promise<Implementation>;
    getEvaluations: (implementationId: string) => Promise<Evaluation[]>;
    addEvaluation: (implementationId: string, evaluation: IEvaluation) => Promise<Evaluation>;
    updateEvaluation: (implementationId: string, evaluationId: string, evaluation: IEvaluation) => Promise<Evaluation>;
    deleteEvaluation: (implementationId: string, evaluationId: string) => Promise<Evaluation>;
    getEvidence: (implementationId: string) => Promise<File[]>;
    addEvidence: (implementationId: string, evidence: IFile) => Promise<File>;
    deleteEvidence: (implementationId: string, evidenceId: string) => Promise<File>;
};