import { Educator } from "../models";

export async function welcome(educator: Educator, password: string): Promise<void>{
    console.log('email sent to:', educator.email, password);
}