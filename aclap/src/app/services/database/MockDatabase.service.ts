import { Injectable } from '@angular/core';
import { Module, IModule, DisciplineMetadata, Component, IComponent, File, IFile, User, Administrator, Educator, Discipline, Subject, ImageComponent, TitleComponent, ParagraphComponent, ActivityComponent, Question, Score, YoutubeVideoComponent, IParagraphComponent } from '@src/app/models';
import { TitleComponentSize } from '@src/app/models/components/TitleComponent.model';
import ControlModule from '../../modules/control.module';
import { ComponentFactory } from '../components/ComponentFactory.service';
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
    
    constructor(private componentFactory: ComponentFactory){
        this.disciplineMetadata = new DisciplineMetadata(
            //subjects
            [ new Subject('Estudios Sociales', '#585FC2'), new Subject('Cívica', '#019CF6'), new Subject('Ciencias', '#53A23C')],
            //years
            ['1er Año', '2do Año', '3er Año', '4to Año','5to Año','6to Año','7mo Año']
        );

        this.users = [
            new Administrator('0', 'https://www.flaticon.com/svg/static/icons/svg/21/21104.svg', 'Admin', 'McUsername', 'admin@example.com'),
            new Educator('1', 'https://www.flaticon.com/svg/static/icons/svg/21/21104.svg', 'Educator1', 'McUsername', 'educator1@example.com', '88888888', new Date()),
            new Educator('2', 'https://www.flaticon.com/svg/static/icons/svg/21/21104.svg', 'Educator2', 'McUsername', 'educator2@example.com', '88888888', new Date()),
            new Educator('3', 'https://www.flaticon.com/svg/static/icons/svg/21/21104.svg', 'Educator3', 'McUsername', 'educator3@example.com', '88888888', new Date()),
        ];

        this.modules = [
            new Module(''+this.ids++, 'MI ENTORNO', 'https://ecosistemas.ovacen.com/wp-content/uploads/2018/02/ecosistema-manglar.jpg', '0', 'Admin', 'McUsername', 45, ['Hola', 'Cambiar', 'Horas'], ['Nada'], [
                new Discipline(this.disciplineMetadata.subjects[0], '2do Año', 'Eje temático.'),
                new Discipline(this.disciplineMetadata.subjects[2], '4to Año', 'Eje temático.'),
                new Discipline(this.disciplineMetadata.subjects[0], '3er Año', 'Eje temático.'),
                new Discipline(this.disciplineMetadata.subjects[1], '3er Año', 'Eje temático.'),
                new Discipline(this.disciplineMetadata.subjects[2], '5to Año', 'Eje temático.')
            ]),
            new Module(''+this.ids++, 'MI AGUA', 'https://ecosistemas.ovacen.com/wp-content/uploads/2018/02/ecosistema-manglar.jpg', '0', 'Admin', 'McUsername', 45, ['Hola', 'Cambiar', 'Horas'], ['Nada'], [
                new Discipline(this.disciplineMetadata.subjects[0], '2do Año', 'Eje temático.'),
                new Discipline(this.disciplineMetadata.subjects[2], '4to Año', 'Eje temático.'),
                new Discipline(this.disciplineMetadata.subjects[0], '3er Año', 'Eje temático.'),
                new Discipline(this.disciplineMetadata.subjects[1], '3er Año', 'Eje temático.'),
                new Discipline(this.disciplineMetadata.subjects[2], '5to Año', 'Eje temático.')
            ])
        ];

        this.components = [
            new TitleComponent(''+this.ids++, 0, TitleComponentSize.H1, 'Título Grande'),
            new ImageComponent(''+this.ids++, 1, 'Pie de foto', 'https://media.nationalgeographic.org/assets/photos/000/284/28446.jpg', 'Referencia'),
            new TitleComponent(''+this.ids++, 2, TitleComponentSize.H2, 'Subtítulo'),
            new ParagraphComponent(''+this.ids++, 3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'),
            new ActivityComponent(''+this.ids++, 4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 30, 'Herramientas listadas acá',[
                this.generateQuestion('¿Esto es una pregunta?'),
                this.generateQuestion('¿Cómo se sintió al leer esa pregunta?'),
                this.generateQuestion('¿Y al leer esa otra?'),
            ]),
            new TitleComponent(''+this.ids++, 5, TitleComponentSize.H2, 'Otro subtítulo'),
            new ParagraphComponent(''+this.ids, 6, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'),
            new YoutubeVideoComponent(''+this.ids, 7, 'https://www.youtube.com/watch?v=XqZsoesa55w')
        ];

        this.files = [
            new File(''+this.ids, 'https://www.cs.ubc.ca/~gregor/teaching/papers/4+1view-architecture.pdf', 'PDF Ejemplo', new Date(), 114688)
        ];

    }

    private generateQuestion(question: string): Question{
        const map: Map<Score, string> = new Map();
        map.set(Score.VERY_LOW, 'Muy mal');
        map.set(Score.LOW, 'Mal');
        map.set(Score.AVERAGE, 'Regular');
        map.set(Score.HIGH, 'Bien');
        map.set(Score.VERY_HIGH, 'Muy bien');
        return new Question(question, map);
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
        this.modules.push(new Module(
            ''+this.ids,
            module.name,
            module.imageUrl,
            module.publisherId,
            module.publisherName,
            module.publisherLastname,
            module.recommendedAge,
            module.objectives,
            module.requirements,
            module.disciplines
        ));
    }
    
    async updateModule(id: string, module: IModule): Promise<void>{
        for(let module_ of this.modules){
            if(module_.id === id){
                module_.name = module.name;
                module_.publisherId = module.publisherId;
                module_.publisherName = module.publisherName;
                module_.publisherLastname = module.publisherLastname;
                module_.recommendedAge = module.recommendedAge;
                module_.objectives = module.objectives;
                module_.requirements = module.requirements;
                module_.disciplines = module.disciplines;
                return;
            }
        }
        throw new Error(DatabaseError.MODULE_NOT_FOUND);
    }
    
    async deleteModule(id: string): Promise<void>{
        for(let i = 0; i < this.modules.length; i++){
            if(this.modules[i].id === id){
                this.modules.splice(i, 1);
                return;
            }
        }
        throw new Error(DatabaseError.MODULE_NOT_FOUND);
    }
    
    async getDisciplineMetadata(): Promise<DisciplineMetadata>{
        return this.disciplineMetadata;
    }
    
    private getComponent(componentId: string): Component{
        const component: Component = this.components.find( component => { component.id === componentId });
        if(!component)
            throw new Error(DatabaseError.COMPONENT_NOT_FOUND);
        else
            return component;
    }

    async getComponents(moduleId: string): Promise<Component[]>{
        return this.components;
    }
    
    async addComponent(moduleId: string, component: IComponent): Promise<void>{
        this.getModule(moduleId);//checking for module existance
        const component_: Component = this.componentFactory.getComponent(component);
        component_.id = ''+this.ids;
        this.components.push(component_);
    }
    
    async updateComponent(moduleId: string, componentId: string, component: IComponent): Promise<void>{
        this.getModule(moduleId);//checking for module existance
        for(let i = 0; i < this.components.length; i++){
            if(this.components[i].id === componentId){
                const component_: Component = this.componentFactory.getComponent(component);
                component_.id = this.components[i].id;
                this.components.splice(i, 1, component_);
                return;
            }
        }
        throw new Error(DatabaseError.COMPONENT_NOT_FOUND);
    }
    
    async deleteComponent(moduleId: string, componentId: string): Promise<void>{
        this.getModule(moduleId);//checking for module existance
        for(let i = 0; i < this.components.length; i++){
            if(this.components[i].id === componentId){
                this.components.splice(i, 1);
                return;
            }
        }
        throw new Error(DatabaseError.COMPONENT_NOT_FOUND);
    }
    
    async getFiles(moduleId: string, componentId: string): Promise<File[]>{
        this.getModule(moduleId);//checking for module existance
        this.getComponent(componentId);//checking for component existance
        return this.files;
    }
    
    async addFile(moduleId: string, componentId: string, file: IFile): Promise<void>{
        this.getModule(moduleId);//checking for module existance
        this.getComponent(componentId);//checking for component existance
        const file_: File = new File(''+this.ids, file.url, file.name, file.uploaded, file.bytes);
        this.files.push(file_);
    }
    
    async deleteFile(moduleId: string, componentId: string, fileId: string): Promise<void>{
        this.getModule(moduleId);//checking for module existance
        this.getComponent(componentId);//checking for component existance
        for(let i = 0; i < this.files.length; i++){
            if(this.files[i].id === fileId){
                this.files.splice(i, 1);
                return;
            }
        }
        throw new Error(DatabaseError.MODULE_NOT_FOUND);
    }
}