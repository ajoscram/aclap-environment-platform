import { Injectable } from '@angular/core';
import { User, Module, DisciplineMetadata, Section, ISection, File, IFile, Implementable, IImplementable, Event, IEducatorRequest, EducatorRequest, EducatorRequestState, IImplementation, Implementation, Answer, IAnswer, IQuestion, Question, Ally, IAlly } from '../../models';
import { Role, Session } from '../authentication/Session.model';
import { Controller } from './Controller.service';
import { Authenticator } from '../authentication/Authenticator.service';
import { Database } from '../database/Database.service';
import { Storage } from '../storage/Storage.service';
import ControlModule from '../../modules/control/control.module';

@Injectable({
    providedIn: ControlModule
})
export class DefaultController implements Controller{

    constructor(
        private authenticator: Authenticator,
        private database: Database,
        private storage: Storage
    ){}

    //Controller interface implementation
    async login(email: string, password: string): Promise<void>{
        await this.authenticator.login(email, password);
    }

    async logout(): Promise<void>{
        await this.authenticator.logout();
    }

    async getUser(): Promise<User>{
        const session: Session = await this.authenticator.getSession();
        return await this.database.getUser(session.user_id);
    }

    async getSession(): Promise<Session>{
        return await this.authenticator.getSession();
    }

    async setPassword(password: string): Promise<void>{
        await this.authenticator.setPassword(password);
    }

    async requestPasswordReset(email: string): Promise<string>{
        return await this.database.addPasswordResetRequest(email);
    }

    async addEducatorRequest(request: IEducatorRequest): Promise<EducatorRequest>{
        return await this.database.addEducatorRequest(request);
    }

    async getEducatorRequests(): Promise<EducatorRequest[]>{
        await this.authenticator.validate(Role.ADMINISTRATOR);
        return await this.database.getEducatorRequests();
    }

    async approveEducatorRequest(id: string): Promise<EducatorRequest>{
        await this.authenticator.validate(Role.ADMINISTRATOR);
        return await this.database.updateEducatorRequestState(id, EducatorRequestState.APPROVED);
    }

    async denyEducatorRequest(id: string): Promise<EducatorRequest>{
        await this.authenticator.validate(Role.ADMINISTRATOR);
        return await this.database.updateEducatorRequestState(id, EducatorRequestState.DENIED);
    }
    
    async getModules(): Promise<Module[]>{
        return await this.database.getModules();
    }

    async getEvents(): Promise<Event[]>{
        return await this.database.getEvents();
    };

    async getImplementable(id: string): Promise<Implementable>{
        return await this.database.getImplementable(id);
    }

    async addImplementable(implementable: IImplementable): Promise<Implementable>{
        await this.authenticator.validate(Role.ADMINISTRATOR);
        const session: Session = await this.authenticator.getSession();
        const user: User = await this.database.getUser(session.user_id);
        implementable.publisherId = user.id;
        implementable.publisherName = user.name;
        implementable.publisherLastname = user.lastname;
        return await this.database.addImplementable(implementable);
    }

    async updateImplementable(id: string, implementable: IImplementable): Promise<Implementable>{
        await this.authenticator.validate(Role.ADMINISTRATOR);
        return await this.database.updateImplementable(id, implementable);
    }

    async deleteImplementable(id: string): Promise<Implementable>{
        await this.authenticator.validate(Role.ADMINISTRATOR);
        return await this.database.deleteImplementable(id);
    }

    async getDisciplineMetadata(): Promise<DisciplineMetadata>{
        await this.authenticator.validate(Role.ADMINISTRATOR);
        return await this.database.getDisciplineMetadata();
    }

    async getSections(implementableId: string): Promise<Section[]>{
        return await this.database.getSections(implementableId);
    }

    async addSection(implementableId: string, section: ISection): Promise<Section>{
        await this.authenticator.validate(Role.ADMINISTRATOR);
        return await this.database.addSection(implementableId, section);
    }

    async updateSection(implementableId: string, sectionId: string, section: ISection): Promise<Section>{
        await this.authenticator.validate(Role.ADMINISTRATOR);
        return await this.database.updateSection(implementableId, sectionId, section);
    }

    async setSection(section: ISection, implementableId: string, sectionId?: string): Promise<Section>{
        if(sectionId)
            return await this.updateSection(implementableId, sectionId, section);
        else
            return await this.addSection(implementableId, section);
    }

    async deleteSection(implementableId: string, sectionId: string): Promise<Section>{
        await this.authenticator.validate(Role.ADMINISTRATOR);
        return await this.database.deleteSection(implementableId, sectionId);
    }

    async getFiles(implementableId: string): Promise<File[]>{
        return await this.database.getFiles(implementableId);
    }

    async addFile(implementableId: string, file: any): Promise<File>{
        await this.authenticator.validate(Role.ADMINISTRATOR);
        const file_: IFile = await this.storage.upload(file);
        return await this.database.addFile(implementableId, file_);
    }

    async deleteFile(implementableId: string, fileId: string): Promise<File>{
        await this.authenticator.validate(Role.ANY);
        const deleted: File = await this.database.deleteFile(implementableId, fileId);
        await this.storage.delete(deleted);
        return deleted;
    }

    async upload(file: any): Promise<string>{
        await this.authenticator.validate(Role.ANY);
        const file_: IFile = await this.storage.upload(file);
        return file_.url;
    }

