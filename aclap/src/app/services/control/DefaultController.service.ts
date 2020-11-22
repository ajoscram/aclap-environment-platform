import { Injectable } from '@angular/core';
import { User, Module, DisciplineMetadata, Section, ISection, File, IFile, Implementable, IImplementable, Event, IEducatorRequest, EducatorRequest, EducatorRequestState, IImplementation, Implementation, IEvaluation, Evaluation } from '../../models';
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

    async getSections(moduleId: string): Promise<Section[]>{
        return await this.database.getSections(moduleId);
    }

    async addSection(moduleId: string, section: ISection): Promise<Section>{
        await this.authenticator.validate(Role.ADMINISTRATOR);
        return await this.database.addSection(moduleId, section);
    }

    async updateSection(moduleId: string, sectionId: string, section: ISection): Promise<Section>{
        await this.authenticator.validate(Role.ADMINISTRATOR);
        return await this.database.updateSection(moduleId, sectionId, section);
    }

    async deleteSection(moduleId: string, sectionId: string): Promise<Section>{
        await this.authenticator.validate(Role.ADMINISTRATOR);
        return await this.database.deleteSection(moduleId, sectionId);
    }

    async getFiles(moduleId: string, sectionId: string): Promise<File[]>{
        return await this.database.getFiles(moduleId, sectionId);
    }

    async addFile(moduleId: string, sectionId: string, file: any): Promise<File>{
        await this.authenticator.validate(Role.ADMINISTRATOR);
        const file_: IFile = await this.storage.upload(file);
        return await this.database.addFile(moduleId, sectionId, file_);
    }

    async deleteFile(moduleId: string, sectionId: string, fileId: string): Promise<File>{
        await this.authenticator.validate(Role.ANY);
        const deleted: File = await this.database.deleteFile(moduleId, sectionId, fileId);
        await this.storage.delete(deleted);
        return deleted;
    }

    async upload(file: any): Promise<string>{
        await this.authenticator.validate(Role.ANY);
        const file_: IFile = await this.storage.upload(file);
        return file_.url;
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

    async getEvaluations(implementationId: string): Promise<Evaluation[]>{
        await this.authenticator.validate(Role.ANY);
        return await this.database.getEvaluations(implementationId);
    }

    async addEvaluation(implementationId: string, evaluation: IEvaluation): Promise<Evaluation>{
        await this.authenticator.validate(Role.EDUCATOR);
        return await this.database.addEvaluation(implementationId, evaluation);
    }

    async updateEvaluation(implementationId: string, evaluationId: string, evaluation: IEvaluation): Promise<Evaluation>{
        await this.authenticator.validate(Role.EDUCATOR);
        return await this.database.updateEvaluation(implementationId, evaluationId, evaluation);
    }

    async deleteEvaluation(implementationId: string, evaluationId: string): Promise<Evaluation>{
        await this.authenticator.validate(Role.EDUCATOR);
        return await this.database.deleteEvaluation(implementationId, evaluationId);
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