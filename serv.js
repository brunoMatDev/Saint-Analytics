require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Ruta para enviar correos
app.post('/send-email', async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !phone || !subject || !message) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  try {
    // Configuración del transportador
    const transporter = nodemailer.createTransport({
    /*host: 'smpt.hostinger.com',
      port: 587,
      secure: false,*/ 
      service: 'gmail',
      auth: {
        user: process.env.EMAIL, // Tu correo Gmail
        pass: process.env.PASSWORD, // Contraseña o app password
      },
    });

    // Configuración del correo
    const mailOptions = {
      from: email, // Correo del remitente
      to: 'bruno.maturano.dev@gmail.com', // Tu correo de destino
      subject: `${subject}`,
      text: `Datos del mensaje:\nEnviado por: ${name}\nEmail: ${email}\nTelefono:${phone}\nMensaje:\n${message}`
    };

    // Enviar correo
    const info = await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Correo enviado correctamente.', info });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).json({ success: false, message: 'Error al enviar el correo.', error });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
