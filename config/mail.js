import { createTransport } from 'nodemailer'

export const transporter = createTransport({
    host: "smtp-mail.outlook.com",
    secureConnection: false,
    port: 587,
    secure: false,
    tls: {
        rejectUnauthorized: false,
    },
    auth: { user: 's.gruver@gruver.mx', pass: 'Soporte1' }
})