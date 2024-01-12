import utf8 from 'utf8'

export const decodificarAcentos = ( arregloObjetos ) => {

    const decodificarArreglo = arregloObjetos.map ( objeto => {
        return {
            puesto: utf8.decode(objeto.puesto),
            comision: utf8.decode(objeto.comision)
        }
    } )
    return decodificarArreglo
}