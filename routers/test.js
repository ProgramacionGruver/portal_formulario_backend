import express from 'express'
import { mensaje } from '../controllers/test.js'

const router = express.Router()

router.get('/test', mensaje)

export default router