import { Section, DisciplineMetadata, File, ISection, Module, User, Implementable, IImplementable, Event, IEducatorRequest, EducatorRequest, IImplementation, Implementation, IEvaluation, Evaluation } from "../../models";
import { Role } from "../authentication/Session.model";

export abstract class Controller{
    //users
    login: (email: string, password: string, role: Role) => Promise<void>;
    logout: () => Promise<void>;
    getUser: () => Promise<User>;
    
    //educator requests
    addEducatorRequest: (request: IEducatorRequest) => Promise<EducatorRequest>;
    getEducatorRequests: () => Promise<EducatorRequest[]>;
    approveEducatorRequest: (id: string) => Promise<EducatorRequest>;
    denyEducatorRequest: (id: string) => Promise<EducatorRequest>; 

    //implementables
    getModules: () => Promise<Module[]>;
    getEvents: () => Promise<Event[]>;
    getImplementable: (id: string) => Promise<Implementable>;
    addImplementable: (implementable: IImplementable) => Promise<Implementable>;
    updateImplementable: (id: string, module: IImplementable) => Promise<Implementable>;
    deleteImplementable: (id: string) => Promise<Implementable>;

    //section
    getDisciplineMetadata: () => Promise<DisciplineMetadata>;
    getSections: (implementableId: string) => Promise<Section[]>;
    addSection: (implemntableId: string, section: ISection) => Promise<Section>;
    updateSection: (implementableId: string, sectionId: string, section: ISection) => Promise<Section>;
    deleteSection: (implementableId: string, sectionId: string) => Promise<Section>;

    //files
    getFiles: (implementableId: string, sectionId: string) => Promise<File[]>;
    addFile: (implementableId: string, sectionId: string, file: any) => Promise<File>;
    deleteFile: (implementableId: string, sectionId: string, fileId: string) => Promise<File>;
    upload: (file: any) => Promise<string>; //upload returns a download URL to the uploaded file.

    //implementations
    getImplementations: (completed: boolean, implementableId?: string) => Promise<Implementation[]>;
    addImplementation: (implementation: IImplementation) => Promise<Implementation>;
    updateImplementation: (id: string, implementation: IImplementation) => Promise<Implementation>;
    deleteImplementation: (id: string) => Promise<Implementation>;
    completeImplementation: (id: string) => Promise<Implementation>;

    //evaluations
    getEvaluations: (implementationId: string) => Promise<Evaluation[]>;
    addEvaluation: (implementationId: string, evaluation: IEvaluation) => Promise<Evaluation>;
    updateEvaluation: (implementationId: string, evaluationId: string, evaluation: IEvaluation) => Promise<Evaluation>;
    deleteEvaluation: (implementationId: string, evaluationId: string) => Promise<Evaluation>;

    //evidence
    getEvidence: (implementationId: string) => Promise<File[]>;
    addEvidence: (implementationId: string, evidence: any) => Promise<File>;
    deleteEvidence: (implementationId: string, evidenceId: string) => Promise<File>;
}

export enum ControllerError{

}