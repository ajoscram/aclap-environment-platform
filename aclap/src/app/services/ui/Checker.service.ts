import { Injectable } from '@angular/core';
import { Section, ActivitySection, ImageSection, ParagraphSection, TitleSection, YoutubeVideoSection } from '../../models';
import ControlModule from '../../modules/control/control.module';
import { Role } from '../authentication/Session.model';

@Injectable({
    providedIn: ControlModule
})
export class Checker{
    
    //roles
    isAdminisrator(role: Role): role is Role.ADMINISTRATOR{
        return role === Role.ADMINISTRATOR;
    }

    isEducator(role: Role): role is Role.EDUCATOR{
        return role === Role.EDUCATOR;
    }

    //sections
    isActivitySection(section: Section): section is ActivitySection{
        return section instanceof ActivitySection;
    }

    isImageSection(section: Section): section is ImageSection{
        return section instanceof ImageSection;
    }

    isParagraphSection(section: Section): section is ParagraphSection{
        return section instanceof ParagraphSection;
    }

    isTitleSection(section: Section): section is TitleSection{
        return section instanceof TitleSection;
    }

    isYoutubeVideoSection(section: Section): section is YoutubeVideoSection{
        return section instanceof YoutubeVideoSection;
    }
}