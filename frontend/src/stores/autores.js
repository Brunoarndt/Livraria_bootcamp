import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../services/api.js'
import { useToastStore } from './toast.js'

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
      useToastStore().erro(erro.value)
    } finally {
      carregando.value = false
    }
  }

  async function criarAutor(nome) {
    try {
      const { data } = await api.post('/autores', { nome })
      autores.value.push(data.autor)
      useToastStore().sucesso(data.mensagem)
      return data.autor
    } catch (e) {
      const mensagem = e.response?.data?.mensagens?.[0] ?? 'Não foi possível cadastrar o autor.'
      useToastStore().erro(mensagem)
      throw e
    }
  }

  return { autores, carregando, erro, buscarAutores, criarAutor }
})
