import { Injectable } from '@angular/core';
import ControlModule from '@src/app/modules/control/control.module';
import { CommonPathfinder } from './CommonPathfinder.service';

@Injectable({
    providedIn: ControlModule
})
export class Pathfinder extends CommonPathfinder{

    private static readonly FILE_IDENTIFIER = 'file://';

    protected isPath(input: string): boolean {
        return input.startsWith(Pathfinder.FILE_IDENTIFIER);
    }
}