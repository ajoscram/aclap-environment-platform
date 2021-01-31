import { IFile, File } from "../../models";

export abstract class Storage{
    upload: (file: any) => Promise<IFile>;
    delete: (file: File) => Promise<void>;
}

export enum StorageError{
    UPLOAD_ERROR = "StorageError.UPLOAD_ERROR",
    DELETE_ERROR = "StorageError.DELETE_ERROR"
}