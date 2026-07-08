import prisma from '../lib/prisma.js'

export async function listarAutores() {
  return prisma.autor.findMany({
    orderBy: { nome: 'asc' },
  })
}

export async function criarAutor(dados) {
  if (!dados.nome || dados.nome.trim() === '') {
    return { erro: true, mensagens: ['O nome do autor é obrigatório.'] }
  }

  const autor = await prisma.autor.create({
    data: { nome: dados.nome.trim() },
  })

  return { erro: false, autor }
}