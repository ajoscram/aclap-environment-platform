import { Section, DisciplineMetadata, File, ISection, IFile, IModule, Module, User, IDisciplineMetadata, Administrator, IAdministrator, IUser } from "../../models";

export abstract class Database{

    //discipline metadata
    getDisciplineMetadata: () => Promise<DisciplineMetadata>;
    setDisciplineMetadata: (metadata: IDisciplineMetadata) => Promise<DisciplineMetadata>;

    //users
    getUser: (id: string) => Promise<User>;
    addUser: (id: string, user: IUser) => Promise<User>;

    //modules
    getModule: (id: string) => Promise<Module>;
    getModules: () => Promise<Module[]>;
    addModule: (module: IModule) => Promise<Module>;
    updateModule: (id: string, module: IModule) => Promise<Module>;
    deleteModule: (id: string) => Promise<Module>;

    //sections
    getSections: (moduleId: string) => Promise<Section[]>;
    addSection: (moduleId: string, section: ISection) => Promise<Section>;
    updateSection: (moduleId: string, sectionId: string, section: ISection) => Promise<Section>;
    deleteSection: (moduleId: string, sectionId: string) => Promise<Section>;

    //files
    getFiles: (moduleId: string, sectionId: string) => Promise<File[]>;
    addFile: (moduleId: string, sectionId: string, file: IFile) => Promise<File>;
    deleteFile: (moduleId: string, sectionId: string, fileId: string) => Promise<File>;
}

export enum DatabaseError{
    NOT_YET_IMPLEMENTED = "DatabaseError.NOT_YET_IMPLEMENTED",
    DISCIPLINE_METADATA_NOT_FOUND = "DatabaseError.DISCIPLINE_METADATA_NOT_FOUND",
    USER_NOT_FOUND = "DatabaseError.USER_NOT_FOUND",
    MODULE_NOT_FOUND = "DatabaseError.MODULE_NOT_FOUND",
    SECTION_NOT_FOUND = "DatabaseError.SECTION_NOT_FOUND",
    FILE_NOT_FOUND = "DatabaseError.FILE_NOT_FOUND"
}