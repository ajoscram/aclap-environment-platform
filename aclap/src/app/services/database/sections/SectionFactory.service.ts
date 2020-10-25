import { Injectable } from '@angular/core';
import { ISection, Section, IActivitySection, ActivitySection, IImageSection, ImageSection, IParagraphSection, ITitleSection, YoutubeVideoSection, IYoutubeVideoSection, TitleSection, ParagraphSection } from '@src/app/models';
import ControlModule from '@src/app/modules/control.module';

@Injectable({
    providedIn: ControlModule
})
export class SectionFactory{
    public getSection(iSection: ISection): Section{
        //THE ORDER OF THESE IF STATEMENTS MATTERS
        //SINCE THE CHECKS COULD RETURN FALSE POSITIVES
        if(iSection == null)
            throw new Error(SectionFactoryError.NULL_ISECTION);
        if(iSection == undefined)
            throw new Error(SectionFactoryError.UNDEFINED_ISECTION);
        if(this.checkActivity(iSection))
            return new ActivitySection(
                null,
                iSection.index,
                iSection.description,
                iSection.estimatedMinutes,
                iSection.tools,
                iSection.questions
            );
        if(this.checkImage(iSection))
            return new ImageSection(
                null,
                iSection.index,
                iSection.footing,
                iSection.reference,
                iSection.$url
            );
        if(this.checkTitle(iSection))
            return new TitleSection(
                null,
                iSection.index,
                iSection.size,
                iSection.text
            );
        if(this.checkParagraph(iSection))
            return new ParagraphSection(
                null,
                iSection.index,
                iSection.text
            );
        if(this.checkYoutubeVideoSection(iSection))
            return new YoutubeVideoSection(
                null,
                iSection.index,
                iSection.url
            );
        throw new Error(SectionFactoryError.UNKNOWN_ISECTION);
    }

    private checkActivity(section: ISection): section is IActivitySection{
        return (section as IActivitySection).description !== undefined &&
            (section as IActivitySection).estimatedMinutes !== undefined &&
            (section as IActivitySection).questions !== undefined &&
            (section as IActivitySection).tools !== undefined;
    }

    private checkImage(section: ISection): section is IImageSection{
        return (section as IImageSection).footing !== undefined &&
            (section as IImageSection).reference !== undefined &&
            (section as IImageSection).$url !== undefined;
    }

    private checkTitle(section: ISection): section is ITitleSection{
        return (section as ITitleSection).size !== undefined &&
            (section as ITitleSection).text !== undefined;
    }

    private checkParagraph(section: ISection): section is IParagraphSection{
        return (section as IParagraphSection).text !== undefined;
    }

    private checkYoutubeVideoSection(section: ISection): section is IYoutubeVideoSection{
        return (section as IYoutubeVideoSection).url !== undefined;
    }
}

export enum SectionFactoryError{
    NULL_ISECTION = "SectionFactoryError.NULL_ISECTION",
    UNDEFINED_ISECTION = "SectionFactoryError.UNDEFINED_ISECTION",
    UNKNOWN_ISECTION = "SectionFactoryError.UNKNOWN_ISECTION"
}