import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import livrosRoutes from './routes/livros.routes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'API da Livraria Sabitiruc\'s no ar' })
})

app.use('/livros', livrosRoutes)

// Middleware global de erro 
app.use((err, req, res, next) => {
  console.error(err)

  if (err.code === 'P2003') {
    return res.status(400).json({
      mensagens: ['Autor ou categoria informado não existe.'],
    })
  }

  if (err.code === 'P2025') {
    return res.status(404).json({ mensagem: 'Registro não encontrado.' })
  }

  res.status(500).json({ mensagem: 'Não foi possível concluir a operação.' })
})

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})