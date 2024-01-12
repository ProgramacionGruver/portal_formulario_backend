import Jimp from "jimp";
import { RUTA_SERVIDOR_QR, URL_SERVIDOR } from "../constant/servidor.js";

export const procesarImagen  = async (imageBack, imageQR, data ) => {
        const backgroundImage = await Jimp.read(imageBack);
        const overlayImage = await Jimp.read(imageQR);

        const rutaIntiacion = `${RUTA_SERVIDOR_QR}/invit-${data.idInvitacion}.PNG`

        // Ajustar tamaño de la imagen a agregar
        overlayImage.resize(600, 600);
        // Combinar las imágenes
        backgroundImage.composite(overlayImage, 525, 1430, {
            mode: Jimp.BLEND_SOURCE_OVER,
            opacityDest: 1,
            opacitySource: 1
        });

        // Agregar texto
        const font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
        backgroundImage.print(font, 200, 2065, `Nombre: ${data.nombre} ${data.apellidos}`);
        backgroundImage.print(font, 200, 2110, `Empresa: ${data.empresa}`);

        // Guardar la nueva imagen
        await backgroundImage.writeAsync(rutaIntiacion);
    return `${URL_SERVIDOR}/invit-${data.idInvitacion}.PNG`
}

