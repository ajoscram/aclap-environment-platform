import { Component, DisciplineMetadata, File, IComponent, IFile, IModule, Module, User } from "../../models";

export abstract class Database{

    //users
    getUser: (id: string) => Promise<User>;

    //modules
    getModule: (id: string) => Promise<Module>;
    geModules: () => Promise<Module[]>;
    addModule: (module: IModule) => Promise<void>;
    updateModule: (id: string, module: IModule) => Promise<void>;
    deleteModule: (id: string) => Promise<void>;

    //components
    getDisciplineMetadata: () => Promise<DisciplineMetadata>;
    getComponents: (moduleId: string) => Promise<Component[]>;
    addComponent: (moduleId: string, component: IComponent) => Promise<void>;
    updateComponent: (moduleId: string, componentId: string, component: IComponent) => Promise<void>;
    deleteComponent: (moduleId: string, componentId: string) => Promise<void>;

    //files
    getFiles: (moduleId: string, componentId: string) => Promise<File[]>;
    addFile: (moduleId: string, componentId: string, file: IFile) => Promise<void>;
    deleteFile: (moduleId: string, componentId: string, fileId: string) => Promise<void>;
}

export enum DatabaseError{
    NOT_YET_IMPLEMENTED = "DatabaseError.NOT_YET_IMPLEMENTED"
}