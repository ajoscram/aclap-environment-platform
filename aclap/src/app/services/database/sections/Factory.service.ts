import { Injectable } from '@angular/core';
import ControlModule from '../../../modules/control/control.module';
import { ISection, Section, ActivitySection, ImageSection, YoutubeVideoSection, TitleSection, ParagraphSection, IModule, Module } from '../../../models';

@Injectable({
    providedIn: ControlModule
})
export class Factory{

    public getModule(id: string, module: IModule): Module{
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
            module.disciplines
        );
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
                iSection.questions
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