const nodemailer = require('nodemailer');

// Configura el transporter con API Key
export const transporter = nodemailer.createTransport({
 // service: 'Gmail',
 host: "smtp.gmail.com",
 port : 465,
 secure: true,
  auth: {
    user: 'espanolconeacademy@gmail.com', // Tu dirección de correo electrónico de Gmail
    pass: process.env.gmailAuthSECRET // Tu API Key (contraseña de aplicación) generada en la configuración de seguridad de tu cuenta de Gmail
  }
});

transporter.verify().then(()=>{
    console.log('Ready to send emails')
})
//Configura los detalles del correo electrónico
const mailOptions = {
  from: 'espanolconeacademy@gmail.com', // Tu dirección de correo electrónico de Gmail
  to: 'aliriodi@gmail.com', // La dirección de correo del destinatario
  subject: 'Subject of Email',
  text: 'Content of Email'
};

// Envía el correo electrónico
// transporter.sendMail(mailOptions, (error, info) => {
//   if (error) {
//     console.log('Error al enviar el correo:', error);
//   } else {
//     console.log('Correo enviado:', info.response);
//   }
//});
