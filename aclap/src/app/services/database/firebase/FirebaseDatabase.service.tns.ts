import { Injectable } from '@angular/core';
import ControlModule from '@src/app/modules/control/control.module';
import { Database, DatabaseError } from '../Database.service';   
import { Factory } from '../factory/Factory.service';
import { Validator } from '../validation/Validator.service';
import { Event, Module, IModule, DisciplineMetadata, Section, ISection, File, IFile, User, Administrator, Educator, IDisciplineMetadata, IUser, Implementable, IImplementable, EducatorRequest, EducatorRequestState, IEducatorRequest, IImplementation, Implementation, Question, IQuestion, Answer, IAnswer, Score, Ally, IAlly, IEvent } from '../../../models';
import { firestore } from '@nativescript/firebase';

@Injectable({
    providedIn: ControlModule
})
export class FirebaseDatabase implements Database{
    
    //collection names
    private static readonly REQUESTS: string = 'requests';
    private static readonly USERS: string = 'users';
    private static readonly PASSWORD_RESETS: string = 'password_resets';
    private static readonly IMPLEMENTABLES: string = 'implementables';
    private static readonly SECTIONS: string = 'sections';
    private static readonly FILES: string = 'files';
    private static readonly QUESTIONS: string = 'questions';
    private static readonly IMPLEMENTATIONS: string = 'implementations';
    private static readonly ANSWERS: string = 'answers';
    private static readonly EVIDENCE: string = 'evidence';
    private static readonly ALLIES: string = 'allies';

    //implementable tags
    private static readonly IMPLEMENTABLE_TAG_KEY = 'tag';
    private static readonly EVENT_TAG = 'EVENT';
    private static readonly MODULE_TAG = 'MODULE';

    constructor(
        private factory: Factory,
        private validator: Validator
    ){}

    async getDisciplineMetadata(): Promise<DisciplineMetadata>{
        throw new Error('not implemented');
    }

    async setDisciplineMetadata(metadata: IDisciplineMetadata): Promise<DisciplineMetadata>{
        throw new Error('not implemented');
    }
    
    async addUser(id: string, user: IUser): Promise<User>{
        throw new Error('not implemented');
    }

    async getUser(id: string): Promise<User>{
        const document: firestore.DocumentSnapshot = await firestore
            .collection(FirebaseDatabase.USERS)
            .doc(id)
            .get();
        const user: any = document.data();
        if(!user)
            throw new Error(DatabaseError.USER_NOT_FOUND)
        else
            return this.factory.getUser(id, user as IUser);
    }

    async addPasswordResetRequest(email: string): Promise<string>{
        await firestore
            .collection(FirebaseDatabase.PASSWORD_RESETS)
            .doc()
            .set({email: email});
        return email;
    }

    private async checkRequestIsNotPending(email: string): Promise<void>{
        const query: firestore.QuerySnapshot = await firestore
            .collection(FirebaseDatabase.REQUESTS)
            .where('state', '==', EducatorRequestState.PENDING)
            .where('email', '==', email)
            .get();
        if(query.docs.length != 0)
            throw new Error(DatabaseError.EDUCATOR_REQUEST_ALREADY_PENDING);
    }

    private async checkUserDoesntExist(email: string): Promise<void>{
        const query: firestore.QuerySnapshot = await firestore
            .collection(FirebaseDatabase.USERS)
            .where('email', '==', email)
            .get();
        if(query.docs.length != 0)
            throw new Error(DatabaseError.USER_ALREADY_EXISTS);
    }

    async addEducatorRequest(request: IEducatorRequest): Promise<EducatorRequest>{
        this.validator.validateIEducatorRequest(request);
        await this.checkRequestIsNotPending(request.email);
        await this.checkUserDoesntExist(request.email);

        const state: EducatorRequestState = EducatorRequestState.PENDING;
        const issued: Date = new Date();

        request['state'] = state;
        request['issued'] = issued;

        const document: firestore.DocumentReference = await firestore
            .collection(FirebaseDatabase.REQUESTS)
            .add(request);
        
        return this.factory.getEducatorRequest(document.id, issued, state, request);
    }
    
    async getEducatorRequests(): Promise<EducatorRequest[]>{
        const requests: EducatorRequest[] = [];
        const query: firestore.QuerySnapshot = await firestore
            .collection(FirebaseDatabase.REQUESTS)
            .where('state', '==', EducatorRequestState.PENDING)
            .get();
        query.docs.forEach(document =>{
            const response: any = document.data();
            const request: EducatorRequest = this.factory.getEducatorRequest(document.id, response.issued, response.state, response as IEducatorRequest);
            requests.push(request);
        });
        return requests;
    }

