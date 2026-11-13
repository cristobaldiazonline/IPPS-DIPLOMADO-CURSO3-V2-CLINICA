import mongoose from 'mongoose'


const MONGODB_URI = ''

export const conectar = async () => {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('conectado a la bd')
}