import { Injectable } from '@angular/core';
import { IFile, File } from '@src/app/models';
import ControlModule from '../../modules/control.module';
import { Storage } from './Storage.service'

@Injectable({
    providedIn: ControlModule
})
export class MockStorage implements Storage{

    constructor(){}

    async upload(path: string): Promise<IFile>{
        return {
            url: "https://www.cs.ubc.ca/~gregor/teaching/papers/4+1view-architecture.pdf",
            name: "4+1view-architecture.pdf",
            uploaded: new Date(),
            bytes: 114688
        };
    }

    async delete(file: File): Promise<void>{ }
}