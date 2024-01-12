export const obtenerEdad = ( edad ) => {
    return {
        '0-19'  : '%2CAGE-1',
        '20-24' : '%2CAGE-2',
        '25-29' : '%2CAGE-3',
        '30-39' : '%2CAGE-4',
        'Mayor a 40' : '%2CAGE-5',
        'Indistinto': ''
    }[ edad ] || 'AGE-2'
}
