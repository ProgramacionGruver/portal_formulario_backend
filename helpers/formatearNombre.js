export const formatearNombre = (cadena) =>{

const arrayNombre = cadena.split("-")
arrayNombre.shift()

return arrayNombre.join("-")

}

export const obteneridCatalogo = (cadena) =>{

const arrayNombre = cadena.split("-")
return arrayNombre[0]    
}