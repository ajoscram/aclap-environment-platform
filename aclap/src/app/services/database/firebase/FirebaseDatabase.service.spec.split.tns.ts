import { Database } from '../Database.service';
import { Factory } from '../factory/Factory.service';
import { FirebaseDatabase } from './FirebaseDatabase.service';
import { Validator } from '../validation/Validator.service';

export const testModule = {
    imports:[],
    providers: [
        Factory,
        Validator,
        { provide: Database, useClass: FirebaseDatabase }
    ]
}