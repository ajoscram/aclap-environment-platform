import { IFile } from "../../models";

export abstract class Storage{
    upload: (bytes: any) => IFile;
    download: (source: string | File) => any;
}

export enum StorageError{

}