import { Router } from 'express'
import * as controller from '../controllers/auth.controller.js'

export const authRoutes = Router()

// Rutas públicas: no exigen token
authRoutes.post('/registro', controller.registrar)
authRoutes.post('/login', controller.login)
