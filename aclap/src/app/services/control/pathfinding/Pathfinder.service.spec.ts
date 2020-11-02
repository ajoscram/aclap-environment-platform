import { correctPath, anotherCorrectPath, incorrectPath } from './Pathfinder.service.spec.split';
import { Pathfinder } from './Pathfinder.service';

describe('Pathfinder', () => {
    const STUB = {
        $file: correctPath,
        $anotherFile: anotherCorrectPath,
        $notFile: incorrectPath,
        alsoNotFile: correctPath
    }
    const pathfinder: Pathfinder = new Pathfinder();

    it('isPath(): fetches all fields that start with $ and are valid paths', async () => {
        const fields: Map<string, string> = pathfinder.find(STUB);
        expect(fields).toBeTruthy();
        expect(fields.size).toBe(2);
        expect(fields.get("$file")).toBe(STUB.$file);
        expect(fields.get("$anotherFile")).toBe(STUB.$anotherFile);
    });
});