const nodemailer = require("nodemailer")



const transporter = nodemailer.createTransport({
    service:'Gmail',
    auth:{
        user: 'amoremioshowroomok@gmail.com',
        pass: 'z a l b s c v l l f d l x h w y'
    }
})



const enviarCorreo = async (title, idBook, name, correo, fecha) => {
    try {
        const mailOption = {
            from: 'biblioteca@tuemail.com',
            to: correo,
            subject: 'Confirmación de Préstamo de Libro',
            html: `
                <!DOCTYPE html>
                <html lang="es">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Confirmación de Préstamo de Libro</title>
                    <style>
                        body {
                            font-family: 'Georgia', serif;
                            background-color: #fdfbec;
                            padding: 20px;
                            margin: 0;
                        }
                        .container {
                            max-width: 600px;
                            margin: 0 auto;
                            background-color: #ffffff;
                            padding: 20px;
                            border-radius: 10px;
                            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
                            border: 1px solid #e2dfdb;
                        }
                        h1 {
                            color: #5b3415;
                            text-align: center;
                            font-size: 24px;
                            margin-bottom: 20px;
                            font-weight: bold;
                        }
                        p {
                            color: #333;
                            line-height: 1.6;
                            font-size: 16px;
                        }
                        .details {
                            background-color: #f9f1e7;
                            padding: 15px;
                            border-left: 4px solid #c7965b;
                            border-radius: 5px;
                            margin: 15px 0;
                        }
                        .details p {
                            margin: 5px 0;
                            font-size: 15px;
                        }
                        .details strong {
                            color: #5b3415;
                        }
                        .footer {
                            text-align: center;
                            margin-top: 30px;
                            color: #5b3415;
                            font-size: 14px;
                        }
                        .footer p {
                            margin: 5px 0;
                        }
                        .footer .highlight {
                            font-style: italic;
                            font-size: 15px;
                            color: #8c5e34;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>📚 Confirmación de Préstamo de Libro</h1>
                        <p>Estimado/a <strong>${name}</strong>,</p>
                        <p>Nos complace informarle que ha solicitado el préstamo del siguiente libro:</p>
                        <div class="details">
                            <p><strong>Título:</strong> ${title}</p>
                            <p><strong>ID del Libro:</strong> ${idBook}</p>
                        </div>
                        <p>Por favor, recuerde devolver el libro antes de la fecha límite. En caso contrario, se aplicará una multa de <strong>1000$</strong> por día de retraso.</p>
                        <p><strong>📅 Fecha de devolución estimada:</strong> ${fecha}</p>
                        <div class="footer">
                            <p class="highlight">¡Gracias por utilizar nuestros servicios!</p>
                            <p><strong>Equipo de la Biblioteca</strong></p>
                        </div>
                    </div>
                </body>
                </html>
            `
        };
        const info = await transporter.sendMail(mailOption);
        console.log('Correo enviado', info.response);
    } catch (error) {
        console.error('Error al enviar el correo electrónico:', error);
        throw error;
    }
};

module.exports = enviarCorreo;