    private async getEducatorRequest(id: string): Promise<EducatorRequest>{
        const document: firestore.DocumentData = await firestore
            .collection(FirebaseDatabase.REQUESTS)
            .doc(id)
            .get();
        const request: any = document.data();
        if(!request)
            throw new Error(DatabaseError.EDUCATOR_REQUEST_NOT_FOUND);
        else
            return this.factory.getEducatorRequest(document.id, request.issued, request.state, request as IEducatorRequest);
    }

    async updateEducatorRequestState(id: string, state: EducatorRequestState): Promise<EducatorRequest>{
        const request: EducatorRequest = await this.getEducatorRequest(id);
        const state_: object = { 'state': state };
        await firestore
            .collection(FirebaseDatabase.REQUESTS)
            .doc(id)
            .update(state_);
        request.state = state; 
        return request;
    }

    async getModules(): Promise<Module[]>{
        const modules: Module[] = [];
        const query: firestore.QuerySnapshot = await firestore
            .collection(FirebaseDatabase.IMPLEMENTABLES)
            .where(FirebaseDatabase.IMPLEMENTABLE_TAG_KEY, '==', FirebaseDatabase.MODULE_TAG)
            .get();
        query.docs.forEach(document => {
            const response: any = document.data();
            const module: Module = <Module>this.factory.getImplementable(document.id, response as IModule);
            modules.push(module);
        });
        return modules;
    }

    async getEvents(): Promise<Event[]>{
        const events: Event[] = [];
        const query: firestore.QuerySnapshot = await firestore
            .collection(FirebaseDatabase.IMPLEMENTABLES)
            .where(FirebaseDatabase.IMPLEMENTABLE_TAG_KEY, '==', FirebaseDatabase.EVENT_TAG)
            .get();
        query.docs.forEach(document => {
            const response: any = document.data();
            const event: Event = <Event>this.factory.getImplementable(document.id, response as IEvent);
            events.push(event);
        });
        return events;
    }

    async getImplementable(id: string): Promise<Implementable>{
        const document: firestore.DocumentData = await firestore
            .collection(FirebaseDatabase.IMPLEMENTABLES)
            .doc(id)
            .get();
        const implementable: any = document.data();
        if(!implementable)
            throw new Error(DatabaseError.IMPLEMENTABLE_NOT_FOUND);
        else
            return this.factory.getImplementable(id, implementable as IImplementable);
    }

    async addImplementable(implementable: IImplementable): Promise<Implementable>{
        throw new Error('not implemented');
    }
    
    async updateImplementable(id: string, implementable: IImplementable): Promise<Implementable>{
        throw new Error('not implemented');
    }

    async deleteImplementable(id: string): Promise<Implementable>{
        throw new Error('not implemented');
    }

    async getSections(implementableId: string): Promise<Section[]>{
        const sections: Section[] = [];
        const query: firestore.QuerySnapshot = await firestore
            .collection(FirebaseDatabase.IMPLEMENTABLES)
            .doc(implementableId)
            .collection(FirebaseDatabase.SECTIONS)
            .orderBy('index', 'asc')
            .get();
        query.docs.forEach(document  => {
            const response: any = document.data();
            const section: Section = this.factory.getSection(document.id, response as ISection);
            sections.push(section);
        });
        return sections;
    }

    async addSection(implementableId: string, section: ISection): Promise<Section>{
        throw new Error('not implemented');
    }
    
    async updateSection(implementableId: string, sectionId: string, section: ISection): Promise<Section>{
        throw new Error('not implemented');
    }

    async deleteSection(implementableId: string, sectionId: string): Promise<Section>{
        throw new Error('not implemented');
    }
    
    async getFiles(implementableId: string): Promise<File[]>{
        const files: File[] = [];
        const query: firestore.QuerySnapshot = await firestore
            .collection(FirebaseDatabase.IMPLEMENTABLES)
            .doc(implementableId)
            .collection(FirebaseDatabase.FILES)
            .get();
        query.docs.forEach(document => {
            const response: any = document.data();
            const file: File = this.factory.getFile(document.id, response as IFile);
            files.push(file);
        });
        return files;
    }

    async addFile(implementableId: string, file: IFile): Promise<File>{
        throw new Error('not implemented');
    }

    async deleteFile(implementableId: string, fileId: string): Promise<File>{
        throw new Error('not implemented');
    }

    private getOptionsMap(obj: object): Map<Score, string>{
        const map: Map<Score, string> = new Map();
        for(let option in obj)
            map.set(option as Score, obj[option]);
        return map;
    }