    async getQuestions(implementableId: string): Promise<Question[]>{
        await this.authenticator.validate(Role.ANY);
        return await this.database.getQuestions(implementableId);
    }

    async addQuestion(implementableId: string, question: IQuestion): Promise<Question>{
        await this.authenticator.validate(Role.ADMINISTRATOR);
        return await this.database.addQuestion(implementableId, question);
    }

    async updateQuestion(implementableId: string, questionId: string, question: IQuestion): Promise<Question>{
        await this.authenticator.validate(Role.ADMINISTRATOR);
        return await this.database.updateQuestion(implementableId, questionId, question);
    }

    async setQuestion(question: IQuestion, implementableId: string, questionId?: string): Promise<Question>{
        if(questionId)
            return await this.updateQuestion(implementableId, questionId, question);
        else
            return await this.addQuestion(implementableId, question);
    }

    async deleteQuestion(implementableId: string, questionId: string): Promise<Question>{
        await this.authenticator.validate(Role.ADMINISTRATOR);
        return await this.database.deleteQuestion(implementableId, questionId);
    }

    async draftImplementation(implementableId: string): Promise<IImplementation>{
        const session: Session = await this.authenticator.getSession();
        const user: User = await this.database.getUser(session.user_id);
        const implementable: Implementable = await this.database.getImplementable(implementableId);
        return {
            date: new Date(),
            maleParticipants: null,
            femaleParticipants: null,
            otherParticipants: null,
            location: null,
            educatorId: user.id,
            educatorName: user.name,
            educatorLastname: user.lastname,
            implementableId: implementable.id,
            implementableName: implementable.name
        }
    }

    async getImplementations(completed: boolean, implementableId?: string): Promise<Implementation[]>{
        if(implementableId){
            await this.authenticator.validate(Role.ADMINISTRATOR);
            return await this.database.getImplementationsByImplementable(completed, implementableId);
        }
        else{
            const session: Session = await this.authenticator.getSession();
            return await this.database.getImplementationsByUser(completed, session.user_id);
        }
    }

    async getImplementation(implementationId: string): Promise<Implementation>{
        await this.authenticator.validate(Role.ANY);
        return await this.database.getImplementation(implementationId);
    }

    async addImplementation(implementation: IImplementation): Promise<Implementation>{
        await this.authenticator.validate(Role.ANY);
        return await this.database.addImplementation(implementation);
    }

    async updateImplementation(id: string, implementation: IImplementation): Promise<Implementation>{
        await this.authenticator.validate(Role.ANY);
        return await this.database.updateImplementation(id, implementation);
    }

    async deleteImplementation(id: string): Promise<Implementation>{
        await this.authenticator.validate(Role.ANY);
        return await this.database.deleteImplementation(id);
    }

    async completeImplementation(id: string): Promise<Implementation>{
        await this.authenticator.validate(Role.ANY);
        return await this.database.completeImplementation(id);
    }

    async getAnswers(implementationId: string): Promise<Answer[]>{
        await this.authenticator.validate(Role.ANY);
        return await this.database.getAnswers(implementationId);
    }

    async addAnswer(implementationId: string, answer: IAnswer): Promise<Answer>{
        await this.authenticator.validate(Role.ANY);
        const session: Session = await this.authenticator.getSession();
        return await this.database.addAnswer(implementationId, session.user_id, answer);
    }

    async updateAnswer(implementationId: string, answerId: string, answer: IAnswer): Promise<Answer>{
        await this.authenticator.validate(Role.ANY);
        return await this.database.updateAnswer(implementationId, answerId, answer);
    }

    async setAnswer(answer: IAnswer, implementableId: string, answerId?: string): Promise<Answer>{
        if(answerId)
            return await this.updateAnswer(implementableId, answerId, answer);
        else
            return await this.addAnswer(implementableId, answer);
    }

    async deleteAnswer(implementationId: string, answerId: string): Promise<Answer>{
        await this.authenticator.validate(Role.ANY);
        return await this.database.deleteAnswer(implementationId, answerId);
    }

    async getEvidence(implementationId: string): Promise<File[]>{
        await this.authenticator.validate(Role.ANY);
        return await this.database.getEvidence(implementationId);
    }

    async addEvidence(implementationId: string, evidence: any): Promise<File>{
        await this.authenticator.validate(Role.ANY);
        const file: IFile = await this.storage.upload(evidence);
        const session: Session = await this.authenticator.getSession();
        return await this.database.addEvidence(implementationId, session.user_id, file);
    }

    async deleteEvidence(implementationId: string, evidenceId: string): Promise<File>{
        await this.authenticator.validate(Role.ANY);
        const deleted: File = await this.database.deleteEvidence(implementationId, evidenceId);
        await this.storage.delete(deleted);
        return deleted;
    }

    async getAllies(): Promise<Ally[]>{
        return await this.database.getAllies();
    }

    async addAlly(ally: IAlly): Promise<Ally>{
        await this.authenticator.validate(Role.ADMINISTRATOR);
        return await this.database.addAlly(ally);
    }

    async updateAlly(id: string, ally: IAlly): Promise<Ally>{
        await this.authenticator.validate(Role.ADMINISTRATOR);
        return await this.database.updateAlly(id, ally);
    }
    
    async deleteAlly(id: string): Promise<Ally>{
        await this.authenticator.validate(Role.ADMINISTRATOR);
        return await this.database.deleteAlly(id);
    }
}