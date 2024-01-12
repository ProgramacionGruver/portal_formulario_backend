export const obtenerGenero = ( genero ) => {
    return {
        'Mujer':'%GEN-2',
        'Hombre':'%AGE-1',
        'Indistinto': ''
    }[ genero ] || 'GEN-1'
}


