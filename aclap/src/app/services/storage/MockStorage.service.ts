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
            url: "https://ak.picdn.net/shutterstock/videos/2028055/thumb/1.jpg",
            name: "example.jpg",
            uploaded: new Date(),
            bytes: 36000
        };
    }

    async delete(file: File): Promise<void>{ }
}