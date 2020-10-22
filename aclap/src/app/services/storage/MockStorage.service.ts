import { isFileOrResourcePath } from '@nativescript/core/image-source';
import { IFile, File } from '@src/app/models';
import { Storage } from './Storage.service'

export class MockStorage implements Storage{

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