    async getQuestions(implementableId: string): Promise<Question[]>{
        const questions: Question[] = [];
        const query: firestore.QuerySnapshot = await firestore
            .collection(FirebaseDatabase.IMPLEMENTABLES)
            .doc(implementableId)
            .collection(FirebaseDatabase.QUESTIONS)
            .get();
        query.docs.forEach(document => {
            const response: any = document.data();
            response.options = this.getOptionsMap(response.options);
            const question: Question = this.factory.getQuestion(document.id, response as IQuestion);
            questions.push(question);
        });
        return questions;
    }

    async addQuestion(implementableId: string, question: IQuestion): Promise<Question>{
        throw new Error('not implemented');
    }

    async updateQuestion(implementableId: string, questionId: string, question: IQuestion): Promise<Question>{
        throw new Error('not implemented');
    }

    async deleteQuestion(implementableId: string, questionId: string): Promise<Question>{
        throw new Error('not implemented');
    }

    async getImplementationsByUser(completed: boolean, userId: string): Promise<Implementation[]>{
        const implementations: Implementation[] = [];
        const query: firestore.QuerySnapshot = await firestore
            .collection(FirebaseDatabase.IMPLEMENTATIONS)
            .where('deleted', '==', false)
            .where('completed', '==', completed)
            .where('educatorId', '==', userId)
            .get();
        query.docs.forEach(document => {
            const response: any = document.data();
            const implementation: Implementation = this.factory.getImplementation(document.id, response.deleted, response.completed, response as IImplementation);
            implementations.push(implementation);
        });
        return implementations;
    }

    async getImplementationsByImplementable(completed: boolean, implementableId: string): Promise<Implementation[]>{
        throw new Error('not implemented');
    }

    async getImplementation(id: string): Promise<Implementation>{
        const document: firestore.DocumentData = await firestore
            .collection(FirebaseDatabase.IMPLEMENTATIONS)
            .doc(id)
            .get();
        const implementation: any = document.data();
        if(!implementation)
            throw new Error(DatabaseError.IMPLEMENTATION_NOT_FOUND);
        
        const implementation_: Implementation = this.factory.getImplementation(id, implementation.deleted, implementation.completed, implementation as IImplementation);
        if(implementation_.deleted == true)
            throw new Error(DatabaseError.IMPLEMENTATION_NOT_FOUND);
        return implementation_;
    }
    
    async addImplementation(implementation: IImplementation): Promise<Implementation>{
        this.validator.validateIImplementation(implementation);
        const completed: boolean = false;
        const deleted: boolean = false;

        implementation['completed'] = completed;
        implementation['deleted'] = deleted;
        const document: firestore.DocumentReference = await firestore
            .collection(FirebaseDatabase.IMPLEMENTATIONS)
            .add(implementation);

        return this.factory.getImplementation(document.id, deleted, completed, implementation);
    }

    async updateImplementation(id: string, implementation: IImplementation): Promise<Implementation>{
        this.validator.validateIImplementation(implementation);
        const implementation_: Implementation = await this.getImplementation(id);
        if(implementation_.completed === true)
            throw new Error(DatabaseError.IMPLEMENTATION_IS_COMPLETE)
        await firestore
            .collection(FirebaseDatabase.IMPLEMENTATIONS)
            .doc(id)
            .update(implementation);
        return this.factory.getImplementation(id, implementation_.deleted, implementation_.completed, implementation);
    }
    
    async deleteImplementation(id: string): Promise<Implementation>{
        const implementation: Implementation = await this.getImplementation(id);
        implementation.deleted = true;
        await firestore
            .collection(FirebaseDatabase.IMPLEMENTATIONS)
            .doc(id)
            .update({ deleted: true });
        return implementation;
    }
    
    async completeImplementation(id: string): Promise<Implementation>{
        const implementation: Implementation = await this.getImplementation(id);
        implementation.completed = true;
        await firestore
            .collection(FirebaseDatabase.IMPLEMENTATIONS)
            .doc(id)
            .update({ completed: true });
        return implementation;
    }
    
    async getAnswers(implementationId: string): Promise<Answer[]>{
        const answers: Answer[] = [];
        const query: firestore.QuerySnapshot = await firestore
            .collection(FirebaseDatabase.IMPLEMENTATIONS)
            .doc(implementationId)
            .collection(FirebaseDatabase.ANSWERS)
            .get();
        query.docs.forEach(document => {
            const response: any = document.data();
            const answer: Answer = this.factory.getAnswer(document.id, response as IAnswer);
            answers.push(answer);
        });
        return answers;
    }

