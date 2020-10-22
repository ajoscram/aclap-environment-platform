import { Component, DisciplineMetadata, File, IComponent, IModule, Module, User } from "../../models";
import { Role } from "../authentication/Session.model";

export abstract class Controller{
    //users
    login: (email: string, password: string, role: Role) => Promise<void>;
    logout: () => Promise<void>;
    getUser: () => Promise<User>;
    
    //modules
    getModule: (id: string) => Promise<Module>;
    getModules: () => Promise<Module[]>;
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
    addFile: (moduleId: string, componentId: string, path: string) => Promise<void>;
    deleteFile: (moduleId: string, componentId: string, file: File) => Promise<void>;
}

export enum ControllerError{

}