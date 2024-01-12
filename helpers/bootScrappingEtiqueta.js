export const esperaEtiqueta = async (pagina, etiqueta) => {

    const elemento = await pagina.waitForSelector(etiqueta)

    if (elemento) {
        return elemento
    }
    throw new Error(`No se encontró el elemento ${etiqueta} después de ${tiempoMaximo} segundos.`);
}