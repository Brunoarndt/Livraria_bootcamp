import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../services/api.js'

export const useAutoresStore = defineStore('autores', () => {
  const autores = ref([])
  const carregando = ref(false)
  const erro = ref(null)

  async function buscarAutores() {
    carregando.value = true
    erro.value = null
    try {
      const { data } = await api.get('/autores')
      autores.value = data
    } catch (e) {
      erro.value = 'Não foi possível carregar os autores.'
    } finally {
      carregando.value = false
    }
  }

  async function criarAutor(nome) {
    erro.value = null
    try {
      const { data } = await api.post('/autores', { nome })
      autores.value.push(data.autor)
      return data.autor
    } catch (e) {
      erro.value = e.response?.data?.mensagens?.[0] ?? 'Não foi possível cadastrar o autor.'
      throw e
    }
  }

  return { autores, carregando, erro, buscarAutores, criarAutor }
})