    private async getAnswer(implementationId: string, answerId: string): Promise<Answer>{
        const document: firestore.DocumentData = await firestore
            .collection(FirebaseDatabase.IMPLEMENTATIONS)
            .doc(implementationId)
            .collection(FirebaseDatabase.ANSWERS)
            .doc(answerId)
            .get();
        const answer: any = document.data();
        if(!answer)
            throw new Error(DatabaseError.ANSWER_NOT_FOUND);
        else
            return this.factory.getAnswer(answerId, answer as IAnswer);
    }

    async addAnswer(implementationId: string, userId: string, answer: IAnswer): Promise<Answer>{
        this.validator.validateIAnswer(answer);
        answer['educatorId'] = userId;
        const document: firestore.DocumentReference = await firestore
            .collection(FirebaseDatabase.IMPLEMENTATIONS)
            .doc(implementationId)
            .collection(FirebaseDatabase.ANSWERS)
            .add(answer);
        return this.factory.getAnswer(document.id, answer);
    }

    async updateAnswer(implementationId: string, answerId: string, answer: IAnswer): Promise<Answer>{
        this.validator.validateIAnswer(answer);
        await firestore
            .collection(FirebaseDatabase.IMPLEMENTATIONS)
            .doc(implementationId)
            .collection(FirebaseDatabase.ANSWERS)
            .doc(answerId)
            .update(answer);
        return this.factory.getAnswer(answerId, answer);
    }

    async deleteAnswer(implementationId: string, answerId: string): Promise<Answer>{
        const answer: Answer = await this.getAnswer(implementationId, answerId);
        await firestore
            .collection(FirebaseDatabase.IMPLEMENTATIONS)
            .doc(implementationId)
            .collection(FirebaseDatabase.ANSWERS)
            .doc(answerId)
            .delete();
        return answer;
    }
    
    async getEvidence(implementationId: string): Promise<File[]>{
        const evidence: File[] = [];
        const query: firestore.QuerySnapshot = await firestore
            .collection(FirebaseDatabase.IMPLEMENTATIONS)
            .doc(implementationId)
            .collection(FirebaseDatabase.EVIDENCE)
            .get();
        query.docs.forEach(document => {
            const response: any = document.data();
            const file: File = this.factory.getFile(document.id, response as IFile);
            evidence.push(file);
        });
        return evidence;
    }
    
    async addEvidence(implementationId: string, userId: string, evidence: IFile): Promise<File>{
        this.validator.validateIFile(evidence);
        evidence['educatorId'] = userId;
        const document: firestore.DocumentReference = await firestore
            .collection(FirebaseDatabase.IMPLEMENTATIONS)
            .doc(implementationId)
            .collection(FirebaseDatabase.EVIDENCE)
            .add(evidence);
        return this.factory.getFile(document.id, evidence);
    }

    private async getEvidenceFile(implementationId: string, evidenceId: string): Promise<File>{
        const document: firestore.DocumentData = await firestore
            .collection(FirebaseDatabase.IMPLEMENTATIONS)
            .doc(implementationId)
            .collection(FirebaseDatabase.EVIDENCE)
            .doc(evidenceId)
            .get();
        const evidence: any = document.data();
        if(!evidence)
            throw new Error(DatabaseError.EVIDENCE_NOT_FOUND);
        else
            return this.factory.getFile(evidenceId, evidence as IFile);
    }

    async deleteEvidence(implementationId: string, evidenceId: string): Promise<File>{
        const evidence: File = await this.getEvidenceFile(implementationId, evidenceId);
        await firestore
            .collection(FirebaseDatabase.IMPLEMENTATIONS)
            .doc(implementationId)
            .collection(FirebaseDatabase.EVIDENCE)
            .doc(evidenceId)
            .delete();
        return evidence;
    }

    async getAllies(): Promise<Ally[]>{
        const allies: Ally[] = [];
        const query: firestore.QuerySnapshot = await firestore
            .collection(FirebaseDatabase.ALLIES)
            .get();
        query.docs.forEach(document => {
            const response: any = document.data();
            const ally: Ally = this.factory.getAlly(document.id, response as IAlly);
            allies.push(ally);
        });
        return allies;
    }

    async addAlly(ally: IAlly): Promise<Ally>{
        throw new Error('not implemented');
    }

    async updateAlly(id: string, ally: IAlly): Promise<Ally>{
        throw new Error('not implemented');
    }

    async deleteAlly(allyId: string): Promise<Ally>{
        throw new Error('not implemented');
    }
};