import { Injectable } from '@angular/core';
import { Module, IModule, DisciplineMetadata, Section, ISection, File, IFile, User, Administrator, Educator, Discipline, Subject, ImageSection, TitleSection, TitleSectionSize, ParagraphSection, ActivitySection, Question, Score, YoutubeVideoSection, IParagraphSection, IDisciplineMetadata, IUser, Implementable, Event, IImplementable } from '../../models';
import ControlModule from '../../modules/control/control.module';
import { Factory } from './factory/Factory.service';
import { Database, DatabaseError } from './Database.service';

@Injectable({
    providedIn: ControlModule
})
export class MockDatabase implements Database{
    
    private ids: number = 0;
    private disciplineMetadata: DisciplineMetadata;
    private users: User[];
    private implementables: Implementable[];
    private sections: Section[];
    private files: File[];
    
    constructor(private factory: Factory){
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

        this.implementables = [
            new Module(''+this.ids++, 'MI ENTORNO', '#FAB521', 'https://ecosistemas.ovacen.com/wp-content/uploads/2018/02/ecosistema-manglar.jpg', 'https://ecosistemas.ovacen.com/wp-content/uploads/2018/02/ecosistema-manglar.jpg', '0', 'Admin', 'McUsername', 45, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 'Antecedentes', [
                new Discipline(this.disciplineMetadata.subjects[0], '2do Año', 'Eje temático.'),
                new Discipline(this.disciplineMetadata.subjects[2], '4to Año', 'Eje temático.'),
                new Discipline(this.disciplineMetadata.subjects[0], '3er Año', 'Eje temático.'),
                new Discipline(this.disciplineMetadata.subjects[1], '3er Año', 'Eje temático.'),
                new Discipline(this.disciplineMetadata.subjects[2], '5to Año', 'Eje temático.')
            ]),
            new Module(''+this.ids++, 'MI AGUA', '#EF6423', 'https://ecosistemas.ovacen.com/wp-content/uploads/2018/02/ecosistema-manglar.jpg', 'https://ecosistemas.ovacen.com/wp-content/uploads/2018/02/ecosistema-manglar.jpg', '0', 'Admin', 'McUsername', 45, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 'Antecedentes', [
                new Discipline(this.disciplineMetadata.subjects[0], '2do Año', 'Eje temático.'),
                new Discipline(this.disciplineMetadata.subjects[2], '4to Año', 'Eje temático.'),
                new Discipline(this.disciplineMetadata.subjects[0], '3er Año', 'Eje temático.'),
                new Discipline(this.disciplineMetadata.subjects[1], '3er Año', 'Eje temático.'),
                new Discipline(this.disciplineMetadata.subjects[2], '5to Año', 'Eje temático.')
            ]),
            new Event(''+this.ids++, 'Día de la Danta', '#EF6423', 'https://ecosistemas.ovacen.com/wp-content/uploads/2018/02/ecosistema-manglar.jpg', 'https://ecosistemas.ovacen.com/wp-content/uploads/2018/02/ecosistema-manglar.jpg', '0', 'Admin', 'McUsername', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', new Date()),
            new Event(''+this.ids++, 'Día del Agua', '#EF6423', 'https://ecosistemas.ovacen.com/wp-content/uploads/2018/02/ecosistema-manglar.jpg', 'https://ecosistemas.ovacen.com/wp-content/uploads/2018/02/ecosistema-manglar.jpg', '0', 'Admin', 'McUsername', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', new Date()),
            new Event(''+this.ids++, 'Día del Árbol', '#EF6423', 'https://ecosistemas.ovacen.com/wp-content/uploads/2018/02/ecosistema-manglar.jpg', 'https://ecosistemas.ovacen.com/wp-content/uploads/2018/02/ecosistema-manglar.jpg', '0', 'Admin', 'McUsername', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', new Date())
        ];

        this.sections = [
            new TitleSection(''+this.ids++, 0, TitleSectionSize.H1, 'Título Grande'),
            new ImageSection(''+this.ids++, 1, 'Pie de foto', 'https://media.nationalgeographic.org/assets/photos/000/284/28446.jpg', 'Referencia'),
            new TitleSection(''+this.ids++, 2, TitleSectionSize.H2, 'Subtítulo'),
            new ParagraphSection(''+this.ids++, 3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'),
            new ActivitySection(''+this.ids++, 4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 30, 'Herramientas listadas acá',[
                this.generateQuestion('¿Esto es una pregunta?'),
                this.generateQuestion('¿Cómo se sintió al leer esa pregunta?'),
                this.generateQuestion('¿Y al leer esa otra?'),
            ]),
            new TitleSection(''+this.ids++, 5, TitleSectionSize.H2, 'Otro subtítulo'),
            new ParagraphSection(''+this.ids++, 6, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'),
            new YoutubeVideoSection(''+this.ids++, 7, 'https://www.youtube.com/watch?v=XqZsoesa55w')
        ];

        this.files = [
            new File(''+this.ids++, 'https://www.cs.ubc.ca/~gregor/teaching/papers/4+1view-architecture.pdf', 'PDF_Ejemplo.pdf', new Date(), 114688)
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

    async getDisciplineMetadata(): Promise<DisciplineMetadata>{
        return this.disciplineMetadata;
    }

    async setDisciplineMetadata(metadata: IDisciplineMetadata): Promise<DisciplineMetadata>{
        this.disciplineMetadata = this.factory.getDisciplineMetadata(metadata);
        return this.disciplineMetadata;
    }
    
    async getUser(id: string): Promise<User>{
        for(let user of this.users)
            if(user.id === id)
                return user;
        throw new Error(DatabaseError.USER_NOT_FOUND);
    }

    async addUser(id: string, user: IUser): Promise<User>{
        const user_: User = this.factory.getUser(id, user);
        this.users.push(user_);
        return user_;
    }

    async getModules(): Promise<Module[]>{
        const modules: Module[] = [];
        for(let implementable of this.implementables)
            if(implementable instanceof Module)
                modules.push(implementable);
        return modules;
    }

    async getEvents(): Promise<Event[]>{
        const events: Event[] = [];
        for(let implementable of this.implementables)
            if(implementable instanceof Event)
                events.push(implementable);
        return events;
    }

    async getImplementable(id: string): Promise<Implementable>{
        for(let implementable of this.implementables)
            if(implementable.id === id)
                return implementable;
        throw new Error(DatabaseError.IMPLEMENTABLE_NOT_FOUND);
    }
    
    async addImplementable(implementable: IImplementable): Promise<Implementable>{
        const implementable_: Implementable = this.factory.getImplementable(''+this.ids++, implementable);
        this.implementables.push(implementable_);
        return implementable_;
    }

    async updateImplementable(id: string, implementable: IImplementable): Promise<Implementable>{
        for(let i = 0; i < this.implementables.length; i++){
            if(this.implementables[i].id === id){
                const implementable_: Implementable = this.factory.getImplementable(id, implementable);
                this.implementables.splice(i, 1, implementable_);
                return implementable_;
            }
        }
        throw new Error(DatabaseError.IMPLEMENTABLE_NOT_FOUND);
    }
    
    async deleteImplementable(id: string): Promise<Implementable>{
        for(let i = 0; i < this.implementables.length; i++)
            if(this.implementables[i].id === id)
                return this.implementables.splice(i, 1)[0];
        throw new Error(DatabaseError.IMPLEMENTABLE_NOT_FOUND);
    }
    
    private getSection(sectionId: string): Section{
        for(let section of this.sections)
            if(section.id === sectionId)
                return section;
        throw new Error(DatabaseError.SECTION_NOT_FOUND);
    }

    async getSections(implementableId: string): Promise<Section[]>{
        this.getImplementable(implementableId);//checking for implementable existance
        return this.sections;
    }
    
    async addSection(implementableId: string, section: ISection): Promise<Section>{
        this.getImplementable(implementableId);//checking for implementable existance
        const id: string = ''+this.ids++;
        const section_: Section = this.factory.getSection(id, section);
        this.sections.push(section_);
        return section_;
    }
    
    async updateSection(implementableId: string, sectionId: string, section: ISection): Promise<Section>{
        this.getImplementable(implementableId);//checking for implementable existance
        for(let i = 0; i < this.sections.length; i++){
            if(this.sections[i].id === sectionId){
                const section_: Section = this.factory.getSection(sectionId, section);
                this.sections.splice(i, 1, section_);
                return section_;
            }
        }
        throw new Error(DatabaseError.SECTION_NOT_FOUND);
    }
    
    async deleteSection(implementableId: string, sectionId: string): Promise<Section>{
        this.getImplementable(implementableId);//checking for implementable existance
        for(let i = 0; i < this.sections.length; i++)
            if(this.sections[i].id === sectionId)
                return this.sections.splice(i, 1)[0];
        throw new Error(DatabaseError.SECTION_NOT_FOUND);
    }
    
    async getFiles(implementableId: string, sectionId: string): Promise<File[]>{
        this.getImplementable(implementableId);//checking for implementable existance
        this.getSection(sectionId);//checking for section existance
        return this.files;
    }
    
    async addFile(implementableId: string, sectionId: string, file: IFile): Promise<File>{
        this.getImplementable(implementableId);//checking for implementable existance
        this.getSection(sectionId);//checking for section existance
        const file_: File = new File(''+this.ids++, file.url, file.name, file.uploaded, file.bytes);
        this.files.push(file_);
        return file_;
    }
    
    async deleteFile(implementableId: string, sectionId: string, fileId: string): Promise<File>{
        this.getImplementable(implementableId);//checking for module existance
        this.getSection(sectionId);//checking for section existance
        for(let i = 0; i < this.files.length; i++)
            if(this.files[i].id === fileId)
                return this.files.splice(i, 1)[0];
        throw new Error(DatabaseError.FILE_NOT_FOUND);
    }
}