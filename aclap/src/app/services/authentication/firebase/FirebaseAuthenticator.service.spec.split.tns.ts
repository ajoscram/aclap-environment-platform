import { HttpClient } from "@angular/common/http";

export const TEST_MODULE = {
    imports:[ ],
    providers: [ ]
}

export async function setup(http: HttpClient): Promise<void>{
}

export async function cleanup(http: HttpClient): Promise<void>{
}