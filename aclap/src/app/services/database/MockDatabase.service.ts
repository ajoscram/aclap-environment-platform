import { Injectable } from '@angular/core';
import { Module, IModule, DisciplineMetadata, Component, IComponent, File, IFile, User, Administrator, Educator, Discipline, Subject } from '@src/app/models';
import ControlModule from '../../modules/control.module';
import { Database, DatabaseError } from './Database.service';

@Injectable({
    providedIn: ControlModule
})
export class MockDatabase implements Database{
    
    private ids: number = 0;
    private disciplineMetadata: DisciplineMetadata;
    private users: User[];
    private modules: Module[];
    private components: Component[];
    private files: File[];
    
    constructor(){
        this.disciplineMetadata = new DisciplineMetadata(
            //subjects
            [ new Subject('Estudios Sociales', '#585FC2'), new Subject('Cívica', '#019CF6'), new Subject('Ciencias', '#53A23C')],
            //years
            ['1er Año', '2do Año', '3er Año', '4to Año','5to Año','6to Año','7mo Año']
        );

        this.users = [
            new Administrator('USER_ID_HERE', 'https://www.flaticon.com/svg/static/icons/svg/21/21104.svg', 'Admin', 'McUsername', 'admin@example.com'),
            new Educator(''+this.ids++, 'https://www.flaticon.com/svg/static/icons/svg/21/21104.svg', 'Educator1', 'McUsername', 'educator1@example.com', '88888888', new Date()),
            new Educator(''+this.ids++, 'https://www.flaticon.com/svg/static/icons/svg/21/21104.svg', 'Educator2', 'McUsername', 'educator2@example.com', '88888888', new Date()),
            new Educator(''+this.ids++, 'https://www.flaticon.com/svg/static/icons/svg/21/21104.svg', 'Educator3', 'McUsername', 'educator3@example.com', '88888888', new Date()),
        ];

        this.modules = [
            new Module(''+this.ids++, 'MI ENTORNO', 'USER_ID_HERE', 'Admin', 'McUsername', 45, ['Hola', 'Cambiar', 'Horas'], ['Nada'], [
                new Discipline(this.disciplineMetadata.subjects[0], '2do Año', 'Eje temático.'),
                new Discipline(this.disciplineMetadata.subjects[2], '4to Año', 'Eje temático.'),
                new Discipline(this.disciplineMetadata.subjects[0], '3er Año', 'Eje temático.'),
                new Discipline(this.disciplineMetadata.subjects[1], '3er Año', 'Eje temático.'),
                new Discipline(this.disciplineMetadata.subjects[2], '5to Año', 'Eje temático.')
            ]),
            new Module(''+this.ids++, 'MI AGUA', 'USER_ID_HERE', 'Admin', 'McUsername', 45, ['Hola', 'Cambiar', 'Horas'], ['Nada'], [
                new Discipline(this.disciplineMetadata.subjects[0], '2do Año', 'Eje temático.'),
                new Discipline(this.disciplineMetadata.subjects[2], '4to Año', 'Eje temático.'),
                new Discipline(this.disciplineMetadata.subjects[0], '3er Año', 'Eje temático.'),
                new Discipline(this.disciplineMetadata.subjects[1], '3er Año', 'Eje temático.'),
                new Discipline(this.disciplineMetadata.subjects[2], '5to Año', 'Eje temático.')
            ])
        ];

    }
    
    async getUser(id: string): Promise<User>{
        for(let user of this.users)
            if(user.id === id)
                return user;
        throw new Error(DatabaseError.USER_NOT_FOUND);
    }

    async getModule(id: string): Promise<Module>{
        for(let module of this.modules)
            if(module.id === id)
                return module;
        throw new Error(DatabaseError.MODULE_NOT_FOUND);
    }

    async getModules(): Promise<Module[]>{
        return this.modules;
    }
    
    async addModule(module: IModule): Promise<void>{
        throw new Error("Not implemented yet.");
    }
    
    async updateModule(id: string, module: IModule): Promise<void>{
        throw new Error("Not implemented yet.");
    }
    
    async deleteModule(id: string): Promise<void>{
        throw new Error("Not implemented yet.");
    }
    
    async getDisciplineMetadata(): Promise<DisciplineMetadata>{
        return this.disciplineMetadata;
    }
    
    async getComponents(moduleId: string): Promise<Component[]>{
        throw new Error("Not implemented yet.");
    }
    
    async addComponent(moduleId: string, component: IComponent): Promise<void>{
        throw new Error("Not implemented yet.");
    }
    
    async updateComponent(moduleId: string, componentId: string, component: IComponent): Promise<void>{
        throw new Error("Not implemented yet.");
    }
    
    async deleteComponent(moduleId: string, componentId: string): Promise<void>{
        throw new Error("Not implemented yet.");
    }
    
    async getFiles(moduleId: string, componentId: string): Promise<File[]>{
        throw new Error("Not implemented yet.");
    }
    
    async addFile(moduleId: string, componentId: string, file: IFile): Promise<void>{
        throw new Error("Not implemented yet.");
    }
    
    async deleteFile(moduleId: string, componentId: string, fileId: string): Promise<void>{
        throw new Error("Not implemented yet.");
    }
}