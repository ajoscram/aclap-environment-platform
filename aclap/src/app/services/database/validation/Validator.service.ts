import { Injectable } from '@angular/core';
import ControlModule from '@src/app/modules/control/control.module.tns';
import { IModule, ISection } from '../../../models';

@Injectable({
    providedIn: ControlModule
})
export class Validator{
    validateIModule(module: IModule): void{ }
}

export enum ValidatorError{}