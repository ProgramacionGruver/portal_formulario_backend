import express from 'express'
import cors from 'cors'

//import db from './config/db.js'

const app = express()
const port = 4001

import test from './routers/test.js'

app.use( express.json( { extended: true } ) )

//conexion sql db
//db.sync()

//app cors
app.use( cors() )

app.use('/api', test)

app.listen( port, () => console.log(`El servidor está funcionando en el puerto ${ port }`) )
