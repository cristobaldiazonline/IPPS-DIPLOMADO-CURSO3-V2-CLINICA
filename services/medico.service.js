import { Medico } from '../models/medico.model.js'
import { Paciente } from '../models/paciente.model.js'

export const listar = (especialidad) => {
  const filtro = {}
  if (especialidad) filtro.especialidad = especialidad
  return Medico.find(filtro)
}

export const buscarPorId = (id) => Medico.findById(id)

// Devuelve null si el médico no existe, o la lista (quizás vacía) de sus pacientes
export const pacientesDe = async (id) => {
  const medico = await Medico.findById(id)
  if (!medico) return null
  return Paciente.find({ medico: id })
}
