import { Section, DisciplineMetadata, File, ISection, IFile, Module, User, IDisciplineMetadata, IUser, Implementable, IImplementable, Event } from "../../models";

export abstract class Database{

    //discipline metadata
    getDisciplineMetadata: () => Promise<DisciplineMetadata>;
    setDisciplineMetadata: (metadata: IDisciplineMetadata) => Promise<DisciplineMetadata>;

    //users
    getUser: (id: string) => Promise<User>;
    addUser: (id: string, user: IUser) => Promise<User>;

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
}

export enum DatabaseError{
    UNKNOWN_IMPLEMENTABLE_TYPE = "DatabaseError.UNKNOWN_IMPLEMENTABLE_TYPE",
    NOT_YET_IMPLEMENTED = "DatabaseError.NOT_YET_IMPLEMENTED",
    DISCIPLINE_METADATA_NOT_FOUND = "DatabaseError.DISCIPLINE_METADATA_NOT_FOUND",
    USER_NOT_FOUND = "DatabaseError.USER_NOT_FOUND",
    IMPLEMENTABLE_NOT_FOUND = "DatabaseError.IMPLEMENTABLE_NOT_FOUND",
    SECTION_NOT_FOUND = "DatabaseError.SECTION_NOT_FOUND",
    FILE_NOT_FOUND = "DatabaseError.FILE_NOT_FOUND"
}