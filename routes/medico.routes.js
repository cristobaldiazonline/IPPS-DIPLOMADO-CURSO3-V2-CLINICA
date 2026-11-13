import { Router } from 'express'
import { proteger } from '../middlewares/proteger.js'
import * as controller from '../controllers/medico.controller.js'

export const medicoRoutes = Router()

medicoRoutes.use(proteger) // de aquí abajo, todo exige token

medicoRoutes.get('/', controller.listar)
medicoRoutes.get('/perfil', controller.perfil)        // ⚠️ antes que /:id
medicoRoutes.get('/:id', controller.buscarPorId)
medicoRoutes.get('/:id/pacientes', controller.pacientes)
