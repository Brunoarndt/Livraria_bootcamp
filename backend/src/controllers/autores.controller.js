import * as autoresService from '../services/autores.service.js'

export async function index(req, res) {
  const autores = await autoresService.listarAutores()
  res.json(autores)
}

export async function store(req, res) {
  const resultado = await autoresService.criarAutor(req.body)
  if (resultado.erro) {
    return res.status(400).json({ mensagens: resultado.mensagens })
  }
  res.status(201).json({ mensagem: 'Autor cadastrado com sucesso.', autor: resultado.autor })
}