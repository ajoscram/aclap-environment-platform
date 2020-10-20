export class File {

    private static readonly B: string = 'b';
    private static readonly KB: string = 'kb';
    private static readonly MB: string = 'mb';
    private static readonly GB: string = 'gb';
    private static readonly TB: string = 'tb';
    private static readonly SIZE_RATIO: number = 1024;

    constructor(
        public id: string,
        public url: string,
        public name: string,
        public uploaded: Date,
        public bytes: number,
    ){}

    get size(): string{
        const modulo: number = this.bytes % File.SIZE_RATIO;
        const power: number = modulo > 3 ? 3 : modulo;
        const size: number = Math.floor(this.bytes / Math.pow(File.SIZE_RATIO, power));
        if(modulo == 0)
            return size + File.B;
        else if(modulo == 1)
            return size + File.KB;
        else if(modulo == 2)
            return size + File.MB;
        else if(modulo == 3)
            return size + File.GB;
        else
            return size + File.TB;
    }
    
    get format(): string{
        return this.name.substring(this.name.lastIndexOf('.'));
    }
}