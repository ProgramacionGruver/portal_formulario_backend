import multer from "multer"
import { RUTA_BACKIMAGE } from "../constant/servidor.js";


const storage = multer.diskStorage({
    
    destination: (req, file, cb) => {
      cb(null, RUTA_BACKIMAGE)
     //   cb(null, 'C:/Users/jpedroza/Pictures/5s')
    },
    filename: async (req, file, cb) => {
            const imageURL = `${file.originalname}.png` // Genera el nombre del archivo usando el ID de la imagen
            cb(null, imageURL);
    },
});

const upload = multer({
    storage: storage,
    //fileFilter: fileFilter
}).array( 'imagenes', 2 )


export default upload


