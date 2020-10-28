import { Section, DisciplineMetadata, File, ISection, IModule, Module, User } from "../../models";
import { Role } from "../authentication/Session.model";

export abstract class Controller{
    //users
    login: (email: string, password: string, role: Role) => Promise<void>;
    logout: () => Promise<void>;
    getUser: () => Promise<User>;
    
    //modules
    getModule: (id: string) => Promise<Module>;
    getModules: () => Promise<Module[]>;
    addModule: (module: IModule) => Promise<Module>;
    updateModule: (id: string, module: IModule) => Promise<Module>;
    deleteModule: (id: string) => Promise<Module>;

    //section
    getDisciplineMetadata: () => Promise<DisciplineMetadata>;
    getSections: (moduleId: string) => Promise<Section[]>;
    addSection: (moduleId: string, section: ISection) => Promise<Section>;
    updateSection: (moduleId: string, sectionId: string, section: ISection) => Promise<Section>;
    deleteSection: (moduleId: string, sectionId: string) => Promise<Section>;

    //files
    getFiles: (moduleId: string, sectionId: string) => Promise<File[]>;
    addFile: (moduleId: string, sectionId: string, path: string) => Promise<File>;
    deleteFile: (moduleId: string, sectionId: string, file: File) => Promise<File>;
}

export enum ControllerError{

}