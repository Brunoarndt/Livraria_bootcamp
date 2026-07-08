import * as livrosService from '../services/livros.service.js'

export async function index(req, res) {
  const { busca, autorId, categoriaId } = req.query
  const livros = await livrosService.listarLivros({ busca, autorId, categoriaId })
  res.json(livros)
}

export async function show(req, res) {
  const livro = await livrosService.buscarLivroPorId(req.params.id)
  if (!livro) {
    return res.status(404).json({ mensagem: 'Livro não encontrado.' })
  }
  res.json(livro)
}

export async function store(req, res) {
  const resultado = await livrosService.criarLivro(req.body)
  if (resultado.erro) {
    return res.status(400).json({ mensagens: resultado.mensagens })
  }
  res.status(201).json({ mensagem: 'Livro cadastrado com sucesso.', livro: resultado.livro })
}

export async function update(req, res) {
  const resultado = await livrosService.editarLivro(req.params.id, req.body)
  if (resultado.erro) {
    return res.status(400).json({ mensagens: resultado.mensagens })
  }
  res.json({ mensagem: 'Livro atualizado com sucesso.', livro: resultado.livro })
}

export async function destroy(req, res) {
  await livrosService.inativarLivro(req.params.id)
  res.json({ mensagem: 'Livro removido com sucesso.' })
}