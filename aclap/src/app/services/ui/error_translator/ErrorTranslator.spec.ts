import { ErrorTranslator } from './ErrorTranslator.service';
import { errors } from './errors';
import { environment } from '../../../../environments/environment';

fdescribe('ErrorTranslator', () => {

    const translator: ErrorTranslator = new ErrorTranslator();
    const source: string  = 'Source';
    const code: string = 'CODE';
    //artificially injecting the error message into errors object
    errors[source] = {};
    errors[source][code] = 'test error message';

    it('translate(): correctly finds and translates recorded errors on production mode', () => {
        environment.production = true;
        const error: Error = new Error(source + '.' + code);
        const translated: string = translator.translate(error);
        expect(translated).toBe(errors[source][code]);
    });

    it('translate(): defaults correctly when either an error source or code are not found on production mode', () => {
        environment.production = true;
        const unknown_code: Error = new Error(source + '.UNKNOWN');
        let translated: string = translator.translate(unknown_code);
        expect(translated).toBe(ErrorTranslator.PRODUCTION_DEFAULT_HEADER + unknown_code.message);

        const unknown_source: Error = new Error('Unknown.' + code);
        translated = translator.translate(unknown_source);
        expect(translated).toBe(ErrorTranslator.PRODUCTION_DEFAULT_HEADER + unknown_source.message);
    });

    it('translate(): always defaults in development mode, even if the error exists', () => {
        const error: Error = new Error(source + '.' + code);
        const translated: string = translator.translate(error);
        expect(translated).toBe(ErrorTranslator.DEVELOPMENT_DEFAULT_HEADER + error.message);
    });

    afterEach(() => {
        environment.production = false;
    });
/*
    it('(): ', () => {
        
    });
*/
});