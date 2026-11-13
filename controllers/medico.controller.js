import * as service from '../services/medico.service.js'

// GET /medicos  y  GET /medicos?especialidad=Pediatría
export const listar = async (req, res) => {
  const medicos = await service.listar(req.query.especialidad)
  res.json(medicos)
}

// GET /medicos/perfil  → el médico del token
export const perfil = async (req, res) => {
  const medico = await service.buscarPorId(req.medico.id)
  if (!medico) return res.status(404).json({ error: 'No existe el médico del token' })
  res.json(medico)
}

// GET /medicos/:id
export const buscarPorId = async (req, res) => {
  const medico = await service.buscarPorId(req.params.id)
  if (!medico) return res.status(404).json({ error: `No existe el médico ${req.params.id}` })
  res.json(medico)
}

// GET /medicos/:id/pacientes
export const pacientes = async (req, res) => {
  const lista = await service.pacientesDe(req.params.id)
  if (lista === null) return res.status(404).json({ error: `No existe el médico ${req.params.id}` })
  res.json(lista) // si no tiene pacientes, responde [] con 200
}
