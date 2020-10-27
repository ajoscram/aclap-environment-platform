import { Injectable } from '@angular/core';
import { ISection, Section, ActivitySection, ImageSection, YoutubeVideoSection, TitleSection, ParagraphSection } from '@src/app/models';
import ControlModule from '@src/app/modules/control/control.module';

@Injectable({
    providedIn: ControlModule
})
export class SectionFactory{
    public getSection(iSection: ISection): Section{
        //THE ORDER OF THESE IF STATEMENTS MATTERS
        //SINCE THE CHECKS COULD RETURN FALSE POSITIVES
        if(!iSection)
            throw new Error(SectionFactoryError.NULL_OR_UNDEFINED_ISECTION);
        if(ActivitySection.check(iSection))
            return new ActivitySection(
                null,
                iSection.index,
                iSection.description,
                iSection.estimatedMinutes,
                iSection.tools,
                iSection.questions
            );
        if(ImageSection.check(iSection))
            return new ImageSection(
                null,
                iSection.index,
                iSection.footing,
                iSection.$url,
                iSection.reference,
            );
        if(TitleSection.check(iSection))
            return new TitleSection(
                null,
                iSection.index,
                iSection.size,
                iSection.text
            );
        if(ParagraphSection.check(iSection))
            return new ParagraphSection(
                null,
                iSection.index,
                iSection.text
            );
        if(YoutubeVideoSection.check(iSection))
            return new YoutubeVideoSection(
                null,
                iSection.index,
                iSection.url
            );
        throw new Error(SectionFactoryError.UNKNOWN_ISECTION);
    }
}

export enum SectionFactoryError{
    NULL_OR_UNDEFINED_ISECTION = "SectionFactoryError.NULL_ISECTION",
    UNKNOWN_ISECTION = "SectionFactoryError.UNKNOWN_ISECTION"
}