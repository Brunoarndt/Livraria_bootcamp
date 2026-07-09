import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../services/api.js'
import { useToastStore } from './toast.js'

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
      useToastStore().erro(erro.value)
    } finally {
      carregando.value = false
    }
  }

  async function criarCategoria(nome) {
    try {
      const { data } = await api.post('/categorias', { nome })
      categorias.value.push(data.categoria)
      useToastStore().sucesso(data.mensagem)
      return data.categoria
    } catch (e) {
      const mensagem = e.response?.data?.mensagens?.[0] ?? 'Não foi possível cadastrar a categoria.'
      useToastStore().erro(mensagem)
      throw e
    }
  }

  return { categorias, carregando, erro, buscarCategorias, criarCategoria }
})
