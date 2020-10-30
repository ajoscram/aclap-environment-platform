import { Injectable } from '@angular/core';
import ControlModule from '@src/app/modules/control/control.module.tns';
import { IDisciplineMetadata, IFile, IModule, ISection, IUser } from '../../../models';

@Injectable({
    providedIn: ControlModule
})
export class Validator{
    validateDisciplineMetadata(metadata: IDisciplineMetadata){}
    validateIModule(module: IModule){}
    validateIUser(user: IUser){}
    validateISection(section: ISection){}
    validateIFile(file: IFile){}
}

export enum ValidatorError{}