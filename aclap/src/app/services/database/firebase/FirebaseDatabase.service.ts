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
    private static readonly REQUESTS: string = 'requests';
    private static readonly USERS: string = 'users';
    private static readonly IMPLEMENTABLES: string = 'implementables';
    private static readonly SECTIONS: string = 'sections';
    private static readonly FILES: string = 'files';
    private static readonly IMPLEMENTATIONS: string = 'implementations';
    private static readonly EVALUATIONS: string = 'evaluations';
    private static readonly EVIDENCE: string = 'evidence';

    //constant document ids
    private static readonly DISCIPLINE_METADATA = 'DISCIPLINE_METADATA';

    //implementable tags
    private static readonly IMPLEMENTABLE_TAG_KEY = 'tag';
    private static readonly EVENT_TAG = 'EVENT';
    private static readonly MODULE_TAG = 'MODULE';

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
        this.validator.validateIDisciplineMetadata(metadata);
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

    async addEducatorRequest(request: IEducatorRequest): Promise<EducatorRequest>{
        this.validator.validateIEducatorRequest(request);
        
        const id: string = this.firestore.createId();
        const state: EducatorRequestState = EducatorRequestState.PENDING;
        const issued: Date = new Date();

        request['id'] = id;
        request['state'] = state;
        request['issued'] = issued;

        await this.firestore
            .collection(FirebaseDatabase.REQUESTS)
            .doc(id)
            .set(request);

        return this.factory.getEducatorRequest(id, issued, state, request);
    }
    
    async getEducatorRequests(): Promise<EducatorRequest[]>{
        const requests: EducatorRequest[] = [];
        const documents: QuerySnapshot<DocumentData> = await this.firestore
            .collection(FirebaseDatabase.REQUESTS, ref => ref
                .where('state', '==', EducatorRequestState.PENDING)
            )
            .get().toPromise();
        documents.forEach(document =>{
            const response: any = document.data();
            const request: EducatorRequest = this.factory.getEducatorRequest(response.id, response.issued, response.state, response as IEducatorRequest);
            requests.push(request);
        });
        return requests;
    }

    private async getEducatorRequest(id: string): Promise<EducatorRequest>{
        const document: DocumentData = await this.firestore
            .collection(FirebaseDatabase.REQUESTS)
            .doc(id)
            .get().toPromise();
        const request: any = document.data();
        if(!request)
            throw new Error(DatabaseError.EDUCATOR_REQUEST_NOT_FOUND);
        else
            return this.factory.getEducatorRequest(request.id, request.issued, request.state, request as IEducatorRequest);
    }

    async updateEducatorRequestState(id: string, state: EducatorRequestState): Promise<EducatorRequest>{
        const request: EducatorRequest = await this.getEducatorRequest(id);
        const state_: object = { 'state': state };
        await this.firestore
            .collection(FirebaseDatabase.REQUESTS)
            .doc(id)
            .update(state_);
        request.state = state; 
        return request;
    }

    async getModules(): Promise<Module[]>{
        const modules: Module[] = [];
        const documents: QuerySnapshot<DocumentData> = await this.firestore
            .collection(FirebaseDatabase.IMPLEMENTABLES, ref => ref
                .where(FirebaseDatabase.IMPLEMENTABLE_TAG_KEY, '==', FirebaseDatabase.MODULE_TAG)
            )
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
            .collection(FirebaseDatabase.IMPLEMENTABLES, ref => ref
                .where(FirebaseDatabase.IMPLEMENTABLE_TAG_KEY, '==', FirebaseDatabase.EVENT_TAG)
            )
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
            .collection(FirebaseDatabase.SECTIONS, ref => ref
                .orderBy('index')
            )
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

    async getImplementationsByUser(completed: boolean, userId: string): Promise<Implementation[]>{
        const implementations: Implementation[] = [];
        const documents: QuerySnapshot<DocumentData> = await this.firestore
            .collection(FirebaseDatabase.IMPLEMENTATIONS, ref => ref
                .where('deleted', '==', true)
                .where('completed', '==', completed)
                .where('educatorId', '==', userId)
            )
            .get().toPromise();
        documents.forEach(document => {
            const response: any = document.data();
            const implementation: Implementation = this.factory.getImplementation(response.id, response.deleted, response.completed, response as IImplementation);
            implementations.push(implementation);
        });
        return implementations;
    }

    async getImplementationsByImplementable(completed: boolean, implementableId: string): Promise<Implementation[]>{
        const implementations: Implementation[] = [];
        const documents: QuerySnapshot<DocumentData> = await this.firestore
            .collection(FirebaseDatabase.IMPLEMENTATIONS, ref => ref
                .where('completed', '==', completed)
                .where('implementableId', '==', implementableId)
            )
            .get().toPromise();
        documents.forEach(document => {
            const response: any = document.data();
            const implementation: Implementation = this.factory.getImplementation(response.id, response.deleted, response.completed, response as IImplementation);
            implementations.push(implementation);
        });
        return implementations;
    }
    
    async addImplementation(implementation: IImplementation): Promise<Implementation>{
        this.validator.validateIImplementation(implementation);
        const id: string = this.firestore.createId();
        const completed: boolean = false;
        const deleted: boolean = false;

        implementation['id'] = id;
        implementation['completed'] = completed;
        implementation['deleted'] = deleted;
        await this.firestore
            .collection(FirebaseDatabase.IMPLEMENTATIONS)
            .doc(id)
            .set(implementation);

        return this.factory.getImplementation(id, deleted, completed, implementation);
    }
    
    private async getImplementation(id: string): Promise<Implementation>{
        const document: DocumentData = await this.firestore
            .collection(FirebaseDatabase.IMPLEMENTATIONS, ref => ref
                .where('deleted', '==', false)
            )
            .doc(id)
            .get().toPromise();
        const implementation: any = document.data();
        if(!implementation)
            throw new Error(DatabaseError.IMPLEMENTATION_NOT_FOUND);
        else
            return this.factory.getImplementation(id, implementation.deleted, implementation.completed, implementation as IImplementation);
    }

    async updateImplementation(id: string, implementation: IImplementation): Promise<Implementation>{
        this.validator.validateIImplementation(implementation);
        const implementation_: Implementation = await this.getImplementation(id);
        if(implementation_.completed === true)
            throw new Error(DatabaseError.IMPLEMENTATION_IS_COMPLETE)
        await this.firestore
            .collection(FirebaseDatabase.IMPLEMENTATIONS)
            .doc(id)
            .update(implementation);
        return this.factory.getImplementation(id, implementation_.deleted, implementation_.completed, implementation);
    }
    
    async deleteImplementation(id: string): Promise<Implementation>{
        const implementation: Implementation = await this.getImplementation(id);
        implementation.deleted = true;
        await this.firestore
            .collection(FirebaseDatabase.IMPLEMENTATIONS)
            .doc(id)
            .update({ 'deleted': true });
        return implementation;
    }
    
    async completeImplementation(id: string): Promise<Implementation>{
        const implementation: Implementation = await this.getImplementation(id);
        implementation.completed = true;
        await this.firestore
            .collection(FirebaseDatabase.IMPLEMENTATIONS)
            .doc(id)
            .update({ 'completed': true });
        return implementation;
    }
    
    async getEvaluations(implementationId: string): Promise<Evaluation[]>{
        const evaluations: Evaluation[] = [];
        const documents: QuerySnapshot<DocumentData> = await this.firestore
            .collection(FirebaseDatabase.IMPLEMENTATIONS)
            .doc(implementationId)
            .collection(FirebaseDatabase.EVALUATIONS)
            .get().toPromise();
        documents.forEach(document => {
            const response: any = document.data();
            const evaluation: Evaluation = this.factory.getEvaluation(response.id, response as IEvaluation);
            evaluations.push(evaluation);
        });
        return evaluations;
    }
    
    async addEvaluation(implementationId: string, evaluation: IEvaluation): Promise<Evaluation>{
        this.validator.validateIEvaluation(evaluation);
        const id: string = this.firestore.createId();
        evaluation['id'] = id;
        await this.firestore
            .collection(FirebaseDatabase.IMPLEMENTATIONS)
            .doc(implementationId)
            .collection(FirebaseDatabase.EVALUATIONS)
            .doc(id)
            .set(evaluation);
        return this.factory.getEvaluation(id, evaluation);
    }
    
    async updateEvaluation(implementationId: string, evaluationId: string, evaluation: IEvaluation): Promise<Evaluation>{
        this.validator.validateIEvaluation(evaluation);
        await this.firestore
            .collection(FirebaseDatabase.IMPLEMENTATIONS)
            .doc(implementationId)
            .collection(FirebaseDatabase.EVALUATIONS)
            .doc(evaluationId)
            .update(evaluation);
        return this.factory.getEvaluation(evaluationId, evaluation);
    }
    
    private async getEvaluation(implementationId: string, evaluationId: string): Promise<Evaluation>{
        const document: DocumentData = await this.firestore
            .collection(FirebaseDatabase.IMPLEMENTATIONS)
            .doc(implementationId)
            .collection(FirebaseDatabase.EVALUATIONS)
            .doc(evaluationId)
            .get().toPromise();
        const evaluation: any = document.data();
        if(!evaluation)
            throw new Error(DatabaseError.EVALUATION_NOT_FOUND);
        else
            return this.factory.getEvaluation(evaluationId, evaluation as IEvaluation);
    }

    async deleteEvaluation(implementationId: string, evaluationId: string): Promise<Evaluation>{
        const evaluation: Evaluation = await this.getEvaluation(implementationId, evaluationId);
        await this.firestore
            .collection(FirebaseDatabase.IMPLEMENTATIONS)
            .doc(implementationId)
            .collection(FirebaseDatabase.EVALUATIONS)
            .doc(evaluationId)
            .delete();
        return evaluation;
    }
    
    async getEvidence(implementationId: string): Promise<File[]>{
        const evidence: File[] = [];
        const documents: QuerySnapshot<DocumentData> = await this.firestore
            .collection(FirebaseDatabase.IMPLEMENTATIONS)
            .doc(implementationId)
            .collection(FirebaseDatabase.EVIDENCE)
            .get().toPromise();
        documents.forEach(document => {
            const response: any = document.data();
            const file: File = this.factory.getFile(response.id, response as IFile);
            evidence.push(file);
        });
        return evidence;
    }
    
    async addEvidence(implementationId: string, evidence: IFile): Promise<File>{
        this.validator.validateIFile(evidence);
        const id: string = this.firestore.createId();
        evidence['id'] = id;
        await this.firestore
            .collection(FirebaseDatabase.IMPLEMENTATIONS)
            .doc(implementationId)
            .collection(FirebaseDatabase.EVIDENCE)
            .doc(id)
            .set(evidence);
        return this.factory.getFile(id, evidence);
    }

    private async getEvidenceFile(implementationId: string, evidenceId: string): Promise<File>{
        const document: DocumentData = await this.firestore
            .collection(FirebaseDatabase.IMPLEMENTATIONS)
            .doc(implementationId)
            .collection(FirebaseDatabase.EVIDENCE)
            .doc(evidenceId)
            .get().toPromise();
        const evidence: any = document.data();
        if(!evidence)
            throw new Error(DatabaseError.EVIDENCE_NOT_FOUND);
        else
            return this.factory.getFile(evidenceId, evidence as IFile);
    }

    async deleteEvidence(implementationId: string, evidenceId: string): Promise<File>{
        const evidence: File = await this.getEvidenceFile(implementationId, evidenceId);
        await this.firestore
            .collection(FirebaseDatabase.IMPLEMENTATIONS)
            .doc(implementationId)
            .collection(FirebaseDatabase.EVIDENCE)
            .doc(evidenceId)
            .delete();
        return evidence;
    }
};