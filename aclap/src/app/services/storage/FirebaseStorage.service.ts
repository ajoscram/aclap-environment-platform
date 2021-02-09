import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';
import { IFile, File as File_ } from '@src/app/models';
import ControlModule from '@src/app/modules/control/control.module';
import { Storage, StorageError } from './Storage.service';

@Injectable({
    providedIn: ControlModule
})
export class FirebaseStorage implements Storage{

    constructor(
        private storage: AngularFireStorage
    ){}

    async upload(file: any): Promise<IFile>{
        try{
            const file_: File = file;
            const path: string = new Date().getTime() + file_.name;
            const task: UploadTaskSnapshot = await this.storage.upload(path, file_);
            const url: string = await task.ref.getDownloadURL();
            return {
                url: url,
                name: file_.name,
                uploaded: new Date(),
                bytes: file_.size
            };
        } catch(error){
            console.error(error);
            throw new Error(StorageError.UPLOAD_ERROR);
        }
    }

    async delete(file: File_): Promise<void>{
        try{
            await this.storage.ref(file.url).delete().toPromise();
        } catch(error){
            throw new Error(StorageError.DELETE_ERROR);
        }
    }
}