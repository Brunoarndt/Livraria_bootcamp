import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../services/api.js'

export const useAutoresStore = defineStore('autores', () => {
  const autores = ref([])

  async function buscarAutores() {
    const { data } = await api.get('/autores')
    autores.value = data
  }

  async function criarAutor(nome) {
    const { data } = await api.post('/autores', { nome })
    autores.value.push(data.autor)
    return data.autor
  }

  return { autores, buscarAutores, criarAutor }
})
