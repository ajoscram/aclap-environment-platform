import { Section, DisciplineMetadata, File, ISection, IFile, IModule, Module, User } from "../../models";

export abstract class Database{

    //users
    getUser: (id: string) => Promise<User>;

    //modules
    getModule: (id: string) => Promise<Module>;
    getModules: () => Promise<Module[]>;
    addModule: (module: IModule) => Promise<void>;
    updateModule: (id: string, module: IModule) => Promise<void>;
    deleteModule: (id: string) => Promise<void>;

    //sections
    getDisciplineMetadata: () => Promise<DisciplineMetadata>;
    getSections: (moduleId: string) => Promise<Section[]>;
    addSection: (moduleId: string, section: ISection) => Promise<void>;
    updateSection: (moduleId: string, sectionId: string, section: ISection) => Promise<void>;
    deleteSection: (moduleId: string, sectionId: string) => Promise<void>;

    //files
    getFiles: (moduleId: string, sectionId: string) => Promise<File[]>;
    addFile: (moduleId: string, sectionId: string, file: IFile) => Promise<void>;
    deleteFile: (moduleId: string, sectionId: string, fileId: string) => Promise<void>;
}

export enum DatabaseError{
    NOT_YET_IMPLEMENTED = "DatabaseError.NOT_YET_IMPLEMENTED",
    USER_NOT_FOUND = "DatbaseError.USER_NOT_FOUND",
    MODULE_NOT_FOUND = "DatabaseError.MODULE_NOT_FOUND",
    SECTION_NOT_FOUND = "DatabaseError.SECTION_NOT_FOUND",
    FILE_NOT_FOUND = "DatabaseError.FILE_NOT_FOUND"
}