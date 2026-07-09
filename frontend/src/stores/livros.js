import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../services/api.js'
import { useToastStore } from './toast.js'

export const useLivrosStore = defineStore('livros', () => {
  const livros = ref([])
  const carregando = ref(false)
  const erro = ref(null)

  async function buscarLivros({ busca, autorId, categoriaId } = {}) {
    carregando.value = true
    erro.value = null
    try {
      const { data } = await api.get('/livros', {
        params: { busca, autorId, categoriaId },
      })
      livros.value = data
    } catch (e) {
      erro.value = 'Não foi possível carregar os livros.'
      useToastStore().erro(erro.value)
    } finally {
      carregando.value = false
    }
  }

  async function criarLivro(dadosLivro) {
    try {
      const { data } = await api.post('/livros', dadosLivro)
      livros.value.push(data.livro)
      useToastStore().sucesso(data.mensagem)
      return data
    } catch (e) {
      const mensagem = e.response?.data?.mensagens?.[0] ?? 'Não foi possível cadastrar o livro.'
      useToastStore().erro(mensagem)
      throw e
    }
  }

  async function editarLivro(id, dadosLivro) {
    try {
      const { data } = await api.put(`/livros/${id}`, dadosLivro)
      const indice = livros.value.findIndex((livro) => livro.id === id)
      if (indice !== -1) {
        livros.value[indice] = data.livro
      }
      useToastStore().sucesso(data.mensagem)
      return data
    } catch (e) {
      const mensagem = e.response?.data?.mensagens?.[0] ?? 'Não foi possível atualizar o livro.'
      useToastStore().erro(mensagem)
      throw e
    }
  }

  async function inativarLivro(id) {
    try {
      const { data } = await api.delete(`/livros/${id}`)
      livros.value = livros.value.filter((livro) => livro.id !== id)
      useToastStore().sucesso(data.mensagem)
      return data
    } catch (e) {
      useToastStore().erro('Não foi possível remover o livro.')
      throw e
    }
  }

  return {
    livros,
    carregando,
    erro,
    buscarLivros,
    criarLivro,
    editarLivro,
    inativarLivro,
  }
})
