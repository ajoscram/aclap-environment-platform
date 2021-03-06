import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentData, QuerySnapshot } from '@angular/fire/firestore';
import ControlModule from '@src/app/modules/control/control.module';
import { Database, DatabaseError } from '../Database.service';   
import { Factory } from '../factory/Factory.service';
import { Validator } from '../validation/Validator.service';
import { Event, Module, IModule, DisciplineMetadata, Section, ISection, File, IFile, User, Administrator, Educator, IDisciplineMetadata, IUser, Implementable, IImplementable, EducatorRequest, EducatorRequestState, IEducatorRequest, IImplementation, Implementation, Question, IQuestion, Answer, IAnswer, Score, Ally, IAlly, IEvent } from '../../../models';

@Injectable({
    providedIn: ControlModule
})
export class FirebaseDatabase implements Database{
    
    //collection names
    private static readonly CONSTANTS = 'constants';
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
        metadata = this.factory.getIDisciplineMetadata(metadata);
        await this.firestore
            .collection(FirebaseDatabase.CONSTANTS)
            .doc(FirebaseDatabase.DISCIPLINE_METADATA)
            .set(metadata);
        return this.factory.getDisciplineMetadata(metadata);
    }
    
    async addUser(id: string, user: IUser): Promise<User>{
        this.validator.validateIUser(user);
        user = this.factory.getIUser(user);
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

    async addPasswordResetRequest(email: string): Promise<string>{
        const id: string = this.firestore.createId();
        await this.firestore
            .collection(FirebaseDatabase.PASSWORD_RESETS)
            .doc(id)
            .set({email: email});
        return email;
    }

    private async checkRequestIsNotPending(email: string): Promise<void>{
        const query: QuerySnapshot<DocumentData> = await this.firestore
        .collection(FirebaseDatabase.REQUESTS, ref => ref
            .where('state', '==', EducatorRequestState.PENDING)
            .where('email', '==', email)
        )
        .get().toPromise();
        if(query.docs.length != 0)
            throw new Error(DatabaseError.EDUCATOR_REQUEST_ALREADY_PENDING);
    }

    private async checkUserDoesntExist(email: string): Promise<void>{
        const query: QuerySnapshot<DocumentData> = await this.firestore
        .collection(FirebaseDatabase.USERS, ref => ref
            .where('email', '==', email)
        )
        .get().toPromise();
        if(query.docs.length != 0)
            throw new Error(DatabaseError.USER_ALREADY_EXISTS);
    }

    async addEducatorRequest(request: IEducatorRequest): Promise<EducatorRequest>{
        this.validator.validateIEducatorRequest(request);
        await this.checkRequestIsNotPending(request.email);
        await this.checkUserDoesntExist(request.email);
        
        request = this.factory.getIEducatorRequest(request);
        const id: string = this.firestore.createId();
        const state: EducatorRequestState = EducatorRequestState.PENDING;
        const issued: Date = new Date();

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
        const query: QuerySnapshot<DocumentData> = await this.firestore
            .collection(FirebaseDatabase.REQUESTS, ref => ref
                .where('state', '==', EducatorRequestState.PENDING)
            )
            .get().toPromise();
        query.docs.forEach(document =>{
            const response: any = document.data();
            const request: EducatorRequest = this.factory.getEducatorRequest(document.id, response.issued, response.state, response as IEducatorRequest);
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
            return this.factory.getEducatorRequest(document.id, request.issued, request.state, request as IEducatorRequest);
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
        const query: QuerySnapshot<DocumentData> = await this.firestore
            .collection(FirebaseDatabase.IMPLEMENTABLES, ref => ref
                .where(FirebaseDatabase.IMPLEMENTABLE_TAG_KEY, '==', FirebaseDatabase.MODULE_TAG)
            )
            .get().toPromise();
        query.docs.forEach(document => {
            const response: any = document.data();
            const module: Module = <Module>this.factory.getImplementable(document.id, response as IModule);
            modules.push(module);
        });
        return modules;
    }

    async getEvents(): Promise<Event[]>{
        const events: Event[] = [];
        const query: QuerySnapshot<DocumentData> = await this.firestore
            .collection(FirebaseDatabase.IMPLEMENTABLES, ref => ref
                .where(FirebaseDatabase.IMPLEMENTABLE_TAG_KEY, '==', FirebaseDatabase.EVENT_TAG)
            )
            .get().toPromise();
        query.docs.forEach(document => {
            const response: any = document.data();
            const event: Event = <Event>this.factory.getImplementable(document.id, response as IEvent);
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
        implementable = this.factory.getIImplementable(implementable);

        implementable[FirebaseDatabase.IMPLEMENTABLE_TAG_KEY] = this.getImplementableTag(implementable_);
        await this.firestore
            .collection(FirebaseDatabase.IMPLEMENTABLES)
            .doc(id)
            .set(implementable);
        return implementable_;
    }
    
    async updateImplementable(id: string, implementable: IImplementable): Promise<Implementable>{
        this.validator.validateIImplementable(implementable);
        implementable = this.factory.getIImplementable(implementable);
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
        const query: QuerySnapshot<DocumentData> = await this.firestore
            .collection(FirebaseDatabase.IMPLEMENTABLES)
            .doc(implementableId)
            .collection(FirebaseDatabase.SECTIONS, ref => ref
                .orderBy('index')
            )
            .get().toPromise();
        query.docs.forEach(document => {
            const response: any = document.data();
            const section: Section = this.factory.getSection(document.id, response as ISection);
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
        section = this.factory.getISection(section);
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
        section = this.factory.getISection(section);
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
    
    async getFiles(implementableId: string): Promise<File[]>{
        const files: File[] = [];
        const query: QuerySnapshot<DocumentData> = await this.firestore
            .collection(FirebaseDatabase.IMPLEMENTABLES)
            .doc(implementableId)
            .collection(FirebaseDatabase.FILES)
            .get().toPromise();
        query.docs.forEach(document => {
            const response: any = document.data();
            const file: File = this.factory.getFile(document.id, response as IFile);
            files.push(file);
        });
        return files;
    }

    private async getFile(implementableId: string, fileId: string): Promise<File>{
        const document: DocumentData = await this.firestore
            .collection(FirebaseDatabase.IMPLEMENTABLES)
            .doc(implementableId)
            .collection(FirebaseDatabase.FILES)
            .doc(fileId)
            .get().toPromise();
        const file: any = document.data();
        if(!file)
            throw new Error(DatabaseError.FILE_NOT_FOUND);
        else
            return this.factory.getFile(fileId, file as IFile);
    }

    async addFile(implementableId: string, file: IFile): Promise<File>{
        this.validator.validateIFile(file);
        const id: string = this.firestore.createId();
        file = this.factory.getIFile(file);
        await this.firestore
            .collection(FirebaseDatabase.IMPLEMENTABLES)
            .doc(implementableId)
            .collection(FirebaseDatabase.FILES)
            .doc(id)
            .set(file);
        return this.factory.getFile(id, file);
    }

    async deleteFile(implementableId: string, fileId: string): Promise<File>{
        const file: File = await this.getFile(implementableId, fileId);
        await this.firestore
            .collection(FirebaseDatabase.IMPLEMENTABLES)
            .doc(implementableId)
            .collection(FirebaseDatabase.FILES)
            .doc(fileId)
            .delete();
        return file;
    }

    private getOptionsMap(obj: object): Map<Score, string>{
        const map: Map<Score, string> = new Map();
        for(let option in obj)
            map.set(option as Score, obj[option]);
        return map;
    }

    async getQuestions(implementableId: string): Promise<Question[]>{
        const questions: Question[] = [];
        const query: QuerySnapshot<DocumentData> = await this.firestore
            .collection(FirebaseDatabase.IMPLEMENTABLES)
            .doc(implementableId)
            .collection(FirebaseDatabase.QUESTIONS)
            .get().toPromise();
        query.docs.forEach(document => {
            const response: any = document.data();
            response.options = this.getOptionsMap(response.options);
            const question: Question = this.factory.getQuestion(document.id, response as IQuestion);
            questions.push(question);
        });
        return questions;
    }

    private async getQuestion(implementableId: string, questionId: string): Promise<Question>{
        const document: DocumentData = await this.firestore
            .collection(FirebaseDatabase.IMPLEMENTABLES)
            .doc(implementableId)
            .collection(FirebaseDatabase.QUESTIONS)
            .doc(questionId)
            .get().toPromise();
        const question: any = document.data();
        if(!question)
            throw new Error(DatabaseError.QUESTION_NOT_FOUND);
        else{
            question.options = this.getOptionsMap(question.options);
            return this.factory.getQuestion(questionId, question as IQuestion);
        }
    }

    private getOptionsObject(map: Map<Score, string>): object{
        const obj: object = {}
        for(let score of map.keys())
            obj[score] = map.get(score)
        return obj;
    }

    async addQuestion(implementableId: string, question: IQuestion): Promise<Question>{
        this.validator.validateIQuestion(question);
        const id: string = this.firestore.createId();
        const options = this.getOptionsObject(question.options);
        await this.firestore
            .collection(FirebaseDatabase.IMPLEMENTABLES)
            .doc(implementableId)
            .collection(FirebaseDatabase.QUESTIONS)
            .doc(id)
            .set({
                question: question.question,
                options: options
            });
        return this.factory.getQuestion(id, question);
    }

    async updateQuestion(implementableId: string, questionId: string, question: IQuestion): Promise<Question>{
        this.validator.validateIQuestion(question);
        const options = this.getOptionsObject(question.options);
        await this.firestore
            .collection(FirebaseDatabase.IMPLEMENTABLES)
            .doc(implementableId)
            .collection(FirebaseDatabase.QUESTIONS)
            .doc(questionId)
            .update({
                question: question.question,
                options: options
            });
        return this.factory.getQuestion(questionId, question);
    }

    async deleteQuestion(implementableId: string, questionId: string): Promise<Question>{
        const question: Question = await this.getQuestion(implementableId, questionId);
        await this.firestore
            .collection(FirebaseDatabase.IMPLEMENTABLES)
            .doc(implementableId)
            .collection(FirebaseDatabase.QUESTIONS)
            .doc(questionId)
            .delete();
        return question;
    }

    async getImplementationsByUser(completed: boolean, userId: string): Promise<Implementation[]>{
        const implementations: Implementation[] = [];
        const query: QuerySnapshot<DocumentData> = await this.firestore
            .collection(FirebaseDatabase.IMPLEMENTATIONS, ref => ref
                .where('deleted', '==', false)
                .where('completed', '==', completed)
                .where('educatorId', '==', userId)
            )
            .get().toPromise();
        query.docs.forEach(document => {
            const response: any = document.data();
            const implementation: Implementation = this.factory.getImplementation(document.id, response.deleted, response.completed, response as IImplementation);
            implementations.push(implementation);
        });
        return implementations;
    }

    async getImplementationsByImplementable(completed: boolean, implementableId: string): Promise<Implementation[]>{
        const implementations: Implementation[] = [];
        const query: QuerySnapshot<DocumentData> = await this.firestore
            .collection(FirebaseDatabase.IMPLEMENTATIONS, ref => ref
                .where('completed', '==', completed)
                .where('implementableId', '==', implementableId)
            )
            .get().toPromise();
        query.docs.forEach(document => {
            const response: any = document.data();
            const implementation: Implementation = this.factory.getImplementation(document.id, response.deleted, response.completed, response as IImplementation);
            implementations.push(implementation);
        });
        return implementations;
    }

    async getImplementation(id: string): Promise<Implementation>{
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
    
    async addImplementation(implementation: IImplementation): Promise<Implementation>{
        this.validator.validateIImplementation(implementation);
        const id: string = this.firestore.createId();
        implementation = this.factory.getIImplementation(implementation);
        
        const completed: boolean = false;
        const deleted: boolean = false;

        implementation['completed'] = completed;
        implementation['deleted'] = deleted;
        await this.firestore
            .collection(FirebaseDatabase.IMPLEMENTATIONS)
            .doc(id)
            .set(implementation);

        return this.factory.getImplementation(id, deleted, completed, implementation);
    }

    async updateImplementation(id: string, implementation: IImplementation): Promise<Implementation>{
        this.validator.validateIImplementation(implementation);
        implementation = this.factory.getIImplementation(implementation);
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
            .update({ deleted: true });
        return implementation;
    }
    
    async completeImplementation(id: string): Promise<Implementation>{
        const implementation: Implementation = await this.getImplementation(id);
        implementation.completed = true;
        await this.firestore
            .collection(FirebaseDatabase.IMPLEMENTATIONS)
            .doc(id)
            .update({ completed: true });
        return implementation;
    }
    
    async getAnswers(implementationId: string): Promise<Answer[]>{
        const answers: Answer[] = [];
        const query: QuerySnapshot<DocumentData> = await this.firestore
            .collection(FirebaseDatabase.IMPLEMENTATIONS)
            .doc(implementationId)
            .collection(FirebaseDatabase.ANSWERS)
            .get().toPromise();
        query.docs.forEach(document => {
            const response: any = document.data();
            const answer: Answer = this.factory.getAnswer(document.id, response as IAnswer);
            answers.push(answer);
        });
        return answers;
    }

    private async getAnswer(implementationId: string, answerId: string): Promise<Answer>{
        const document: DocumentData = await this.firestore
            .collection(FirebaseDatabase.IMPLEMENTATIONS)
            .doc(implementationId)
            .collection(FirebaseDatabase.ANSWERS)
            .doc(answerId)
            .get().toPromise();
        const answer: any = document.data();
        if(!answer)
            throw new Error(DatabaseError.ANSWER_NOT_FOUND);
        else
            return this.factory.getAnswer(answerId, answer as IAnswer);
    }

    async addAnswer(implementationId: string, userId: string, answer: IAnswer): Promise<Answer>{
        this.validator.validateIAnswer(answer);
        const id: string = this.firestore.createId();
        answer = this.factory.getIAnswer(answer);
        answer['educatorId'] = userId;
        await this.firestore
            .collection(FirebaseDatabase.IMPLEMENTATIONS)
            .doc(implementationId)
            .collection(FirebaseDatabase.ANSWERS)
            .doc(id)
            .set(answer);
        return this.factory.getAnswer(id, answer);
    }

    async updateAnswer(implementationId: string, answerId: string, answer: IAnswer): Promise<Answer>{
        this.validator.validateIAnswer(answer);
        answer = this.factory.getIAnswer(answer);
        await this.firestore
            .collection(FirebaseDatabase.IMPLEMENTATIONS)
            .doc(implementationId)
            .collection(FirebaseDatabase.ANSWERS)
            .doc(answerId)
            .update(answer);
        return this.factory.getAnswer(answerId, answer);
    }

    async deleteAnswer(implementationId: string, answerId: string): Promise<Answer>{
        const answer: Answer = await this.getAnswer(implementationId, answerId);
        await this.firestore
            .collection(FirebaseDatabase.IMPLEMENTATIONS)
            .doc(implementationId)
            .collection(FirebaseDatabase.ANSWERS)
            .doc(answerId)
            .delete();
        return answer;
    }
    
    async getEvidence(implementationId: string): Promise<File[]>{
        const evidence: File[] = [];
        const query: QuerySnapshot<DocumentData> = await this.firestore
            .collection(FirebaseDatabase.IMPLEMENTATIONS)
            .doc(implementationId)
            .collection(FirebaseDatabase.EVIDENCE)
            .get().toPromise();
        query.docs.forEach(document => {
            const response: any = document.data();
            const file: File = this.factory.getFile(document.id, response as IFile);
            evidence.push(file);
        });
        return evidence;
    }
    
    async addEvidence(implementationId: string, userId: string, evidence: IFile): Promise<File>{
        this.validator.validateIFile(evidence);
        const id: string = this.firestore.createId();
        evidence = this.factory.getIFile(evidence);
        evidence['educatorId'] = userId;
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

    async getAllies(): Promise<Ally[]>{
        const allies: Ally[] = [];
        const query: QuerySnapshot<DocumentData> = await this.firestore
            .collection(FirebaseDatabase.ALLIES)
            .get().toPromise();
        query.docs.forEach(document => {
            const response: any = document.data();
            const ally: Ally = this.factory.getAlly(document.id, response as IAlly);
            allies.push(ally);
        });
        return allies;
    }

    async addAlly(ally: IAlly): Promise<Ally>{
        this.validator.validateIAlly(ally);
        ally = this.factory.getIAlly(ally);
        const id: string = this.firestore.createId();
        await this.firestore
            .collection(FirebaseDatabase.ALLIES)
            .doc(id)
            .set(ally);
        return this.factory.getAlly(id, ally);
    }

    private async getAlly(id: string): Promise<Ally>{
        const document: DocumentData = await this.firestore
            .collection(FirebaseDatabase.ALLIES)
            .doc(id)
            .get().toPromise();
        const ally: any = document.data();
        if(!ally)
            throw new Error(DatabaseError.ALLY_NOT_FOUND);
        else
            return this.factory.getAlly(id, ally as IAlly);
    }

    async updateAlly(id: string, ally: IAlly): Promise<Ally>{
        await this.getAlly(id);//checking first for ally existance
        this.validator.validateIAlly(ally);
        ally = this.factory.getIAlly(ally);
        await this.firestore
            .collection(FirebaseDatabase.ALLIES)
            .doc(id)
            .update(ally);
        return this.factory.getAlly(id, ally);
    }

    async deleteAlly(allyId: string): Promise<Ally>{
        const ally: Ally = await this.getAlly(allyId);
        await this.firestore
            .collection(FirebaseDatabase.ALLIES)
            .doc(allyId)
            .delete();
        return ally;
    }
};