import { Injectable } from '@angular/core';
import ControlModule from '../../../modules/control/control.module';
import { ISection, Section, ActivitySection, ImageSection, YoutubeVideoSection, TitleSection, ParagraphSection, IModule, Module, IQuestion, Question, IDiscipline, Discipline, Subject, ISubject, IUser, IDisciplineMetadata, DisciplineMetadata, Educator, Administrator, User, IFile, File, IImplementable, Implementable, Event, IEvent, IEducatorRequest, Location, EducatorRequest, ILocation, EducatorRequestState, IImplementation, Implementation, IAnswer, Answer, IAlly, Ally, IActivitySection, IImageSection, ITitleSection, IParagraphSection, IYoutubeVideoSection, IEducator, IAdministrator } from '../../../models';

@Injectable({
    providedIn: ControlModule
})
export class Factory{

    private getSubject(subject: ISubject): Subject{
        return new Subject(subject.name, subject.color);
    }

    private getISubject(subject: ISubject): ISubject{
        return {
            name: subject.name,
            color: subject.color
        };
    }

    public getDisciplineMetadata(metadata: IDisciplineMetadata): DisciplineMetadata{
        const subjects: Subject[] = [];
        for(let subject of metadata.subjects){
            const subject_: Subject = this.getSubject(subject);
            subjects.push(subject_);
        }
        return new DisciplineMetadata(subjects, metadata.years);
    }

    public getIDisciplineMetadata(metadata: IDisciplineMetadata): IDisciplineMetadata{
        const subjects: ISubject[] = [];
        for(let subject of metadata.subjects){
            const subject_: ISubject = this.getISubject(subject);
            subjects.push(subject_);
        }
        return {
            subjects: subjects,
            years: metadata.years
        };
    }

    private getLocation(location: ILocation): Location{
        return new Location(location.name, location.latitude, location.longitude);
    }

    private getILocation(location: ILocation): ILocation{
        return {
            name: location.name,
            latitude: location.latitude,
            longitude: location.longitude
        };
    }

    public getUser(id: string, user: IUser): User{
        if(Educator.check(user))
            return new Educator(
                id,
                user.imageUrl,
                user.name,
                user.lastname,
                user.email,
                user.phone,
                this.getLocation(user.address),
                user.birthday,
                user.organization,
                user.joined
            );
        //WARNING: IUser and Administrator have the same fields!
        //Every user checks out as an administrator
        else if(Administrator.check(user))
            return new Administrator(
                id,
                user.imageUrl,
                user.name,
                user.lastname,
                user.email
            );
        else
            throw new Error(FactoryError.UNKNOWN_IUSER);
    }

    public getIUser(user: IUser): IUser{
        if(Educator.check(user))
            return <IEducator>{
                imageUrl: user.imageUrl,
                name: user.name,
                lastname: user.lastname,
                email: user.email,
                phone: user.phone,
                address: this.getILocation(user.address),
                birthday: user.birthday,
                organization: user.organization,
                joined: user.joined
            };
        //WARNING: IUser and Administrator have the same fields!
        //Every user checks out as an administrator
        else if(Administrator.check(user))
            return <IAdministrator>{
                imageUrl: user.imageUrl,
                name: user.name,
                lastname: user.lastname,
                email: user.email
            };
        else
            throw new Error(FactoryError.UNKNOWN_IUSER);
    }

    public getEducatorRequest(id: string, issued: Date, state: EducatorRequestState, request: IEducatorRequest): EducatorRequest{
        return new EducatorRequest(
            id,
            request.name,
            request.lastname,
            request.email,
            request.phone,
            this.getLocation(request.address),
            request.birthday,
            request.organization,
            issued,
            state
        );
    }

    public getIEducatorRequest(request: IEducatorRequest): IEducatorRequest{
        return {
            name: request.name,
            lastname: request.lastname,
            email: request.email,
            phone: request.phone,
            address: this.getILocation(request.address),
            birthday: request.birthday,
            organization: request.organization
        };
    }

    private getDisciplines(disciplines: IDiscipline[]): Discipline[]{
        const disciplines_: Discipline[] = [];
        for(let discipline of disciplines){
            const subject: Subject = this.getSubject(discipline.subject);
            disciplines_.push(new Discipline(subject, discipline.year, discipline.theme));
        }
        return disciplines_;
    }

    private getIDisciplines(disciplines: IDiscipline[]): IDiscipline[]{
        const disciplines_: IDiscipline[] = [];
        for(let discipline of disciplines){
            disciplines_.push({
                subject: this.getISubject(discipline.subject),
                year: discipline.year,
                theme: discipline.theme
            });
        }
        return disciplines_;
    }

    private getModule(id: string, module: IModule): Module{
        const disciplines: Discipline[] = this.getDisciplines(module.disciplines);
        return new Module(
            id,
            module.name,
            module.color,
            module.imageUrl,
            module.bannerImageUrl,
            module.publisherId,
            module.publisherName,
            module.publisherLastname,
            module.recommendedAge,
            module.objective,
            module.antecedents,
            disciplines
        );
    }

    private getIModule(module: IModule): IModule{
        return {
            name: module.name,
            color: module.color,
            imageUrl: module.imageUrl,
            bannerImageUrl: module.bannerImageUrl,
            publisherId: module.publisherId,
            publisherName: module.publisherName,
            publisherLastname: module.publisherLastname,
            objective: module.objective,
            antecedents: module.antecedents,
            recommendedAge: module.recommendedAge,
            disciplines: this.getIDisciplines(module.disciplines)
        }
    }

