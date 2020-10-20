import { Component, DisciplineMetadata, File, IComponent, IFile, IModule, Module } from "../../models";

export abstract class Database{
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
    addFile: (moduleId: string, componentId: string, file: IFile) => void;
    deleteFile: (moduleId: string, componentId: string, fileId: string) => void;
}

export enum DatabaseError{

}