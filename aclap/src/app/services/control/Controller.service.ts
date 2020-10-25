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
    addModule: (module: IModule) => Promise<void>;
    updateModule: (id: string, module: IModule) => Promise<void>;
    deleteModule: (id: string) => Promise<void>;

    //section
    getDisciplineMetadata: () => Promise<DisciplineMetadata>;
    getSections: (moduleId: string) => Promise<Section[]>;
    addSection: (moduleId: string, section: ISection) => Promise<void>;
    updateSection: (moduleId: string, sectionId: string, section: ISection) => Promise<void>;
    deleteSection: (moduleId: string, sectionId: string) => Promise<void>;

    //files
    getFiles: (moduleId: string, sectionId: string) => Promise<File[]>;
    addFile: (moduleId: string, sectionId: string, path: string) => Promise<void>;
    deleteFile: (moduleId: string, sectionId: string, file: File) => Promise<void>;
}

export enum ControllerError{

}