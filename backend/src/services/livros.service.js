import prisma from '../lib/prisma.js'

export async function listarLivros({ busca, autorId, categoriaId } = {}) {
  return prisma.livro.findMany({
    where: {
      ativo: true,
      ...(busca && {
        OR: [
          { titulo: { contains: busca, mode: 'insensitive' } },
          { isbn: { contains: busca, mode: 'insensitive' } },
        ],
      }),
      ...(autorId && { autorId: Number(autorId) }),
      ...(categoriaId && { categoriaId: Number(categoriaId) }),
    },
    include: { autor: true, categoria: true },
    orderBy: { titulo: 'asc' },
  })
}

export async function buscarLivroPorId(id) {
  return prisma.livro.findUnique({
    where: { id: Number(id) },
    include: { autor: true, categoria: true },
  })
}

function validarDadosLivro(dados) {
  const erros = []

  if (!dados.titulo || dados.titulo.trim() === '') {
    erros.push('O título é obrigatório.')
  }
  if (!dados.isbn || dados.isbn.trim() === '') {
    erros.push('O ISBN é obrigatório.')
  }
  if (!dados.autorId) {
    erros.push('O autor é obrigatório.')
  }
  if (!dados.categoriaId) {
    erros.push('A categoria é obrigatória.')
  }
  if (dados.preco === undefined || Number(dados.preco) <= 0) {
    erros.push('O preço deve ser maior que zero.')
  }
  if (dados.quantidade === undefined || Number(dados.quantidade) < 0) {
    erros.push('A quantidade em estoque não pode ser negativa.')
  }

  return erros
}

export async function criarLivro(dados) {
  const erros = validarDadosLivro(dados)
  if (erros.length > 0) {
    return { erro: true, mensagens: erros }
  }

  const isbnExistente = await prisma.livro.findUnique({
    where: { isbn: dados.isbn },
  })
  if (isbnExistente) {
    return { erro: true, mensagens: ['Já existe um livro cadastrado com esse ISBN.'] }
  }

  const livro = await prisma.livro.create({
    data: {
      titulo: dados.titulo,
      isbn: dados.isbn,
      preco: dados.preco,
      quantidade: dados.quantidade,
      autorId: Number(dados.autorId),
      categoriaId: Number(dados.categoriaId),
    },
    include: { autor: true, categoria: true },
  })

  return { erro: false, livro }
}

export async function editarLivro(id, dados) {
  const erros = validarDadosLivro(dados)
  if (erros.length > 0) {
    return { erro: true, mensagens: erros }
  }

  const isbnExistente = await prisma.livro.findFirst({
    where: { isbn: dados.isbn, NOT: { id: Number(id) } },
  })
  if (isbnExistente) {
    return { erro: true, mensagens: ['Já existe outro livro cadastrado com esse ISBN.'] }
  }

  const livro = await prisma.livro.update({
    where: { id: Number(id) },
    data: {
      titulo: dados.titulo,
      isbn: dados.isbn,
      preco: dados.preco,
      quantidade: dados.quantidade,
      autorId: Number(dados.autorId),
      categoriaId: Number(dados.categoriaId),
    },
    include: { autor: true, categoria: true },
  })

  return { erro: false, livro }
}

export async function inativarLivro(id) {
  return prisma.livro.update({
    where: { id: Number(id) },
    data: { ativo: false },
  })
}