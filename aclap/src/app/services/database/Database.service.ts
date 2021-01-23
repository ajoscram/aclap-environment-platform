import { Section, DisciplineMetadata, File, ISection, IFile, Module, User, IDisciplineMetadata, IUser, Implementable, IImplementable, Event, IEducatorRequest, EducatorRequest, EducatorRequestState, Implementation, IImplementation, Answer, IAnswer, Question, IQuestion, Ally, IAlly } from "../../models";

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
    getFiles: (implementableId: string) => Promise<File[]>;
    addFile: (implementableId: string, file: IFile) => Promise<File>;
    deleteFile: (implementableId: string, fileId: string) => Promise<File>;

    //questions
    getQuestions: (implementableId: string) => Promise<Question[]>;
    addQuestion: (implementableId: string, question: IQuestion) => Promise<Question>;
    updateQuestion: (implementableId: string, questionId: string, question: IQuestion) => Promise<Question>;
    deleteQuestion: (implementableId: string, questionId: string) => Promise<Question>;

    //implementations
    getImplementationsByUser: (completed: boolean, userId: string) => Promise<Implementation[]>;
    getImplementationsByImplementable: (completed: boolean, implementableId: string) => Promise<Implementation[]>;
    getImplementation: (implementationId: string) => Promise<Implementation>;
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
    addEvidence: (implementationId: string, evidence: IFile) => Promise<File>;
    deleteEvidence: (implementationId: string, evidenceId: string) => Promise<File>;

    //allies
    getAllies: () => Promise<Ally[]>;
    addAlly: (ally: IAlly) => Promise<Ally>;
    deleteAlly: (allyId: string) => Promise<Ally>;
}

export enum DatabaseError{
    UNKNOWN_IMPLEMENTABLE_TYPE = "DatabaseError.UNKNOWN_IMPLEMENTABLE_TYPE",
    NOT_YET_IMPLEMENTED = "DatabaseError.NOT_YET_IMPLEMENTED",
    DISCIPLINE_METADATA_NOT_FOUND = "DatabaseError.DISCIPLINE_METADATA_NOT_FOUND",
    USER_NOT_FOUND = "DatabaseError.USER_NOT_FOUND",
    USER_ALREADY_EXISTS = "DatabaseError.USER_ALREADY_EXISTS",
    EDUCATOR_REQUEST_NOT_FOUND = "DatabaseError.EDUCATOR_REQUEST_NOT_FOUND",
    EDUCATOR_REQUEST_ALREADY_PENDING = "DatabaseError.EDUCATOR_REQUEST_ALREADY_PENDING",
    IMPLEMENTABLE_NOT_FOUND = "DatabaseError.IMPLEMENTABLE_NOT_FOUND",
    SECTION_NOT_FOUND = "DatabaseError.SECTION_NOT_FOUND",
    FILE_NOT_FOUND = "DatabaseError.FILE_NOT_FOUND",
    QUESTION_NOT_FOUND = "DatabaseError.QUESTION_NOT_FOUND",
    IMPLEMENTATION_NOT_FOUND = "DatabaseError.IMPLEMENTATION_NOT_FOUND",
    IMPLEMENTATION_IS_COMPLETE = "DatabaseError.IMPLEMENTATION_IS_COMPLETE",
    ANSWER_NOT_FOUND = "DatabaseError.EVALUATION_NOT_FOUND",
    EVIDENCE_NOT_FOUND = "DatabaseError.EVIDENCE_NOT_FOUND",
    ALLY_NOT_FOUND = 'DatabaseError.ALLY_NOT_FOUND'
}