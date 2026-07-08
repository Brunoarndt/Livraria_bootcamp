import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'API da Livraria Sabitiruc\'s no ar' })
})

// TODO: importar e usar as rotas de livros, autores e categorias
// app.use('/livros', livrosRoutes)
// app.use('/autores', autoresRoutes)
// app.use('/categorias', categoriasRoutes)

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})