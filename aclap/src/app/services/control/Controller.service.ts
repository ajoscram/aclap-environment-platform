import { Section, DisciplineMetadata, File, ISection, Module, User, Implementable, IImplementable, Event, IEducatorRequest, EducatorRequest, IImplementation, Implementation, Answer, IAnswer, Question, IQuestion } from "../../models";
import { Session, Role } from "../authentication/Session.model";

export abstract class Controller{
    //users
    login: (email: string, password: string, role: Role) => Promise<void>;
    logout: () => Promise<void>;
    getSession: () => Promise<Session>;
    getUser: () => Promise<User>;
    resetPassword: (email: string) => Promise<void>;
    
    //educator requests
    getEducatorRequests: () => Promise<EducatorRequest[]>;
    addEducatorRequest: (request: IEducatorRequest) => Promise<EducatorRequest>;
    approveEducatorRequest: (id: string) => Promise<EducatorRequest>;
    denyEducatorRequest: (id: string) => Promise<EducatorRequest>; 

    //implementables
    getModules: () => Promise<Module[]>;
    getEvents: () => Promise<Event[]>;
    getImplementable: (id: string) => Promise<Implementable>;
    addImplementable: (implementable: IImplementable) => Promise<Implementable>;
    updateImplementable: (id: string, implementable: IImplementable) => Promise<Implementable>;
    deleteImplementable: (id: string) => Promise<Implementable>;

    //sections
    getDisciplineMetadata: () => Promise<DisciplineMetadata>;
    getSections: (implementableId: string) => Promise<Section[]>;
    addSection: (implementableId: string, section: ISection) => Promise<Section>;
    updateSection: (implementableId: string, sectionId: string, section: ISection) => Promise<Section>;
    setSection: (section: ISection, implementableId: string, sectionId?: string) => Promise<Section>;
    deleteSection: (implementableId: string, sectionId: string) => Promise<Section>;

    //files
    getFiles: (implementableId: string) => Promise<File[]>;
    addFile: (implementableId: string, file: any) => Promise<File>;
    deleteFile: (implementableId: string, fileId: string) => Promise<File>;
    upload: (file: any) => Promise<string>; //upload returns a download URL to the uploaded file.

    //questions
    getQuestions: (implementableId: string) => Promise<Question[]>;
    addQuestion: (implementableId: string, question: IQuestion) => Promise<Question>;
    updateQuestion: (implementableId: string, questionId: string, question: IQuestion) => Promise<Question>;
    deleteQuestion: (implementableId: string, questionId: string) => Promise<Question>;

    //implementations
    getImplementations: (completed: boolean, implementableId?: string) => Promise<Implementation[]>;
    addImplementation: (implementation: IImplementation) => Promise<Implementation>;
    updateImplementation: (id: string, implementation: IImplementation) => Promise<Implementation>;
    deleteImplementation: (id: string) => Promise<Implementation>;
    completeImplementation: (id: string) => Promise<Implementation>;

    //answers
    getAnswers: (implementationId: string) => Promise<Answer[]>;
    addAnswer: (implementationId: string, answer: IAnswer) => Promise<Answer>;
    updateAnswer: (implementationId: string, answerId: string, answer: IAnswer) => Promise<Answer>;
    deleteAnswer: (implementationId: string, answerId: string) => Promise<Answer>;

    //evidence
    getEvidence: (implementationId: string) => Promise<File[]>;
    addEvidence: (implementationId: string, evidence: any) => Promise<File>;
    deleteEvidence: (implementationId: string, evidenceId: string) => Promise<File>;
}

export enum ControllerError{

}