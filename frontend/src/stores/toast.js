import { defineStore } from 'pinia'
import { ref } from 'vue'

let proximoId = 1

export const useToastStore = defineStore('toast', () => {
  const toasts = ref([])

  function remover(id) {
    toasts.value = toasts.value.filter((toast) => toast.id !== id)
  }

  function adicionar(mensagem, tipo = 'sucesso', duracaoMs = 4000) {
    const id = proximoId++
    toasts.value.push({ id, mensagem, tipo })
    setTimeout(() => remover(id), duracaoMs)
  }

  function sucesso(mensagem) {
    adicionar(mensagem, 'sucesso')
  }

  function erro(mensagem) {
    adicionar(mensagem, 'erro')
  }

  return { toasts, sucesso, erro, remover }
})
