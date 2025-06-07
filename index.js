import express from 'express'
import dotenv from 'dotenv'
import { Sequelize } from 'sequelize'
import usuarioModel from './models/usuario.js'

dotenv.config()

const app = express()
app.use(express.json())

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
})

const Usuario = usuarioModel(sequelize)

app.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await Usuario.findAll()
    res.json(usuarios)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Error al obtener usuarios' })
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, async () => {
  try {
    await sequelize.authenticate()
    console.log('🟢 Base de datos conectada')
    await sequelize.sync({ force: true }) // usar solo si querés crear la tabla desde cero
    console.log(`🚀 Servidor escuchando en puerto ${PORT}`)
  } catch (err) {
    console.error('🔴 Error conectando con la base de datos:', err)
  }
})