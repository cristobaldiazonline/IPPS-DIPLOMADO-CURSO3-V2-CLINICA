import * as service from '../services/auth.service.js'

// POST /auth/registro
export const registrar = async (req, res) => {
  const datos = req.body ?? {}
  const resultado = await service.registrar(datos) // { medico, token }
  res.status(201).json(resultado)
}

// POST /auth/login
export const login = async (req, res) => {
  const { email, password } = req.body ?? {}

  if (!email || !password) {
    return res.status(400).json({ error: 'Faltan el email o la contraseña' })
  }

  const resultado = await service.login(email.toLowerCase(), password)

  if (!resultado) {
    return res.status(401).json({ error: 'Email o contraseña incorrectos' })
  }

  res.status(200).json(resultado)
}
