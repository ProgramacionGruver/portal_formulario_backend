import puppeteer from 'puppeteer'
import randomUserAgent from 'random-useragent'
import { generarCadena } from '../helpers/generarCadena.js'
import { obtenerLocalidad } from '../helpers/obtenerLocalidad.js'
import { obtenerEdad } from '../helpers/obtenerEdad.js'
import { obtenerGenero } from '../helpers/obtenerGenero.js'
import Candidatos from '../models/Candidatos.js'

import { ETIQUETAS_OCC, PERFIL_OCC } from '../constant/bootScraping.js'
import { esperaEtiqueta } from '../helpers/bootScrappingEtiqueta.js'

export const buscarAspiranteComputrabajo = async (puesto, localidad, edad, genero, cantidad, idRequisicion) => {

    const cabezera = randomUserAgent.getRandom()
    // para trabajar en local
    const navegador = await puppeteer.launch({ headless: false })
    // para productivo
    // const navegador = await puppeteer.launch({ executablePath: '/usr/bin/chromium-browser' })
    const pagina = await navegador.newPage()

    await pagina.setUserAgent(cabezera)

    await pagina.setViewport({ width: 1920, height: 1080 })

    await pagina.goto('https://empresa.computrabajo.com.mx/', { timeout: 0 })

    // Nos esperamos a que este el sitio web en un estado coherente
    await pagina.waitForSelector('.public', { timeout: 0 })


    // iniciar sesión
    await pagina.hover('#newlogintoggle')

    const usuarioInput = await pagina.waitForSelector('#UserName')

    await usuarioInput.type('dina.vega@gruver.mx')

    const passwordInput = await pagina.waitForSelector('#Password')

    await passwordInput.type('Camiones2022')

    // const botonLogin = await pagina.waitForSelector('#btnLogin')
    await pagina.click('#btnLogin')

    //TODO: ESTO PUEDE CAUSAR ERROR DEBEMOS PONER ALGO PARA QUE NO CRASHEE EL BOT

    // Esperamos a que este en la página principal del login
    await pagina.waitForSelector('.fc_aux', { timeout: 0 })

    // Redireccionamos para la busqueda de los candidatos
    await pagina.goto('https://empresa.mx.computrabajo.com/Company/Cvs', { timeout: 0 })

    // Esperamos a que este la página en un estado coherente
    await pagina.waitForSelector('.creditos_hdv', { timeout: 0 })

    // buscamos al candidato
    const buscarTalento = await pagina.waitForSelector('#MultifiltersDataModel_SearchText')

    await buscarTalento.type(puesto)

    await pagina.keyboard.press(String.fromCharCode(13))

    // Esperamos a que este la página en un estado coherente
    await pagina.waitForSelector('.boxn', { timeout: 0 })
    const perfiles = await pagina.$$('.js-o-link')

    let enlacesPerfil = []

    for (const perfil of perfiles) {
        const enlaceExtraido = await pagina.evaluate(enlace => enlace.getAttribute('href'), perfil)

        const linkCompleto = `https://empresa.mx.computrabajo.com${enlaceExtraido}`

        enlacesPerfil = [...enlacesPerfil, linkCompleto]
    }

    for (let i = 0;i <= cantidad;i++) {

        const enlace = enlacesPerfil[i]
        // console.log(enlace)
        await pagina.goto(enlace, { timeout: 0 })

        // // esperamos a que exista un estado coherente de la página
        await pagina.waitForSelector('#headerCvDetail', { timeout: 0 })

        if (await pagina.$('.cm-3 input', { timeout: 0 }) !== null) {

            await pagina.click('.cm-3 input')
            // console.log('Encontre en computrabajo')
            await pagina.waitForSelector('#bttConsumeCreditsPopUp')

            await new Promise(resolve => setTimeout(resolve, 3000))

            await pagina.click('#bttConsumeCreditsPopUp')

            // esperamos que la página tenga algo, ya que se recarga al hacer click en el
            await pagina.waitForNavigation()

        }
        // // información extraida
        const nombreAspirante = await pagina.waitForSelector('#headerCvDetail h1 p strong', { timeout: 0 })

        const getNombre = await pagina.evaluate(nombre => nombre.textContent, nombreAspirante)

        const nombreCompleto = getNombre.split(' ')

        const puestoAspirante = await pagina.waitForSelector('.cm-9 ul li h2', { timeout: 0 })

        const getPuesto = await pagina.evaluate(puesto => puesto.textContent, puestoAspirante)

        const correoAspirante = await pagina.waitForSelector('.bWord', { timeout: 0 })

        const getCorreo = await pagina.evaluate(correo => correo.textContent, correoAspirante)
        // console.log(getCorreo)
        // const edadAspirante = await pagina.$$('.cm-3 ul li')[4]
        // console.log(edadAspirante)
        // const getEdad = await pagina.evaluate( edad => edad.textContent, edadAspirante )

        // const telefonoAspiranteUno = await pagina.$$('.tlf_whatsapp2 span')[1]
        // const telefonoAspiranteDos = await pagina.$$('.tlf_whatsapp2 span')[5]

        // const getTelefonoUno = await pagina.evaluate(telefono => telefono.textContent, telefonoAspiranteUno)
        // const getTelefonoDos = await pagina.evaluate(telefono => telefono.textContent, telefonoAspiranteDos)

        // const salarioAspirante = await pagina.$$('.cm-3 ul li')[11] || ''

        // const getSalario = await pagina.evaluate(salario => salario.textContent, salarioAspirante)

        //    console.log( nombreCompleto.splice( nombreCompleto.findIndex( nombre => nombre.trim() === 'Currículum'  || nombre.trim() === 'de'), 1 ) )
        const aspirante = {
            nombreAspirante: `${nombreCompleto[3]} ${nombreCompleto[4]} ${nombreCompleto[5]} ${nombreCompleto[6] ? nombreCompleto[6] : ''}`.trim(),
            edad: 'Edad no especificada',
            localidad,
            sexo: 'Genero no especificado',
            telefono: '',
            puestoDeseado: getPuesto,
            correo: getCorreo,
            salarioDeseado: `$${Math.floor(Math.random() * 10500)}`
        }
        guardarAspiranteHistorial(aspirante)
        guardarAspirante(aspirante)
        console.log(aspirante)

        if (i >= cantidad) {
            console.log('estoy aquiiiiiiiiiiiiiiiiiiiiiii')

            return obtenerAspirantes(req, res)

        }

    }

}

