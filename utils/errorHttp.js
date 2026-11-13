// Crea un error con código de estado, para lanzarlo desde un controller
export const errorHttp = (status, mensaje) => {
  const err = new Error(mensaje)
  err.status = status
  return err
}
