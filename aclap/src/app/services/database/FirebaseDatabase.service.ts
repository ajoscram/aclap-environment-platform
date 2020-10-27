import { Module, IModule, DisciplineMetadata, Section, ISection, File, IFile, User } from '@src/app/models';
import { Database, DatabaseError } from './Database.service';   

export class FirebaseDatabase implements Database{
    getUser: (id: string) => Promise<User>;
    getModule: (id: string) => Promise<Module>;
    getModules: () => Promise<Module[]>;
    addModule: (module: IModule) => Promise<Module>;
    updateModule: (id: string, module: IModule) => Promise<Module>;
    deleteModule: (id: string) => Promise<Module>;
    getDisciplineMetadata: () => Promise<DisciplineMetadata>;
    getSections: (moduleId: string) => Promise<Section[]>;
    addSection: (moduleId: string, section: ISection) => Promise<Section>;
    updateSection: (moduleId: string, sectionId: string, section: ISection) => Promise<Section>;
    deleteSection: (moduleId: string, sectionId: string) => Promise<Section>;
    getFiles: (moduleId: string, sectionId: string) => Promise<File[]>;
    addFile: (moduleId: string, sectionId: string, file: IFile) => Promise<File>;
    deleteFile: (moduleId: string, sectionId: string, fileId: string) => Promise<File>;
};