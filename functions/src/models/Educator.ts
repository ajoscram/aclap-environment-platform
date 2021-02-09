export interface Educator {
    id: string,
    imageUrl: string,
    name: string,
    lastname: string,
    email: string,
    phone: string,
    address: {
        latitude: number,
        longitude: number,
        name: string
    },
    birthday: Date,
    organization: string,
    joined: Date
}