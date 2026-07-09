<script setup>
import { ref } from 'vue'

const props = defineProps({
  titulo: { type: String, required: true },
  placeholder: { type: String, default: 'Nome' },
  itens: { type: Array, required: true },
  carregando: { type: Boolean, default: false },
  erro: { type: String, default: null },
})

const emit = defineEmits(['criar'])

const novoNome = ref('')
const enviando = ref(false)

async function enviarFormulario() {
  if (!novoNome.value.trim()) return
  enviando.value = true
  try {
    emit('criar', novoNome.value.trim())
    novoNome.value = ''
  } finally {
    enviando.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-background">
    <div class="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <h1 class="mb-8 font-serif text-3xl text-primary">{{ titulo }}</h1>

      <form class="mb-6 flex flex-col gap-3 sm:flex-row" @submit.prevent="enviarFormulario">
        <input
          v-model="novoNome"
          type="text"
          :placeholder="placeholder"
          required
          class="w-full rounded-md border border-primary/20 bg-background px-3 py-2 text-sm text-ink placeholder:text-ink/40 focus:border-primary focus:outline-none sm:flex-1"
        />
        <button
          type="submit"
          :disabled="enviando"
          class="w-full rounded-md bg-primary px-5 py-2.5 text-sm text-secondary transition-colors hover:bg-primary/90 disabled:opacity-50 sm:w-auto"
        >
          Adicionar
        </button>
      </form>

      <p v-if="erro" class="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{{ erro }}</p>

      <div class="rounded-md border border-primary/10 bg-secondary/20">
        <p v-if="carregando" class="px-4 py-8 text-center text-sm text-ink/40">Carregando...</p>
        <p v-else-if="itens.length === 0" class="px-4 py-8 text-center text-sm text-ink/40">
          Nenhum registro cadastrado ainda.
        </p>
        <ul v-else class="divide-y divide-primary/5">
          <li v-for="item in itens" :key="item.id" class="px-4 py-3 text-sm text-ink/80">
            {{ item.nome }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
