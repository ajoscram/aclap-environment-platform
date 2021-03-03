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
    const body: string = `
    <p>¡Hola ${educator.name}! Muchas gracias por inscribirse como persona educadora. Hemos aceptado su solicitud, con lo cual usted tiene acceso a la ventana de implementación de módulos y eventos. Con ello, usted podrá aportar al plan de educación ambiental del <strong>ACLA-P</strong> y al avance de los objetivos de desarrollo sostenible en su comunidad.</p>
    <p>Su contraseña por defecto es:</p>
    <h3 style='text-align: center'>${password}</h3>
    <br>
    <p>Puede cambiarla en su perfil desde la aplicación web o móvil.</p>
    <p>Cualquier pregunta, no dude en contactarnos al correo electrónico <a href="aclap.estrategia@gmail.com">aclap.estrategia@gmail.com</a>.</p>`;
    await send(recepient, subject, body);
}

export async function resetPassword(email: string, password: string): Promise<void>{
    const subject: string = credentials.subjects.resetPassword;
    const body: string = `
    <p>Hola, le enviamos este correo porque solicitó recuperar su contraseña. Su nueva contraseña es:</p>
    <h3 style='text-align: center'>${password}</h3>
    <br>
    <p>Pueda cambiarla en su perfil desde la aplicación web o móvil.</p>
    <p>Cualquier pregunta, no dude en contactarnos al correo electrónico <a href="aclap.estrategia@gmail.com">aclap.estrategia@gmail.com</a>.</p>`;
    await send(email, subject, body);
}