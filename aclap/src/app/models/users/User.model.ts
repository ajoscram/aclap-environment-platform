export abstract class User{
    constructor(
        public id: string,
        public imageUrl: string,
        public name: string,
        public lastname: string,
        public email: string
    ){}
}