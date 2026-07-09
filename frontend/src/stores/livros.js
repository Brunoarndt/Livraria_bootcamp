import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../services/api.js'

export const useLivrosStore = defineStore('livros', () => {
  // use states do react
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
    } finally {
      carregando.value = false
    }
  }

  async function criarLivro(dadosLivro) {
    const { data } = await api.post('/livros', dadosLivro)
    livros.value.push(data.livro)
    return data
  }

  async function editarLivro(id, dadosLivro) {
    const { data } = await api.put(`/livros/${id}`, dadosLivro)
    const indice = livros.value.findIndex((livro) => livro.id === id)
    //verifica se o indice é real
    if (indice !== -1) {
      livros.value[indice] = data.livro
    }
    return data
  }

  async function inativarLivro(id) {
    const { data } = await api.delete(`/livros/${id}`)
    livros.value = livros.value.filter((livro) => livro.id !== id)
    return data
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
