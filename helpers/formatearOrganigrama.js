export const formatearOrganigrama = (empleadoObj, usuarios, personasDepartamento, vacantes) => {

  const { vacante } = empleadoObj

  const empleado = usuarios.find((elemento) => elemento.numero_empleado === parseInt(empleadoObj.empleado))
  const vacanteOrganigrama = vacantes.find((vacante) => vacante.idVacanteOrganigrama === parseInt(empleadoObj.empleado.replace("V", "")))
  
  const organigrama = {
    id: vacante ? `V${vacanteOrganigrama ? vacanteOrganigrama.idVacanteOrganigrama : ''}` : empleado.numero_empleado,
    name: vacante ? 'VACANTE' : empleado.nombre,
    title: vacante ? (vacanteOrganigrama ? vacanteOrganigrama.puesto : '') : empleado.puesto,
    data: {
      numero: vacante ? `V${vacanteOrganigrama ? vacanteOrganigrama.idVacanteOrganigrama : ''}` : empleado.numero_empleado,
      nombre: vacante ? 'VACANTE' : empleado.nombre,
      puesto: vacante ? (vacanteOrganigrama ? vacanteOrganigrama.puesto : '') : empleado.puest,
      correo: vacante ? '-' : (empleado ? empleado.correo : ''),
      telefono: vacante ? '-' : (empleado ? empleado.telefono : ''),
      centro: vacante ? '-' : (empleado ? empleado.centro : ''),
      sucursal: vacante ? '-' : (empleado ? empleado.sucursal : ''),
      division: vacante ? '-' : (empleado ? empleado.division : ''),
      sucursal: empleadoObj.sucursal,
      departamento: empleadoObj.departamento
    },
    children: [],
  }

  const empleadosRelacionadosempleadoObj = personasDepartamento.filter((e) => e.jefeDirecto === empleadoObj.empleado)

  empleadosRelacionadosempleadoObj.forEach((empleadoRelacionado) => {
    const subOrganigrama = formatearOrganigrama(empleadoRelacionado, usuarios, personasDepartamento, vacantes)
    organigrama.children.push(subOrganigrama)
  })

  return organigrama
}