import ExcelJs from 'exceljs'
import { enviarCorreo } from './enviarCorreo.js'

export const generarExcel =  async ( arregloAspirantes ) => {
    
    const woorkbook = new ExcelJs.Workbook()
    const nombreArchivo = 'candidatos.xlsx'
    const pagina = woorkbook.addWorksheet('Candidatos')

    const columnas = [
        { header: 'Nombre', key: 'nombreAspirante' },
        { header: 'Sexo', key: 'sexo' },
        { header: 'Edad', key: 'edad' },
        { header: 'Correo', key: 'correo' },
        { header: 'Telefono', key: 'telefono' },
        { header: 'Localidad', key: 'localidad' },
        { header: 'Puesto deseado', key: 'puestoDeseado' },
        { header: 'Salario deseado', key: 'salarioDeseado' },
    ]
    pagina.columns = columnas
    pagina.addRows( arregloAspirantes )

    woorkbook.xlsx.writeFile(nombreArchivo).then( e => console.log('Archivo de excel creado correctamente', nombreArchivo) )
    .catch( () => console.log('Error, al crear el archivo de excel') )

    const buffer = await woorkbook.xlsx.writeBuffer()
    enviarCorreo( buffer, nombreArchivo )
}