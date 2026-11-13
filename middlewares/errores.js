// Middleware de errores: va al final de server.js.
// En Express 5, si un controller async lanza un error, llega solo aquí.
export const manejarErrores = (err, req, res, next) => {
  // Errores que lanzamos nosotros con un status (404, 403)
  if (err.status) {
    return res.status(err.status).json({ error: err.message })
  }
  // Falta un campo requerido o no cumple el enum
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message })
  }
  // El id no tiene formato de ObjectId (ej: '123')
  if (err.name === 'CastError') {
    return res.status(400).json({ error: `Id con formato inválido: ${err.value}` })
  }
  // Choca con un campo unique (email del médico, rut del paciente)
  if (err.code === 11000) {
    const campo = Object.keys(err.keyValue ?? {}).join(', ')
    return res.status(409).json({ error: `Ya existe un registro con ese ${campo}` })
  }
  // JSON mal escrito en el body
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'El body no es un JSON válido' })
  }

  console.error(err)
  res.status(500).json({ error: 'Error interno del servidor' })
}
