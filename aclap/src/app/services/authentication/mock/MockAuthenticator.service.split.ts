export class Local{
    static set(key: string, value: string): void{
        localStorage.setItem(key, value);
    }

    static get(key: string): string{
        return localStorage.getItem(key);
    }
}