export const buscarAspiranteOCC = async (puesto, localidad, edad, genero, cantidad, idRequisicion) => {

    // para trabajar en local
    const navegador = await puppeteer.launch({ headless: false })
    // para productivo
     //const navegador = await puppeteer.launch({ executablePath: '/usr/bin/chromium-browser' })

    try {

        const codigoLocalidad = obtenerLocalidad(localidad)
        const codigoEdad = obtenerEdad(edad.replace('años', '').trim())
        const codigoGenero = obtenerGenero(genero)

        const cabezera = randomUserAgent.getRandom()
        
        const pagina = await navegador.newPage()
        await pagina.setUserAgent(cabezera)
        await pagina.setViewport({ width: 1920, height: 1080 })

        await pagina.goto('https://www.occ.com.mx/empresas/inicia-sesion/', { timeout: 0 })

        //========CREAR LOGIN=================================================
        const usuarioInput = await esperaEtiqueta(pagina, ETIQUETAS_OCC.INPUT_LOGIN )

        await usuarioInput.type(ETIQUETAS_OCC.USUARIO)
        await pagina.click(ETIQUETAS_OCC.EVENTO_INPUT_USUARIO)

        const passwordInput = await esperaEtiqueta(pagina, ETIQUETAS_OCC.INPUT_PASSWORD)
        await passwordInput.type(ETIQUETAS_OCC.PASSWORD)
        await pagina.click(ETIQUETAS_OCC.EVENTO_INPUT_PASSWORD)


        //========INGRESAR INFORMACION EN BUSQUEDA DE TALENTO====================   
        await new Promise(resolve => setTimeout(resolve, 5000))
        await pagina.goto('https://www.occ.com.mx/empresas/talento/')

        const buscarTalento = await esperaEtiqueta(pagina, ETIQUETAS_OCC.INPUT_BUSQUEDA_PUESTO )
        await buscarTalento.type(puesto)
        //presionar enter
        await pagina.keyboard.press(String.fromCharCode(13))

        //========APLICAR FILTROS====================        
        const urlFiltro = `https://www.occ.com.mx/empresas/talento/resultados?facets=${codigoLocalidad}${codigoEdad}${codigoGenero}&pp=1000&q=${generarCadena(puesto)}`
        await pagina.goto(urlFiltro, { timeout: 0 })

        //========ESPERAR A QUE CARGUEN LOS PERFILES====================        
        await esperaEtiqueta(pagina, ETIQUETAS_OCC.NUMERO_TOTAL_ENCONTRADOS )
        const perfiles = await pagina.$$(ETIQUETAS_OCC.ENLACE_PERFILES)

        //========OBTENER URL DE LOS PERFILES====================        
        const enlacesPerfil = await Promise.all(perfiles.map(async perfil => await pagina.evaluate(enlace => enlace.getAttribute('href'), perfil)))
        let busquedasTotales = (enlacesPerfil.length < cantidad ? enlacesPerfil.length : cantidad) - 1

        //==========RECORRIDO DE PERFILES=======================================================
        for (let i = 0;i <= busquedasTotales;i++) {
            const urlPerfil = enlacesPerfil[i]

            await pagina.goto(`${urlPerfil}`, { timeout: 0 })
            await new Promise(resolve => setTimeout(resolve, 2000))

            /*const valores = await pagina.$$eval('.c012443', elementos => {
                return elementos.map(elemento => elemento.textContent)
            })*/

            //===========ABRIR DETALLE DE PERFIL====================================
            if (await pagina.$(ETIQUETAS_OCC.DETALLE_BOTON, { timeout: 0 }) !== null) {
                await pagina.click(ETIQUETAS_OCC.DETALLE_BOTON)
            }

            const folioBusqueda = enlacesPerfil[i].match(/\/(\d+)\?/)[1]
            const detalleURLCandidato = enlacesPerfil[i]

            //====EXTRAER EL PERFIL DEL USUARIO ======================================
            const aspirante = await extraerPerfiles(pagina, localidad, idRequisicion, PERFIL_OCC)

            //=====VERIFICAR SI EXISTE PARA ACTUALIZAR O CREAR
            const aspiranteExiste = await Candidatos.findOne({ where: { folioBusqueda, origenCandidato: 'OCC', idRequisicion } })

            if (aspiranteExiste) {
                await Candidatos.update({
                    nombreAspirante: aspirante.nombreAspirante,
                    sexo: aspirante.sexo,
                    edad: aspirante.edad,
                    correo: aspirante.correo,
                    telefono: aspirante.telefono,
                    localidad: localidad,
                    puestoDeseado: aspirante.puestoDeseado,
                    salarioDeseado: aspirante.salarioDeseado,
                    detalleURLCandidato
                },
                    {
                        where: { idCandidato: aspiranteExiste.idCandidato }
                    })

                busquedasTotales = busquedasTotales < enlacesPerfil.length ? busquedasTotales + 1 : busquedasTotales
            }

            if (!aspiranteExiste) {
                await Candidatos.create({
                    ...aspirante,
                    origenCandidato: 'OCC',
                    folioBusqueda,
                    detalleURLCandidato
                })
            }

        }

        await navegador.close()

        return Candidatos.findAll({ where: { idRequisicion } })

    } catch (error) {
        await navegador.close();
        throw new Error(error.message)
    }
}

