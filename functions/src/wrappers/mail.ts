import { Educator } from "../models";
import { environment } from "../environment";
const nodemailer = require('nodemailer');

const credentials = environment.email;

export async function welcome(educator: Educator, password: string): Promise<void>{
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
            to: educator.email,
            subject: credentials.subject,
            html: `<h3>Su contraseña por defecto es:</h3><br>${password}<br><br>Pueda cambiarla en cualquier momento desde la aplicación web o móvil.`,
    });
}