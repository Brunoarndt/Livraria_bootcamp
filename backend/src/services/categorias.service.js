import prisma from '../lib/prisma.js'

export async function listarCategorias() {
  return prisma.categoria.findMany({
    orderBy: { nome: 'asc' },
  })
}

export async function criarCategoria(dados) {
  if (!dados.nome || dados.nome.trim() === '') {
    return { erro: true, mensagens: ['O nome da categoria é obrigatório.'] }
  }

  const categoria = await prisma.categoria.create({
    data: { nome: dados.nome.trim() },
  })

  return { erro: false, categoria }
}