const extraerPerfiles = async (pagina, localidad, idRequisicion, PERFIL) => {

    try {
        const nombreAspirante = await pagina.waitForSelector(PERFIL.NOMBRE, { timeout: 0 })
        const getNombre = await pagina.evaluate(nombre => nombre.textContent, nombreAspirante)

        const puestoAspirante = await pagina.waitForSelector(PERFIL.PUESTO, { timeout: 0 })
        const getPuesto = await pagina.evaluate(puesto => puesto.textContent, puestoAspirante)

        const sexoAspirante = await pagina.waitForSelector(PERFIL.SEXO, { timeout: 0 })
        const getSexo = await pagina.evaluate(sexo => sexo.textContent, sexoAspirante)

        const edadAspirante = await pagina.waitForSelector(PERFIL.EDAD, { timeout: 0 })
        const getEdad = await pagina.evaluate(edad => edad.textContent, edadAspirante)

        const correoAspirante = await pagina.waitForSelector(PERFIL.CORREO, { timeout: 0 })
        const getCorreo = await pagina.evaluate(correo => correo.textContent, correoAspirante)


        const telefonoAspirante = await pagina.waitForSelector(PERFIL.TELEFONO)
        const getTelefono = await pagina.evaluate(telefono => telefono.textContent, telefonoAspirante)

        const salarioAspirante = await pagina.$$(PERFIL.SALARIO)

        const getSalario = await pagina.evaluate(salario => salario.textContent, salarioAspirante[6])

        console.log(`Nombre:    ${getNombre}`)
        console.log(`Sexo:      ${getSexo}`)
        console.log(`Edad:      ${getEdad}`)
        console.log(`Correo:    ${getCorreo}`)
        console.log(`Telefono:  ${getTelefono}`)
        console.log(`Localidad: ${localidad}`)
        console.log(`Puesto:    ${getPuesto}`)
        console.log(`Salario:   ${getSalario}`)

        return {
            nombreAspirante: getNombre,
            sexo: getSexo,
            edad: getEdad,
            correo: getCorreo,
            telefono: getTelefono.replace(/[^0-9]/g, ''),
            localidad: localidad,
            puestoDeseado: getPuesto,
            salarioDeseado: getSalario.replace(/[^0-9]/g, ''),
            //  folioBusqueda: enlacesPerfil[i].match(/\/(\d+)\?/)[1],
            // detalleURLCandidato: enlacesPerfil[i],
            idRequisicion
        }

    } catch (error) {
        throw new Error(error.message)
    }
}