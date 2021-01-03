import { Injectable } from '@angular/core';
import { User, Module, DisciplineMetadata, Section, ISection, File, IFile, Implementable, IImplementable, Event, IEducatorRequest, EducatorRequest, EducatorRequestState, IImplementation, Implementation, Answer, IAnswer, IQuestion, Question } from '../../models';
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
    };

    async resetPassword(email: string): Promise<void>{
        await this.authenticator.validate(Role.ANY);
        throw new Error('not implemented yet');
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
        console.log("Set Section");
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

    async deleteQuestion(implementableId: string, questionId: string): Promise<Question>{
        await this.authenticator.validate(Role.ADMINISTRATOR);
        return await this.database.deleteQuestion(implementableId, questionId);
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

    async addImplementation(implementation: IImplementation): Promise<Implementation>{
        await this.authenticator.validate(Role.ANY);
        return await this.database.addImplementation(implementation);
    }

    async updateImplementation(id: string, implementation: IImplementation): Promise<Implementation>{
        await this.authenticator.validate(Role.EDUCATOR);
        return await this.database.updateImplementation(id, implementation);
    }

    async deleteImplementation(id: string): Promise<Implementation>{
        await this.authenticator.validate(Role.ANY);
        return await this.database.deleteImplementation(id);
    }

    async completeImplementation(id: string): Promise<Implementation>{
        await this.authenticator.validate(Role.EDUCATOR);
        return await this.database.completeImplementation(id);
    }

    async getAnswers(implementationId: string): Promise<Answer[]>{
        await this.authenticator.validate(Role.ANY);
        return await this.database.getAnswers(implementationId);
    }

    async addAnswer(implementationId: string, answer: IAnswer): Promise<Answer>{
        await this.authenticator.validate(Role.EDUCATOR);
        return await this.database.addAnswer(implementationId, answer);
    }

    async updateAnswer(implementationId: string, answerId: string, answer: IAnswer): Promise<Answer>{
        await this.authenticator.validate(Role.EDUCATOR);
        return await this.database.updateAnswer(implementationId, answerId, answer);
    }

    async deleteAnswer(implementationId: string, answerId: string): Promise<Answer>{
        await this.authenticator.validate(Role.EDUCATOR);
        return await this.database.deleteAnswer(implementationId, answerId);
    }

    async getEvidence(implementationId: string): Promise<File[]>{
        await this.authenticator.validate(Role.ANY);
        return await this.database.getEvidence(implementationId);
    }

    async addEvidence(implementationId: string, evidence: any): Promise<File>{
        await this.authenticator.validate(Role.EDUCATOR);
        const file: IFile = await this.storage.upload(evidence);
        return await this.database.addEvidence(implementationId, file);
    }

    async deleteEvidence(implementationId: string, evidenceId: string): Promise<File>{
        await this.authenticator.validate(Role.EDUCATOR);
        return await this.database.deleteEvidence(implementationId, evidenceId);
    }
}