const { Users } = require("../../db")
const crypto = require("crypto")
const nodemailer = require("nodemailer")
require('dotenv').config(); // Para cargar variables de entorno


const recoverPassword = async (email) => {
    try {
        const user = await Users.findOne({ where: { email } });

        if (!user) {
            console.error("Usuario no encontrado");
            return;
        }

        // Crear un token único y configurar el tiempo de expiración
        const token = crypto.randomBytes(32).toString("hex");
        const tokenExpiration = Date.now() + 3600000; // 1 hora desde ahora

        // Guardar el token y su expiración en la base de datos
        user.reset_password_token = token;
        user.reset_password_expires = tokenExpiration;
        await user.save(); // Guarda los cambios en la base de datos

        // Enviar el correo de recuperación con el enlace y el token
        await sendRecoveryEmail(user.email, token);

        console.log("Correo de recuperación enviado");
    } catch (error) {
        console.error("Error en la recuperación de contraseña", error);
    }
};


const sendRecoveryEmail = async (email, token) => {

    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        })


        const recoveryLink = `http://localhost:3007/ResetContrase%C3%B1a/${token}`;


        const mailOptions = {
            from: "biblioteca@tuemail.com",
            to: email,
            subject: "Recuperación de contraseña",
            html: `
                <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #e1e4e8; border-radius: 5px;">
                    <h2 style="color: #007BFF; text-align: center;">Recuperación de contraseña</h2>
                    <p style="font-size: 16px; line-height: 1.5;">
                        Hola,<br><br>
                        Recibimos una solicitud para restablecer tu contraseña. Para continuar, haz clic en el siguiente botón:
                    </p>
                    <div style="text-align: center; margin: 20px 0;">
                        <a href="${recoveryLink}" style="background-color: #007BFF; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-size: 16px;">
                            Restablecer contraseña
                        </a>
                    </div>
                    <p style="font-size: 16px; line-height: 1.5;">
                        Si no solicitaste este cambio, puedes ignorar este mensaje. Tu contraseña no será modificada.
                    </p>
                    <p style="font-size: 14px; color: #555;">
                        <strong>Nota:</strong> Este enlace es válido solo por 1 horas.
                    </p>
                    <footer style="border-top: 1px solid #e1e4e8; padding-top: 10px; font-size: 12px; color: #777; text-align: center;">
                        © 2023 Biblioteca. Todos los derechos reservados.
                    </footer>
                </div>
            `
        };

        await transporter.sendMail(mailOptions)
    } catch (error) {
        console.error("erro al enviar el correo de recuperacion")
    }
}



module.exports = recoverPassword;