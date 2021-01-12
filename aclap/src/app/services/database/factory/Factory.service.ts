import { Injectable } from '@angular/core';
import ControlModule from '../../../modules/control/control.module';
import { ISection, Section, ActivitySection, ImageSection, YoutubeVideoSection, TitleSection, ParagraphSection, IModule, Module, IQuestion, Question, IDiscipline, Discipline, Subject, ISubject, IUser, IDisciplineMetadata, DisciplineMetadata, Educator, Administrator, User, IFile, File, IImplementable, Implementable, Event, IEvent, IEducatorRequest, Location, EducatorRequest, ILocation, EducatorRequestState, IImplementation, Implementation, IAnswer, Answer } from '../../../models';

@Injectable({
    providedIn: ControlModule
})
export class Factory{

    public getDisciplineMetadata(metadata: IDisciplineMetadata): DisciplineMetadata{
        const subjects: ISubject[] = [];
        for(let subject of metadata.subjects){
            const subject_: Subject = this.getSubject(subject);
            subjects.push(subject_);
        }
        return new DisciplineMetadata(subjects, metadata.years);
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

    private getLocation(location: ILocation): Location{
        return new Location(location.name, location.latitude, location.longitude);
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

    private getSubject(subject: ISubject): Subject{
        return new Subject(subject.name, subject.color);
    }

    private getDisciplines(disciplines: IDiscipline[]): Discipline[]{
        const disciplines_: Discipline[] = [];
        for(let discipline of disciplines){
            const subject: Subject = this.getSubject(discipline.subject);
            disciplines_.push(new Discipline(subject, discipline.year, discipline.theme));
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

    private getEvent(id: string, event: IEvent){
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

    public getImplementable(id: string, implementable: IImplementable): Implementable{
        if(Module.check(implementable))
            return this.getModule(id, implementable);
        else if(Event.check(implementable))
            return this.getEvent(id, implementable);
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

    public getFile(id: string, file: IFile): File{
        return new File(
            id,
            file.url,
            file.name,
            file.uploaded,
            file.bytes
        );
    }

    public getQuestion(id: string, question: IQuestion): Question{
        return new Question(
            id,
            question.question,
            question.options
        );
    }

    public getImplementation(id: string, deleted: boolean, completed: boolean, implementation: IImplementation): Implementation{
        return new Implementation(
            id,
            deleted,
            completed,
            implementation.date,
            implementation.participants,
            this.getLocation(implementation.location),
            implementation.educatorId,
            implementation.educatorName,
            implementation.educatorLastname,
            implementation.implementableId,
            implementation.implementableName
        );
    }

    public getAnswer(id: string, answer: IAnswer){
        return new Answer(
            id,
            answer.questionId,
            answer.question,
            answer.option,
            answer.score
        );
    }
}

export enum FactoryError{
    UNKNOWN_IUSER = "FactoryError.UNKNOWN_IUSER",
    UNKNOWN_ISECTION = "FactoryError.UNKNOWN_ISECTION",
    UNKNOWN_IIMPLEMENTABLE = "FactoryError.UNKNOWN_IIMPLEMENTABLE"
}