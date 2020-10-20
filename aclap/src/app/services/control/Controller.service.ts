import { Component, DisciplineMetadata, IComponent, IModule, Module, User } from "../../models";
import { UserType } from "../authentication/Authenticator.service";

export abstract class Controller{
    //users
    login: (email: string, password: string, type: UserType) => User;
    getUser: () => User;
    logout: () => void;
    
    //modules
    getModule: (id: string) => Module;
    geModules: () => Module[];
    addModule: (module: IModule) => void;
    updateModule: (id: string, module: IModule) => void;
    deleteModule: (id: string) => void;

    //components
    getDisciplineMetadata: () => DisciplineMetadata;
    getComponents: (moduleId: string) => Component[];
    addComponent: (moduleId: string, component: IComponent) => void;
    updateComponent: (moduleId: string, componentId: string, component: IComponent) => void;
    deleteComponent: (moduleId: string, componentId: string) => void;

    //files
    getFiles: (moduleId: string, componentId: string) => File[];
    addFile: (moduleId: string, componentId: string, path: string) => void;
    deleteFile: (moduleId: string, componentId: string, fileId: string) => void;
}

export enum ControllerError{

}