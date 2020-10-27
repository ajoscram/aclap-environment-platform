import { IFile, File } from '@src/app/models';
import { Storage } from './Storage.service';

export class FirebaseStorage implements Storage{
    upload: (path: string) => Promise<IFile>;
    delete: (file: File) => Promise<void>;
}