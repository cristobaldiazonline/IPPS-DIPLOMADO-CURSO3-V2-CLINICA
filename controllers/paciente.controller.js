import * as service from '../services/paciente.service.js'
import { errorHttp } from '../utils/errorHttp.js'

// Regla de negocio: busca el paciente y verifica que sea del médico del token
const buscarPacientePropio = async (id, medicoId) => {
  const paciente = await service.buscarPorId(id)
  if (!paciente) throw errorHttp(404, `No existe el paciente ${id}`)

  // paciente.medico es ObjectId y medicoId es string: hay que convertir
  if (paciente.medico.toString() !== medicoId) {
    throw errorHttp(403, 'Solo el médico tratante puede modificar o eliminar a este paciente')
  }
  return paciente
}

// POST /pacientes
export const crear = async (req, res) => {
  const paciente = await service.crear(req.body ?? {}, req.medico.id)
  res.status(201).json(paciente)
}

// GET /pacientes  y  GET /pacientes?prevision=Isapre  → solo MIS pacientes
export const listar = async (req, res) => {
  const pacientes = await service.listarDeMedico(req.medico.id, req.query.prevision)
  res.json(pacientes)
}

// GET /pacientes/:id  → cualquier médico puede ver
export const buscarPorId = async (req, res) => {
  const paciente = await service.buscarPorId(req.params.id)
  if (!paciente) throw errorHttp(404, `No existe el paciente ${req.params.id}`)
  res.json(paciente)
}

// PUT /pacientes/:id  → solo el médico tratante
export const actualizar = async (req, res) => {
  const paciente = await buscarPacientePropio(req.params.id, req.medico.id)
  const actualizado = await service.actualizar(paciente, req.body ?? {})
  res.json(actualizado)
}

// DELETE /pacientes/:id  → solo el médico tratante
export const eliminar = async (req, res) => {
  const paciente = await buscarPacientePropio(req.params.id, req.medico.id)
  await service.eliminar(paciente)
  res.status(204).end()
}
