
export const generarCadena = ( puesto ) => {
    
    const arrayString = puesto.split(' ')
    let arregloCadena = []

    for ( let i = 0; i < arrayString.length; i++ ) {

        arregloCadena = [ ...arregloCadena, arrayString[i].concat('%20') ]
    }

    const ultimoElemento = arregloCadena[ arregloCadena.length - 1 ]
    const indice = arregloCadena.indexOf( ultimoElemento )
    arregloCadena[ indice ] = ultimoElemento.replace('%20', '')


    return arregloCadena.toString().replaceAll(',', '')
}
