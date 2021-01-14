import { Injectable } from '@angular/core';
import { Module, DisciplineMetadata, Section, ISection, File, IFile, User, Administrator, Educator, Discipline, Subject, ImageSection, TitleSection, TitleSectionSize, ParagraphSection, ActivitySection, Question, IQuestion, Score, YoutubeVideoSection, IParagraphSection, IDisciplineMetadata, IUser, Implementable, Event, IImplementable, EducatorRequest, Implementation, Location, EducatorRequestState, Answer, IAnswer, IEducatorRequest, IImplementation } from '../../models';
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
    private requests: EducatorRequest[];
    private implementables: Implementable[];
    private sections: Section[];
    private files: File[];
    private questions: Question[];
    private implementations: Implementation[];
    private answers: Answer[];
    private evidence: File[];

    private get nextId(): string{
        return ''+this.ids++;
    }
    
    constructor(private factory: Factory){
        this.disciplineMetadata = new DisciplineMetadata(
            //subjects
            [ new Subject('Estudios Sociales', '#585FC2'), new Subject('Cívica', '#019CF6'), new Subject('Ciencias', '#53A23C')],
            //years
            ['1er Año', '2do Año', '3er Año', '4to Año','5to Año','6to Año','7mo Año']
        );

        this.users = [
            new Administrator('0', 'https://www.pathcenter.co.il/wp-content/uploads/2014/03/user_icon.png', 'Susana Oria', 'McUsername', 'admin@example.com'),
            new Educator('1', 'https://www.pathcenter.co.il/wp-content/uploads/2014/03/user_icon.png', 'Educator1', 'McUsername', 'educator1@example.com', '88888888', new Location('Place name', 0, 0), new Date(), 'Organization', new Date()),
            new Educator('2', 'https://www.pathcenter.co.il/wp-content/uploads/2014/03/user_icon.png', 'Educator2', 'McUsername', 'educator2@example.com', '88888888', new Location('Place name', 0, 0), new Date(), 'Organization', new Date()),
            new Educator('3', 'https://www.pathcenter.co.il/wp-content/uploads/2014/03/user_icon.png', 'Educator3', 'McUsername', 'educator3@example.com', '88888888', new Location('Place name', 0, 0), new Date(), 'Organization', new Date()),
        ];

        this.requests = [
            new EducatorRequest(this.nextId, 'Carlos', 'Oliveira', 'carlos@umbrella.com', '88888888', new Location('Umbrella HQ', 70, 12), new Date(), 'Umbrella', new Date(), EducatorRequestState.PENDING),
            new EducatorRequest(this.nextId, 'Alejandro', 'Schmidt', 'ajoscram@gmail.com', '99999999', new Location('Paraiso, Cartago', 80.123, 72.3), new Date(), 'Tecnológico de Costa Rica', new Date(), EducatorRequestState.PENDING),
            new EducatorRequest(this.nextId, 'Ayy', 'Lmao', 'ayy@lmao.com', '12345678', new Location('Area 51', 40, 50), new Date(), 'Marte', new Date(), EducatorRequestState.PENDING)
        ];

        this.implementables = [
            new Module(this.nextId, 'MI ENTORNO', '#FAB521', 'https://ecosistemas.ovacen.com/wp-content/uploads/2018/02/ecosistema-manglar.jpg', 'https://ecosistemas.ovacen.com/wp-content/uploads/2018/02/ecosistema-manglar.jpg', '0', 'Admin', 'McUsername', 45, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 'Antecedentes', [
                new Discipline(this.disciplineMetadata.subjects[0], '2do Año', 'Eje temático.'),
                new Discipline(this.disciplineMetadata.subjects[2], '4to Año', 'Eje temático.'),
                new Discipline(this.disciplineMetadata.subjects[0], '3er Año', 'Eje temático.'),
                new Discipline(this.disciplineMetadata.subjects[1], '3er Año', 'Eje temático.'),
                new Discipline(this.disciplineMetadata.subjects[2], '5to Año', 'Eje temático.')
            ]),
            new Module(this.nextId, 'MI AGUA', '#EF6423', 'https://ecosistemas.ovacen.com/wp-content/uploads/2018/02/ecosistema-manglar.jpg', 'https://ecosistemas.ovacen.com/wp-content/uploads/2018/02/ecosistema-manglar.jpg', '0', 'Admin', 'McUsername', 45, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 'Antecedentes', [
                new Discipline(this.disciplineMetadata.subjects[0], '2do Año', 'Eje temático.'),
                new Discipline(this.disciplineMetadata.subjects[2], '4to Año', 'Eje temático.'),
                new Discipline(this.disciplineMetadata.subjects[0], '3er Año', 'Eje temático.'),
                new Discipline(this.disciplineMetadata.subjects[1], '3er Año', 'Eje temático.'),
                new Discipline(this.disciplineMetadata.subjects[2], '5to Año', 'Eje temático.')
            ]),
            new Event(this.nextId, 'Día de la Danta', '#EF6423', 'https://ecosistemas.ovacen.com/wp-content/uploads/2018/02/ecosistema-manglar.jpg', 'https://ecosistemas.ovacen.com/wp-content/uploads/2018/02/ecosistema-manglar.jpg', '0', 'Admin', 'McUsername', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', new Date()),
            new Event(this.nextId, 'Día del Agua', '#EF6423', 'https://ecosistemas.ovacen.com/wp-content/uploads/2018/02/ecosistema-manglar.jpg', 'https://ecosistemas.ovacen.com/wp-content/uploads/2018/02/ecosistema-manglar.jpg', '0', 'Admin', 'McUsername', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', new Date()),
            new Event(this.nextId, 'Día del Árbol', '#EF6423', 'https://ecosistemas.ovacen.com/wp-content/uploads/2018/02/ecosistema-manglar.jpg', 'https://ecosistemas.ovacen.com/wp-content/uploads/2018/02/ecosistema-manglar.jpg', '0', 'Admin', 'McUsername', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', new Date())
        ];

        this.sections = [
            new TitleSection(this.nextId, 0, TitleSectionSize.H1, 'Título Grande'),
            new ImageSection(this.nextId, 1, 'Pie de foto', 'https://media.nationalgeographic.org/assets/photos/000/284/28446.jpg', 'Referencia'),
            new TitleSection(this.nextId, 2, TitleSectionSize.H2, 'Subtítulo'),
            new ParagraphSection(this.nextId, 3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'),
            new ActivitySection(this.nextId, 4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 30, 'Herramientas listadas acá'),
            new TitleSection(this.nextId, 5, TitleSectionSize.H2, 'Otro subtítulo'),
            new ParagraphSection(this.nextId, 6, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'),
            new YoutubeVideoSection(this.nextId, 7, 'https://www.youtube.com/watch?v=XqZsoesa55w')
        ];

        this.files = [
            new File(this.nextId, 'https://www.cs.ubc.ca/~gregor/teaching/papers/4+1view-architecture.pdf', 'PDF_Ejemplo.pdf', new Date(), 114688)
        ];

        this.questions = [
            this.generateQuestion('¿Esto es una pregunta?'),
            this.generateQuestion('¿Cómo se sintió al leer esa pregunta?'),
            this.generateQuestion('¿Y al leer esa otra?'),
        ];

        this.implementations = [
            new Implementation(this.nextId, false, false, new Date(), 23, new Location('Paraiso, Cartago', 80.123, 72.3), '1', 'Educator1', 'McUsername', this.implementables[0].id, this.implementables[0].name),
            new Implementation(this.nextId, false, true, new Date(), 23, new Location('Paraiso, Cartago', 80.123, 72.3), '1', 'Educator1', 'McUsername', this.implementables[0].id, this.implementables[0].name)
        ];
        this.answers = [
            new Answer(this.nextId, this.questions[0].id, '¿Esto es una pregunta?', 'Mal', Score.LOW),
            new Answer(this.nextId, this.questions[1].id, '¿Cómo se sintió al leer esa pregunta?', 'Regular', Score.AVERAGE),
            new Answer(this.nextId, this.questions[2].id, '¿Y al leer esa otra?', 'Muy bien', Score.VERY_HIGH)
        ];
        this.evidence = [
            new File(this.nextId, 'https://www.cs.ubc.ca/~gregor/teaching/papers/4+1view-architecture.pdf', 'PDF_Ejemplo.pdf', new Date(), 114688)
        ];
    }

    private generateQuestion(question: string): Question{
        const map: Map<Score, string> = new Map();
        map[Score.VERY_LOW] = 'Muy mal';
        map[Score.LOW] = 'Mal';
        map[Score.AVERAGE] = 'Regular';
        map[Score.HIGH] = 'Bien';
        map[Score.VERY_HIGH] = 'Muy bien';
        return new Question(this.nextId, question, map);
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

    async addEducatorRequest(request: IEducatorRequest): Promise<EducatorRequest>{
        const issued: Date = new Date();
        const state: EducatorRequestState = EducatorRequestState.PENDING;
        const request_: EducatorRequest = this.factory.getEducatorRequest(this.nextId, issued, state, request);
        this.requests.push(request_);
        return request_;
    }

    async getEducatorRequests(): Promise<EducatorRequest[]>{
        const requests: EducatorRequest[] = [];
        for(let request of this.requests)
            if(request.state === EducatorRequestState.PENDING)
                requests.push(request);
        return requests;
    }
    
    async updateEducatorRequestState(id: string, state: EducatorRequestState): Promise<EducatorRequest>{
        for(let request of this.requests){
            if(request.id === id){
                request.state = state;
                return request;
            }
        }
        throw new Error(DatabaseError.IMPLEMENTABLE_NOT_FOUND);
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
        const implementable_: Implementable = this.factory.getImplementable(this.nextId, implementable);
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
        const sections: Section[] = [...this.sections].sort((section1, section2) => 
            (section1.index > section2.index) ? 1 : -1
        );
        return sections;
    }
    
    async addSection(implementableId: string, section: ISection): Promise<Section>{
        this.getImplementable(implementableId);//checking for implementable existance
        const id: string = this.nextId;
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
    
    async getFiles(implementableId: string): Promise<File[]>{
        this.getImplementable(implementableId);//checking for implementable existance
        return this.files;
    }
    
    async addFile(implementableId: string, file: IFile): Promise<File>{
        this.getImplementable(implementableId);//checking for implementable existance
        const file_: File = this.factory.getFile(this.nextId, file);
        this.files.push(file_);
        return file_;
    }
    
    async deleteFile(implementableId: string, fileId: string): Promise<File>{
        this.getImplementable(implementableId);//checking for implementable existance
        for(let i = 0; i < this.files.length; i++)
            if(this.files[i].id === fileId)
                return this.files.splice(i, 1)[0];
        throw new Error(DatabaseError.FILE_NOT_FOUND);
    }

    async getQuestions(implementableId: string): Promise<Question[]>{
        this.getImplementable(implementableId);//checking for implementable existance
        return [...this.questions];
    }

    async addQuestion(implementableId: string, question: IQuestion): Promise<Question>{
        this.getImplementable(implementableId);//checking for implementable existance
        const question_: Question = this.factory.getQuestion(this.nextId, question);
        this.questions.push(question_);
        return question_;
    }

    async updateQuestion(implementableId: string, questionId: string, question: IQuestion): Promise<Question>{
        this.getImplementable(implementableId);//checking for implementable existance
        for(let i = 0; i < this.questions.length; i++){
            if(this.questions[i].id === questionId){
                const question_: Question = this.factory.getQuestion(questionId, question);
                this.questions.splice(i, 1, question_);
                return question_;
            }
        }
        throw new Error(DatabaseError.QUESTION_NOT_FOUND);
    }

    async deleteQuestion(implementableId: string, questionId: string): Promise<Question>{
        this.getImplementable(implementableId);//checking for implementable existance
        for(let i = 0; i < this.questions.length; i++)
            if(this.questions[i].id === questionId)
                return this.questions.splice(i, 1)[0];
        throw new Error(DatabaseError.QUESTION_NOT_FOUND);
    }

    async getImplementationsByUser(completed: boolean, userId: string): Promise<Implementation[]>{
        const implementations: Implementation[] = [];
        for(let implementation of this.implementations)
            if(implementation.educatorId === userId && implementation.completed === completed)
                implementations.push(implementation);
        return implementations;
    }

    async getImplementationsByImplementable(completed: boolean, implementableId: string): Promise<Implementation[]>{
        const implementations: Implementation[] = [];
        for(let implementation of this.implementations)
            if(implementation.implementableId === implementableId && implementation.completed === completed)
                implementations.push(implementation);
        return implementations;
    }

    private getImplementation(id: string): Implementation{
        for(let implementation of this.implementations)
            if(implementation.id === id)
                return implementation;
        throw new Error(DatabaseError.IMPLEMENTATION_NOT_FOUND);
    }

    async addImplementation(implementation: IImplementation): Promise<Implementation>{
        const implementation_: Implementation = this.factory.getImplementation(this.nextId, false, false, implementation);
        this.implementations.push(implementation_);
        return implementation_;
    }

    async updateImplementation(id: string, implementation: IImplementation): Promise<Implementation>{
        for(let i = 0; i < this.implementations.length; i++){
            if(this.implementations[i].id === id){
                const deleted: boolean = this.implementations[i].deleted;
                const completed: boolean = this.implementations[i].completed;
                const implementation_: Implementation = this.factory.getImplementation(id, deleted, completed, implementation);
                this.implementations.splice(i, 1, implementation_);
                return implementation_;
            }
        }
        throw new Error(DatabaseError.IMPLEMENTATION_NOT_FOUND);
    }

    async deleteImplementation(id: string): Promise<Implementation>{
        for(let i = 0; i < this.implementations.length; i++){
            if(this.implementations[i].id === id){
                this.implementations[i].deleted = true;
                return this.implementations[i];
            }
        }
        throw new Error(DatabaseError.IMPLEMENTATION_NOT_FOUND);
    }

    async completeImplementation(id: string): Promise<Implementation>{
        for(let i = 0; i < this.implementations.length; i++){
            if(this.implementations[i].id === id){
                this.implementations[i].completed = true;
                return this.implementations[i];
            }
        }
        throw new Error(DatabaseError.IMPLEMENTATION_NOT_FOUND);
    }

    async getAnswers(implementationId: string): Promise<Answer[]>{
        this.getImplementation(implementationId);//checking for implementation existance
        return [...this.answers];
    }

    async addAnswer(implementationId: string, answer: IAnswer): Promise<Answer>{
        this.getImplementation(implementationId);//checking for implementation existance
        const answer_: Answer = this.factory.getAnswer(this.nextId, answer);
        this.answers.push(answer_);
        return answer_;
    }

    async updateAnswer(implementationId: string, answerId: string, answer: IAnswer): Promise<Answer>{
        this.getImplementation(implementationId);//checking for implementation existance
        for(let i = 0; i < this.answers.length; i++){
            if(this.answers[i].id === answerId){
                const answer_: Answer = this.factory.getAnswer(answerId, answer);
                this.answers.splice(i, 1, answer_);
                return answer_;
            }
        }
        throw new Error(DatabaseError.ANSWER_NOT_FOUND);
    }

    async deleteAnswer(implementationId: string, answerId: string): Promise<Answer>{
        this.getImplementation(implementationId);//checking for implementation existance
        for(let i = 0; i < this.answers.length; i++)
            if(this.answers[i].id === answerId)
                return this.answers.splice(i, 1)[0];
        throw new Error(DatabaseError.ANSWER_NOT_FOUND);
    }

    async getEvidence(implementationId: string): Promise<File[]>{
        this.getImplementation(implementationId);//checking for implementation existance
        return [...this.evidence];
    }

    async addEvidence(implementationId: string, evidence: IFile): Promise<File>{
        this.getImplementation(implementationId);//checking for implementation existance
        const evidence_: File = this.factory.getFile(this.nextId, evidence);
        this.evidence.push(evidence_);
        return evidence_;
    }

    async deleteEvidence(implementationId: string, evidenceId: string): Promise<File>{
        this.getImplementation(implementationId);//checking for implementation existance
        for(let i = 0; i < this.evidence.length; i++)
            if(this.evidence[i].id === evidenceId)
                return this.evidence.splice(i, 1)[0];
        throw new Error(DatabaseError.EVIDENCE_NOT_FOUND);
    }
}