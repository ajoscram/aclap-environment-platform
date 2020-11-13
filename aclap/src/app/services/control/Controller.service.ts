import { Section, DisciplineMetadata, File, ISection, IModule, Module, User, Implementable, IImplementable, Event } from "../../models";
import { Role } from "../authentication/Session.model";

export abstract class Controller{
    //users
    login: (email: string, password: string, role: Role) => Promise<void>;
    logout: () => Promise<void>;
    getUser: () => Promise<User>;
    
    //implementables
    getModules: () => Promise<Module[]>;
    getEvents: () => Promise<Event[]>;
    getImplementable: (id: string) => Promise<Implementable>;
    addImplementable: (implementable: IImplementable) => Promise<Implementable>;
    updateImplementable: (id: string, module: IImplementable) => Promise<Implementable>;
    deleteImplementable: (id: string) => Promise<Implementable>;

    //section
    getDisciplineMetadata: () => Promise<DisciplineMetadata>;
    getSections: (implementableId: string) => Promise<Section[]>;
    addSection: (implemntableId: string, section: ISection) => Promise<Section>;
    updateSection: (implementableId: string, sectionId: string, section: ISection) => Promise<Section>;
    deleteSection: (implementableId: string, sectionId: string) => Promise<Section>;

    //files
    getFiles: (implementableId: string, sectionId: string) => Promise<File[]>;
    addFile: (implementableId: string, sectionId: string, file: any) => Promise<File>;
    deleteFile: (implementableId: string, sectionId: string, fileId: string) => Promise<File>;
    upload: (file: any) => Promise<string>; //upload returns a download URL to the uploaded file.
}

export enum ControllerError{

}