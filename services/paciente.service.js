import { Paciente } from '../models/paciente.model.js'

// El médico SIEMPRE sale del token: si el body trae "medico", se pisa
export const crear = (datos, medicoId) =>
  Paciente.create({ ...datos, medico: medicoId })

export const listarDeMedico = (medicoId, prevision) => {
  const filtro = { medico: medicoId }
  if (prevision) filtro.prevision = prevision
  return Paciente.find(filtro)
}

export const buscarPorId = (id) => Paciente.findById(id)

export const actualizar = (paciente, datos) => {
  const { medico, _id, ...cambios } = datos // ignoramos medico y _id del body
  paciente.set(cambios)
  return paciente.save() // save() vuelve a correr las validaciones del modelo
}

export const eliminar = (paciente) => paciente.deleteOne()
