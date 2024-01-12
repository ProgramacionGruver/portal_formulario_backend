import Sequelize from 'sequelize'
import dotenv from 'dotenv'

dotenv.config( { path: '.env' } )


const conexionPortalRh = new Sequelize( process.env.DB_NOMBRE, process.env.DB_USER, process.env.DB_PASS, {
    
    host: process.env.DB_HOST,
    port: 1433,
    dialect: 'mssql',
    pool: { max: 5, min: 1, acquire: 30000, idle: 10000 },
    operatorAliases: false
})

export default conexionPortalRh