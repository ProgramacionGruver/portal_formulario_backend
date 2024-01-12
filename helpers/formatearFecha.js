import dayjs from 'dayjs'
// import { es } from 'dayjs/locale/es.js'

export const formatearFecha = (stringFecha) => dayjs(stringFecha).locale('es').format('DD/MM/YYYY')

export const agregarDiasFecha = (fecha, dias) => {
  const fechaOriginal = new Date(fecha)
  const fechaNueva = new Date(fechaOriginal)
  fechaNueva.setDate(fechaOriginal.getDate() + dias)

  return fechaNueva.toISOString().slice(0, 10)
}