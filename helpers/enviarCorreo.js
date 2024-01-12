import { transporter } from '../config/mail.js'

export const enviarCorreo = async ( data, messageHTML ) => {

    const mailOptions = {
        from: 'sgruver@gruver.mx',
        to: data.correo,
        subject: `Invitacion al evento ${data.eventoObj.titulo}`,
        html: messageHTML,
    }
    await transporter.sendMail(mailOptions, ( error, info ) => {
        if ( error ) {
            return console.log( error )
        }
        console.log(`Mensaje enviado ${ info.response }`)
    })

}
