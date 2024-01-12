import axios from 'axios'

const apiSistemas = axios.create({ baseURL: 'https://backend.gruver.com.mx/sistemas/api' })

export { apiSistemas }