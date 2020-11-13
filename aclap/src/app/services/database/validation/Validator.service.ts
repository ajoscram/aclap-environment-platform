import { Injectable } from '@angular/core';
import ControlModule from '../../../modules/control/control.module';
import { ActivitySection, Administrator, Educator, Event, IActivitySection, IAdministrator, IDiscipline, IDisciplineMetadata, IEducator, IEvent, IFile, IImageSection, IImplementable, ImageSection, IModule, IParagraphSection, ISection, ISubject, ITitleSection, IUser, IYoutubeVideoSection, Module, ParagraphSection, TitleSection, YoutubeVideoSection } from '../../../models';

@Injectable({
    providedIn: ControlModule
})
export class Validator{
    private static readonly URL_REGEX: RegExp = /(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\/\w-]*)*\/?\??([^#\n\r]*)?#?([^\n\r]*)/;
    private static readonly EMAIL_REGEX: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    private static readonly PHONE_REGEX: RegExp = /^[[+][(][0-9]{1,4}[)]]?[/0-9]{8}$/;
    private static readonly COLOR_REGEX: RegExp = /^#[\dabcdefABCDEF]{6}$/;
    private static readonly OBJECT_TYPE: string = 'object';

    private validateNullOrUndefined(object: object){
        if(object === null || object === undefined)
            throw new Error(ValidatorError.IS_NULL_OR_UNDEFINED);
        try{
            if(typeof object === Validator.OBJECT_TYPE)
                Object.keys(object).forEach(key => { 
                    this.validateNullOrUndefined(object[key]);
                });
        } catch(error) {
            if(error instanceof Error && (<Error>error).message === ValidatorError.IS_NULL_OR_UNDEFINED)
                throw new Error(ValidatorError.HAS_NULL_OR_UNDEFINED_FIELDS);
            else{
                console.log(error);
                throw new Error(ValidatorError.RUNTIME_ERROR);
            }
        }
    }

    validateDisciplineMetadata(metadata: IDisciplineMetadata){
        this.validateNullOrUndefined(metadata);
    }
    

    private validateIAdministrator(administrator: IAdministrator){
        //no further validation needed
    }

    private validateIEducator(educator: IEducator){
        if(!Validator.PHONE_REGEX.test(educator.phone))
            throw new Error(ValidatorError.MALFORMED_PHONE);
        else if(educator.joined > new Date())
            throw new Error(ValidatorError.JOINED_CANT_BE_FUTURE);
    }

    validateIUser(user: IUser){
        this.validateNullOrUndefined(user);
        if(!Validator.URL_REGEX.test(user.imageUrl))
            throw new Error(ValidatorError.MALFORMED_URL)
        else if(!Validator.EMAIL_REGEX.test(user.email))
            throw new Error(ValidatorError.MALFORMED_EMAIL)

        //WARNING: The order of thesse if statements matters
        //since the checks could return false positives
        if(Educator.check(user))
            this.validateIEducator(user);
        else if(Administrator.check(user))
            this.validateIAdministrator(user);
        else
            throw new Error(ValidatorError.UNKNOWN_IUSER);
    }

    private validateSubject(subject: ISubject){
        if(!Validator.COLOR_REGEX.test(subject.color))
            throw new Error(ValidatorError.MALFORMED_COLOR);
    }

    private validateIEvent(event: IEvent){
        //no further validation needed
    }

    private validateIModule(module: IModule){
        if(module.recommendedAge < 0)
            throw new Error(ValidatorError.RECOMMENDED_AGE_LESS_THAN_ZERO);
        else if(module.recommendedAge % 1 !== 0)
            throw new Error(ValidatorError.RECOMMENDED_AGE_NOT_WHOLE_NUMBER);
        else if(module.publisherId === "")
            throw new Error(ValidatorError.EMPTY_PUBLISHER_ID);
        
        for(let discipline of module.disciplines)
            this.validateSubject(discipline.subject);
    }

    validateIImplementable(implementable: IImplementable){
        this.validateNullOrUndefined(implementable);
        if(!Validator.COLOR_REGEX.test(implementable.color))
            throw new Error(ValidatorError.MALFORMED_COLOR);
        else if(!Validator.URL_REGEX.test(implementable.imageUrl))
            throw new Error(ValidatorError.MALFORMED_URL);
        else if(!Validator.URL_REGEX.test(implementable.bannerImageUrl))
            throw new Error(ValidatorError.MALFORMED_URL);
        
        if(Module.check(implementable))
            this.validateIModule(implementable);
        else if(Event.check(implementable))
            this.validateIEvent(implementable);
        else
            throw new Error(ValidatorError.UNKNOWN_IIMPLEMENTABLE);
    }

    private validateIActivitySection(section: IActivitySection){
        if(section.estimatedMinutes < 0)
            throw new Error(ValidatorError.ESTIMATED_MINUTES_LESS_THAN_ZERO);
    }
    
    private validateIImageSection(section: IImageSection){
        if(!Validator.URL_REGEX.test(section.url))
            throw new Error(ValidatorError.MALFORMED_URL);
    }

    private validateITitleSection(section: ITitleSection){
        //no further validation needed
    }

    private validateIParagraphSection(section: IParagraphSection){
        //no further validation needed
    }

    private validateIYoutubeVideoSection(section: IYoutubeVideoSection){
        if(!Validator.URL_REGEX.test(section.url))
            throw new Error(ValidatorError.MALFORMED_URL);
    }

    validateISection(section: ISection){
        this.validateNullOrUndefined(section);
        if(section.index < 0)
            throw new Error(ValidatorError.INDEX_LESS_THAN_ZERO);

        //WARNING: The order of thesse if statements matters
        //since the checks could return false positives
        if(ActivitySection.check(section))
            this.validateIActivitySection(section);
        else if(ImageSection.check(section))
            this.validateIImageSection(section);
        else if(TitleSection.check(section))
            this.validateITitleSection(section);
        else if(ParagraphSection.check(section))
            this.validateIParagraphSection(section);
        else if(YoutubeVideoSection.check(section))
            this.validateIYoutubeVideoSection(section);
        else
            throw new Error(ValidatorError.UNKNOWN_ISECTION);
    }

    validateIFile(file: IFile){
        this.validateNullOrUndefined(file);
        if(file.uploaded > new Date())
            throw new Error(ValidatorError.UPLOADED_CANT_BE_FUTURE);
        else if(file.bytes < 0)
            throw new Error(ValidatorError.BYTES_LESS_THAN_ZERO);
        else if(!Validator.URL_REGEX.test(file.url))
            throw new Error(ValidatorError.MALFORMED_URL);
    }
}

export enum ValidatorError{
    IS_NULL_OR_UNDEFINED = "ValidatorError.IS_NULL_OR_UNDEFINED",
    HAS_NULL_OR_UNDEFINED_FIELDS = "ValidatorError.HAS_NULL_OR_UNDEFINED_FIELDS",
    RUNTIME_ERROR = "ValidatorError.RUNTIME_ERROR",
    MALFORMED_COLOR = "ValidatorError.MALFORMED_COLOR",
    MALFORMED_URL = "ValidatorError.MALFORMED_URL",
    MALFORMED_EMAIL = "ValidatorError.MALFORMED_EMAIL",
    MALFORMED_PHONE = "ValidatorError.MALFORMED_PHONE",
    RECOMMENDED_AGE_LESS_THAN_ZERO = "ValidatorError.RECOMMENDED_AGE_LESS_THAN_ZERO",
    RECOMMENDED_AGE_NOT_WHOLE_NUMBER = "ValidatorError.RECOMMENDED_AGE_NOT_WHOLE_NUMBER",
    BYTES_LESS_THAN_ZERO = "ValidatorError.BYTES_LESS_THAN_ZERO",
    INDEX_LESS_THAN_ZERO = "ValidatorError.INDEX_LESS_THAN_ZERO",
    ESTIMATED_MINUTES_LESS_THAN_ZERO = "ValidatorError.ESTIMATED_MINUTES_LESS_THAN_ZERO",
    EMPTY_PUBLISHER_ID = "ValidatorError.EMPTY_PUBLISHER_ID",
    JOINED_CANT_BE_FUTURE = "ValidatorError.JOINED_CANT_BE_FUTURE",
    UPLOADED_CANT_BE_FUTURE = "ValidatorError.UPLOADED_CANT_BE_FUTURE",
    DATE_CANT_BE_PAST = "ValidatorError.DATE_CANT_BE_PAST",
    UNKNOWN_IUSER = "ValidatorError.UNKNOWN_IUSER",
    UNKNOWN_ISECTION = "ValidatorError.UNKNOWN_ISECTION",
    UNKNOWN_IIMPLEMENTABLE = "ValidatorError.UNKNOWN_IIMPLEMENTABLE"
}