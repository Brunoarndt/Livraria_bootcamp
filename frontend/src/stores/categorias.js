import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../services/api.js'

export const useCategoriasStore = defineStore('categorias', () => {
  const categorias = ref([])

  async function buscarCategorias() {
    const { data } = await api.get('/categorias')
    categorias.value = data
  }

  async function criarCategoria(nome) {
    const { data } = await api.post('/categorias', { nome })
    categorias.value.push(data.categoria)
    return data.categoria
  }

  return { categorias, buscarCategorias, criarCategoria }
})
