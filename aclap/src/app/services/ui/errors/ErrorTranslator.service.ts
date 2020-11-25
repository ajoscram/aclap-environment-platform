import { Injectable } from '@angular/core';
import ControlModule from '../../../modules/control/control.module';

@Injectable({
    providedIn: ControlModule
})
export class ErrorTransalator{
    private messages: object;
    private default: string;

    constructor(){
        this.messages = MESSAGES;
        this.default = this.messages["DEFAULT"];
    }

    translate(error: string): string{
        const translated: string = this.messages[error];
        if(translated)
            return translated;
        else
            return this.default + error;
    }
}

const MESSAGES: object = {
    DEFAULT: "DEFAULT:\n\n"
}