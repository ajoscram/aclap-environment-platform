import { IFile, File } from "../../models";

export abstract class Storage{
    upload: (path: string) => Promise<IFile>;
    delete: (file: File) => Promise<void>;
}

export enum StorageError{

}