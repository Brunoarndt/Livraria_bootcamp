import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../services/api.js'

export const useCategoriasStore = defineStore('categorias', () => {
  const categorias = ref([])
  const carregando = ref(false)
  const erro = ref(null)

  async function buscarCategorias() {
    carregando.value = true
    erro.value = null
    try {
      const { data } = await api.get('/categorias')
      categorias.value = data
    } catch (e) {
      erro.value = 'Não foi possível carregar as categorias.'
    } finally {
      carregando.value = false
    }
  }

  async function criarCategoria(nome) {
    erro.value = null
    try {
      const { data } = await api.post('/categorias', { nome })
      categorias.value.push(data.categoria)
      return data.categoria
    } catch (e) {
      erro.value = e.response?.data?.mensagens?.[0] ?? 'Não foi possível cadastrar a categoria.'
      throw e
    }
  }

  return { categorias, carregando, erro, buscarCategorias, criarCategoria }
})
