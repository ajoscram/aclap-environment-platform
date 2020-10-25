import { Module, IModule, DisciplineMetadata, Section, ISection, File, IFile, User } from '@src/app/models';
import { Database, DatabaseError } from './Database.service';

const firebase = require('nativescript-plugin-firebase');

export class FirebaseDatabase implements Database{
    getUser: (id: string) => Promise<User>;
    getModule: (id: string) => Promise<Module>;
    getModules: () => Promise<Module[]>;
    addModule: (module: IModule) => Promise<void>;
    updateModule: (id: string, module: IModule) => Promise<void>;
    deleteModule: (id: string) => Promise<void>;
    getDisciplineMetadata: () => Promise<DisciplineMetadata>;
    getSections: (moduleId: string) => Promise<Section[]>;
    addSection: (moduleId: string, section: ISection) => Promise<void>;
    updateSection: (moduleId: string, sectionId: string, section: ISection) => Promise<void>;
    deleteSection: (moduleId: string, sectionId: string) => Promise<void>;
    getFiles: (moduleId: string, sectionId: string) => Promise<File[]>;
    addFile: (moduleId: string, sectionId: string, file: IFile) => Promise<void>;
    deleteFile: (moduleId: string, sectionId: string, fileId: string) => Promise<void>;
};