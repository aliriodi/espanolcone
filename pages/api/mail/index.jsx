import {transporter} from '../../../lib/sendEmail';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { to, subject, text } = req.body;
// console.log(req.body)
  try {
    const mailOptions = {
      from: 'espanolconeacademy@aliriodi.com', // Cambia esto a tu dirección de correo electrónico
      to:  to,
      subject: subject,
      text: text
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ message: 'Error sending email' });
  }
}