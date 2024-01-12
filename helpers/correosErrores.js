import { transporter } from '../config/mail.js'

export const enviarCorreoErrores = async ( tipoError ) => {

    const mailOptions = {
        from: 'sgruver@gruver.mx',
        to: ['jpedroza@gruver.mx', 'alexis.magdaleno@gruver.mx'],
        subject: 'Error en bot',
        html: tipoError,
    }
    await transporter.sendMail(mailOptions, ( error, info ) => {
        if ( error ) {
            return console.log( error )
        }
        console.log(`Mensaje enviado ${ info.response }`)
    })

}
