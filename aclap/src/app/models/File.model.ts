export default class File {
    constructor(
        public id: string,
        public url: string,
        public name: string,
        public uploaded: Date,
        public bytes: number,
        public size: string,
        public format: string

    ){}

}