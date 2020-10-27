import { Injectable } from '@angular/core';
import ControlModule from '@src/app/modules/control/control.module';
import { CommonPathfinder } from './CommonPathfinder.service';

@Injectable({
    providedIn: ControlModule
})
export class Pathfinder extends CommonPathfinder{
    protected isPath(input: string): boolean {
        throw new Error('not implemented yet');
    }
}