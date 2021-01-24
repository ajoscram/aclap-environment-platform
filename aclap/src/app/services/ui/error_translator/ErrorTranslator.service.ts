import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { errors } from './errors';
import ControlModule from '../../../modules/control/control.module';

@Injectable({
    providedIn: ControlModule
})
export class ErrorTranslator{
    public static readonly DEVELOPMENT_DEFAULT_HEADER: string = "(DEVMODE - SHOWING ORIGINAL ERROR)\n\n";
    public static readonly PRODUCTION_DEFAULT_HEADER: string = "Oops! Este error imprevisto acaba de ocurrir:\n\n";

    constructor(){ }

    private getError(message: string): string{
        const source: string = message.split('.')[0];
        const code: string = message.split('.')[1];
        if(environment.production && errors[source][code])
            return errors[source][code];
        else
            throw 'error not found';
    }

    private getDefault(message: string): string{
        if(environment.production)
            return ErrorTranslator.PRODUCTION_DEFAULT_HEADER + message;
        else
            return ErrorTranslator.DEVELOPMENT_DEFAULT_HEADER + message;
    }

    translate(error: Error): string{
        const message: string = error.message;        
        try{
            return this.getError(message);
        } catch(error) {
            return this.getDefault(message);
        }
    }
}