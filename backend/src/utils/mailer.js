// Autor: Greivin Eliecer A.G
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const sendRecoveryEmail = async (correoDestino, codigo) => {
    const mailOptions = {
        from: `"Sistema de Gestión" <${process.env.EMAIL_USER}>`,
        to: correoDestino,
        subject: 'Código de Recuperación de Contraseña',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #333;">Recuperación de Contraseña</h2>
                <p>Has solicitado restablecer tu contraseña. Utiliza el siguiente código de 6 dígitos en la aplicación:</p>
                <div style="background-color: #f8f9fa; border-radius: 5px; padding: 20px; text-align: center; margin: 20px 0;">
                    <h1 style="color: #0d6efd; letter-spacing: 10px; margin: 0;">${codigo}</h1>
                </div>
                <p style="color: #dc3545;"><strong>Este código expira en 15 minutos.</strong></p>
                <p style="color: #6c757d; font-size: 14px;">Si tú no solicitaste este cambio, ignora este mensaje.</p>
            </div>
        `
    };

    await transporter.sendMail(mailOptions);
};