import { Injectable } from '@angular/core';
import ControlModule from '../../../modules/control/control.module';
import { ISection, Section, ActivitySection, ImageSection, YoutubeVideoSection, TitleSection, ParagraphSection, IModule, Module, IQuestion, Question, IDiscipline, Discipline, Subject, ISubject } from '../../../models';

@Injectable({
    providedIn: ControlModule
})
export class Factory{

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

    public getModule(id: string, module: IModule): Module{
        const disciplines: Discipline[] = this.getDisciplines(module.disciplines);
        return new Module(
            id,
            module.name,
            module.$imageUrl,
            module.publisherId,
            module.publisherName,
            module.publisherLastname,
            module.recommendedAge,
            module.objectives,
            module.requirements,
            disciplines
        );
    }

    private getQuestions(questions: IQuestion[]): Question[]{
        const questions_: Question[] = [];
        for(let question of questions)
            questions_.push(new Question(question.question, question.options))
        return questions_;
    }

    public getSection(id: string, iSection: ISection): Section{
        //THE ORDER OF THESE IF STATEMENTS MATTERS
        //SINCE THE CHECKS COULD RETURN FALSE POSITIVES
        if(!iSection)
            throw new Error(FactoryError.NULL_OR_UNDEFINED_ISECTION);
        if(ActivitySection.check(iSection))
            return new ActivitySection(
                id,
                iSection.index,
                iSection.description,
                iSection.estimatedMinutes,
                iSection.tools,
                this.getQuestions(iSection.questions)
            );
        if(ImageSection.check(iSection))
            return new ImageSection(
                id,
                iSection.index,
                iSection.footing,
                iSection.$url,
                iSection.reference,
            );
        if(TitleSection.check(iSection))
            return new TitleSection(
                id,
                iSection.index,
                iSection.size,
                iSection.text
            );
        if(ParagraphSection.check(iSection))
            return new ParagraphSection(
                id,
                iSection.index,
                iSection.text
            );
        if(YoutubeVideoSection.check(iSection))
            return new YoutubeVideoSection(
                id,
                iSection.index,
                iSection.url
            );
        throw new Error(FactoryError.UNKNOWN_ISECTION);
    }
}

export enum FactoryError{
    NULL_OR_UNDEFINED_ISECTION = "SectionFactoryError.NULL_ISECTION",
    UNKNOWN_ISECTION = "SectionFactoryError.UNKNOWN_ISECTION"
}