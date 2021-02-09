import { Injectable } from '@angular/core';
import { IFile, File as File_ } from '@src/app/models';
import ControlModule from '@src/app/modules/control/control.module';
import { Storage, StorageError } from './Storage.service';
import { File } from '@nativescript/core/file-system';
import { storage } from '@nativescript/firebase';

@Injectable({
    providedIn: ControlModule
})
export class FirebaseStorage implements Storage{

    constructor(){}

    async upload(file: any): Promise<IFile>{
        try{
            const localPath: string = <string>file;
            const file_: File = File.fromPath(localPath);
            const remotePath: string = new Date().getTime() + file_.name;
            await storage.uploadFile({
                localFile: file_,
                remoteFullPath: remotePath
            });
            const url: string = await storage.getDownloadUrl({
                remoteFullPath: remotePath
            });
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
            //TODO: implement this here thang
            console.log(file.url);
        } catch(error) {
            console.error(error);
            throw new Error(StorageError.DELETE_ERROR);
        }
        throw new Error('not implemented yet');
    }
}