    private getEvent(id: string, event: IEvent): Event{
        return new Event(
            id,
            event.name,
            event.color,
            event.imageUrl,
            event.bannerImageUrl,
            event.publisherId,
            event.publisherName,
            event.publisherLastname,
            event.objective,
            event.date
        );
    }

    private getIEvent(event: IEvent): IEvent{
        return{
            name: event.name,
            color: event.color,
            imageUrl: event.imageUrl,
            bannerImageUrl: event.bannerImageUrl,
            publisherId: event.publisherId,
            publisherName: event.publisherName,
            publisherLastname: event.publisherLastname,
            objective: event.objective,
            date: event.date
        };
    }

    public getImplementable(id: string, implementable: IImplementable): Implementable{
        if(Module.check(implementable))
            return this.getModule(id, implementable);
        else if(Event.check(implementable))
            return this.getEvent(id, implementable);
        else
            throw new Error(FactoryError.UNKNOWN_IIMPLEMENTABLE);
    }

    public getIImplementable(implementable: IImplementable): IImplementable{
        if(Module.check(implementable))
            return this.getIModule(implementable);
        else if(Event.check(implementable))
            return this.getIEvent(implementable);
        else
            throw new Error(FactoryError.UNKNOWN_IIMPLEMENTABLE);
    }

    public getSection(id: string, section: ISection): Section{
        //WARNING: The order of thesse if statements matters
        //since the checks could return false positives
        if(ActivitySection.check(section))
            return new ActivitySection(
                id,
                section.index,
                section.description,
                section.estimatedMinutes,
                section.tools
            );
        else if(ImageSection.check(section))
            return new ImageSection(
                id,
                section.index,
                section.footing,
                section.url,
                section.reference,
            );
        else if(TitleSection.check(section))
            return new TitleSection(
                id,
                section.index,
                section.size,
                section.text
            );
        else if(ParagraphSection.check(section))
            return new ParagraphSection(
                id,
                section.index,
                section.text
            );
        else if(YoutubeVideoSection.check(section))
            return new YoutubeVideoSection(
                id,
                section.index,
                section.url
            );
        else
            throw new Error(FactoryError.UNKNOWN_ISECTION);
    }

    public getISection(section: ISection): ISection{
        //WARNING: The order of thesse if statements matters
        //since the checks could return false positives
        if(ActivitySection.check(section))
            return <IActivitySection>{
                index: section.index,
                description: section.description,
                estimatedMinutes: section.estimatedMinutes,
                tools: section.tools
            };
        else if(ImageSection.check(section))
            return <IImageSection>{
                index: section.index,
                footing: section.footing,
                url: section.url,
                reference: section.reference,
            };
        else if(TitleSection.check(section))
            return <ITitleSection>{
                index: section.index,
                size: section.size,
                text: section.text
            };
        else if(ParagraphSection.check(section))
            return <IParagraphSection>{
                index: section.index,
                text: section.text
            };
        else if(YoutubeVideoSection.check(section))
            return <IYoutubeVideoSection>{
                index: section.index,
                url: section.url
            };
        else
            throw new Error(FactoryError.UNKNOWN_ISECTION);
    }

    public getFile(id: string, file: IFile): File{
        return new File(
            id,
            file.url,
            file.name,
            file.uploaded,
            file.bytes
        );
    }

    public getIFile(file: IFile): IFile{
        return {
            url: file.url,
            name: file.name,
            uploaded: file.uploaded,
            bytes: file.bytes
        }
    }

    public getQuestion(id: string, question: IQuestion): Question{
        return new Question(
            id,
            question.question,
            question.options
        );
    }

    public getIQuestion(question: IQuestion): IQuestion{
        return {
            question: question.question,
            options: question.options
        }
    }

    public getImplementation(id: string, deleted: boolean, completed: boolean, implementation: IImplementation): Implementation{
        return new Implementation(
            id,
            deleted,
            completed,
            implementation.date,
            implementation.maleParticipants,
            implementation.femaleParticipants,
            implementation.otherParticipants,
            this.getLocation(implementation.location),
            implementation.educatorId,
            implementation.educatorName,
            implementation.educatorLastname,
            implementation.implementableId,
            implementation.implementableName
        );
    }

    public getIImplementation(implementation: IImplementation): IImplementation{
        return {
            date: implementation.date,
            maleParticipants: implementation.maleParticipants,
            femaleParticipants: implementation.femaleParticipants,
            otherParticipants: implementation.otherParticipants,
            location: this.getILocation(implementation.location),
            educatorId: implementation.educatorId,
            educatorName: implementation.educatorName,
            educatorLastname: implementation.educatorLastname,
            implementableId: implementation.implementableId,
            implementableName: implementation.implementableName
        };
    }

    public getAnswer(id: string, answer: IAnswer): Answer{
        return new Answer(
            id,
            answer.questionId,
            answer.question,
            answer.option,
            answer.score
        );
    }

    public getIAnswer(answer: IAnswer): IAnswer{
        return {
            questionId: answer.questionId,
            question: answer.question,
            option: answer.option,
            score: answer.score
        };
    }

    public getAlly(id: string, ally: IAlly): Ally{
        return new Ally(
            id,
            ally.name,
            ally.imageUrl,
            ally.link
        );
    }

    public getIAlly(ally: IAlly): IAlly{
        return {
            name: ally.name,
            imageUrl: ally.imageUrl,
            link: ally.link
        };
    }
}

export enum FactoryError{
    UNKNOWN_IUSER = "FactoryError.UNKNOWN_IUSER",
    UNKNOWN_ISECTION = "FactoryError.UNKNOWN_ISECTION",
    UNKNOWN_IIMPLEMENTABLE = "FactoryError.UNKNOWN_IIMPLEMENTABLE"
}