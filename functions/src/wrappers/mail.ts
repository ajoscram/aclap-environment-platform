import { Educator } from "../models";
import { environment } from "../environment";
const nodemailer = require('nodemailer');

const credentials = environment.email;

async function send(recepient: string, subject: string, body: string): Promise<void>{
    const transport = nodemailer.createTransport({
        host: credentials.host,
        port: credentials.port,
        secure: credentials.secure,
        auth: {
            user: credentials.address,
            pass: credentials.password,
        },
    });

    await transport.sendMail({
        from: credentials.from,
        to: recepient,
        subject: subject,
        html: body,
    });
}

export async function welcome(educator: Educator, password: string): Promise<void>{
    const recepient: string = educator.email;
    const subject: string = credentials.subjects.welcome;
    const body: string = `<h3>Su contraseña por defecto es:</h3><br>${password}<br><br>Puede cambiarla en cualquier momento desde la aplicación web o móvil.`;
    await send(recepient, subject, body);
}

export async function resetPassword(email: string, password: string): Promise<void>{
    const subject: string = credentials.subjects.resetPassword;
    const body: string = `<h3>Su nueva contraseña por es:</h3><br>${password}<br><br>Pueda cambiarla en cualquier momento desde la aplicación web o móvil.`;
    await send(email, subject, body);
}