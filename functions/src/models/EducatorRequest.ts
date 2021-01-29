export enum EducatorRequestState{
    APPROVED = 'APPROVED',
    DENIED = 'DENIED',
    PENDING = 'PENDING'
}

export interface EducatorRequest {
    id: string,
    name: string,
    lastname: string,
    email: string,
    phone: string,
    organization: string,
    issued: Date,
    birthday: Date,
    address: {
        latitude: number,
        longitude: number,
        name: string
    },
    state: EducatorRequestState
}