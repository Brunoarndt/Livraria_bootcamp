import * as categoriasService from '../services/categorias.service.js'

export async function index(req, res) {
  const categorias = await categoriasService.listarCategorias()
  res.json(categorias)
}

export async function store(req, res) {
  const resultado = await categoriasService.criarCategoria(req.body)
  if (resultado.erro) {
    return res.status(400).json({ mensagens: resultado.mensagens })
  }
  res.status(201).json({ mensagem: 'Categoria cadastrada com sucesso.', categoria: resultado.categoria })
}
