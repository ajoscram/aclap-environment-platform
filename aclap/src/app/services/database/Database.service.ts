import { Section, DisciplineMetadata, File, ISection, IFile, Module, User, IDisciplineMetadata, IUser, Implementable, IImplementable, Event, IEducatorRequest, EducatorRequest, EducatorRequestState, Implementation, IImplementation, Evaluation, IEvaluation } from "../../models";

export abstract class Database{

    //discipline metadata
    getDisciplineMetadata: () => Promise<DisciplineMetadata>;
    setDisciplineMetadata: (metadata: IDisciplineMetadata) => Promise<DisciplineMetadata>;

    //users
    getUser: (id: string) => Promise<User>;
    addUser: (id: string, user: IUser) => Promise<User>;

    //educator requests
    addEducatorRequest: (request: IEducatorRequest) => Promise<EducatorRequest>;
    getEducatorRequests: () => Promise<EducatorRequest[]>;
    updateEducatorRequestState: (id: string, state: EducatorRequestState) => Promise<EducatorRequest>;

    //implementable
    getEvents: () => Promise<Event[]>;
    getModules: () => Promise<Module[]>;
    getImplementable: (id: string) => Promise<Implementable>;
    addImplementable: (implementable: IImplementable) => Promise<Implementable>;
    updateImplementable: (id: string, implementable: IImplementable) => Promise<Implementable>;
    deleteImplementable: (id: string) => Promise<Implementable>;

    //sections
    getSections: (implementableId: string) => Promise<Section[]>;
    addSection: (implementableId: string, section: ISection) => Promise<Section>;
    updateSection: (implementableId: string, sectionId: string, section: ISection) => Promise<Section>;
    deleteSection: (implementableId: string, sectionId: string) => Promise<Section>;

    //files
    getFiles: (implementableId: string, sectionId: string) => Promise<File[]>;
    addFile: (implementableId: string, sectionId: string, file: IFile) => Promise<File>;
    deleteFile: (implementableId: string, sectionId: string, fileId: string) => Promise<File>;

    //implementations
    getImplementationsByUser: (completed: boolean, userId: string) => Promise<Implementation[]>;
    getImplementationsByImplementable: (completed: boolean, implementableId: string) => Promise<Implementation[]>;
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
    addEvidence: (implementationId: string, evidence: IFile) => Promise<File>;
    deleteEvidence: (implementationId: string, evidenceId: string) => Promise<File>;
}

export enum DatabaseError{
    UNKNOWN_IMPLEMENTABLE_TYPE = "DatabaseError.UNKNOWN_IMPLEMENTABLE_TYPE",
    NOT_YET_IMPLEMENTED = "DatabaseError.NOT_YET_IMPLEMENTED",
    DISCIPLINE_METADATA_NOT_FOUND = "DatabaseError.DISCIPLINE_METADATA_NOT_FOUND",
    USER_NOT_FOUND = "DatabaseError.USER_NOT_FOUND",
    EDUCATOR_REQUEST_NOT_FOUND = "DatabaseError.EDUCATOR_REQUEST_NOT_FOUND",
    EDUCATOR_REQUEST_ALREADY_PENDING = "DatabaseError.EDUCATOR_REQUEST_ALREADY_PENDING",
    IMPLEMENTABLE_NOT_FOUND = "DatabaseError.IMPLEMENTABLE_NOT_FOUND",
    SECTION_NOT_FOUND = "DatabaseError.SECTION_NOT_FOUND",
    FILE_NOT_FOUND = "DatabaseError.FILE_NOT_FOUND",
    IMPLEMENTATION_NOT_FOUND = "DatabaseError.IMPLEMENTATION_NOT_FOUND",
    IMPLEMENTATION_IS_COMPLETE = "DatabaseError.IMPLEMENTATION_IS_COMPLETE",
    EVALUATION_NOT_FOUND = "DatabaseError.EVALUATION_NOT_FOUND",
    EVIDENCE_NOT_FOUND = "DatabaseError.EVIDENCE_NOT_FOUND"
}