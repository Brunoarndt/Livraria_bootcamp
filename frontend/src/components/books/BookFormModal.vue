<script setup>
import { reactive, watch } from 'vue'

// praticamente igual definir as props do componente react mas aqui também dá pra tipar e colocar valor padrão
const props = defineProps({
  aberto: { type: Boolean, default: false },
  livro: { type: Object, default: null }, 
  autores: { type: Array, default: () => [] },
  categorias: { type: Array, default: () => [] },
  erros: { type: Array, default: () => [] },
})

// equivalente ao callback que o componente pai passa no react, mas ao invés de receber onSalvar e onFechar como props, o componente emite eventos e o pai escuta
const emit = defineEmits(['salvar', 'fechar'])

// parecido com o useState contendo todo o formulário, mas como é reactive não precisa fazer setState, só altera as propriedades
const form = reactive({
  titulo: '',
  isbn: '',
  preco: '',
  quantidade: '',
  autorId: '',
  categoriaId: '',
})

function resetarFormulario() {
  form.titulo = props.livro?.titulo ?? ''
  form.isbn = props.livro?.isbn ?? ''
  form.preco = props.livro?.preco ?? ''
  form.quantidade = props.livro?.quantidade ?? ''
  form.autorId = props.livro?.autorId ?? props.livro?.autor?.id ?? ''
  form.categoriaId = props.livro?.categoriaId ?? props.livro?.categoria?.id ?? ''
}

// parecido com um useEffect, sempre que o modal abre sincroniza o form com os dados recebidos
watch(() => props.aberto, (estaAberto) => {
  if (estaAberto) resetarFormulario()
})

function salvar() {
  emit('salvar', { ...form })
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-150"
      leave-active-class="transition-opacity duration-150"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="aberto"
        class="fixed inset-0 z-50 flex items-center justify-center bg-ink/30 px-4"
        @click.self="emit('fechar')"
      >
        <div class="w-full max-w-md rounded-md border border-primary/10 bg-secondary p-6 shadow-md">
          <h2 class="mb-5 font-serif text-xl text-primary">
            {{ livro ? 'Editar livro' : 'Novo livro' }}
          </h2>
 
          <ul v-if="erros.length" class="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
            <li v-for="(mensagem, i) in erros" :key="i">{{ mensagem }}</li>
          </ul>
 
          <form class="flex flex-col gap-4" @submit.prevent="salvar">
            <div>
              <label class="mb-1 block text-sm text-ink/60">Título</label>
              <input
                v-model="form.titulo"
                type="text"
                required
                class="w-full rounded-md border border-primary/20 bg-background px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none"
              />
            </div>
 
            <div>
              <label class="mb-1 block text-sm text-ink/60">ISBN</label>
              <input
                v-model="form.isbn"
                type="text"
                required
                class="w-full rounded-md border border-primary/20 bg-background px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none"
              />
            </div>
 
            <div class="flex gap-4">
              <div class="flex-1">
                <label class="mb-1 block text-sm text-ink/60">Preço</label>
                <input
                  v-model.number="form.preco"
                  type="number"
                  step="0.01"
                  min="0.01"
                  required
                  class="w-full rounded-md border border-primary/20 bg-background px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none"
                />
              </div>
              <div class="flex-1">
                <label class="mb-1 block text-sm text-ink/60">Estoque</label>
                <input
                  v-model.number="form.quantidade"
                  type="number"
                  min="0"
                  required
                  class="w-full rounded-md border border-primary/20 bg-background px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none"
                />
              </div>
            </div>
 
            <div>
              <label class="mb-1 block text-sm text-ink/60">Autor</label>
              <select
                v-model="form.autorId"
                required
                class="w-full rounded-md border border-primary/20 bg-background px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none"
              >
                <option value="" disabled>Selecione um autor</option>
                <option v-for="autor in autores" :key="autor.id" :value="autor.id">
                  {{ autor.nome }}
                </option>
              </select>
            </div>
 
            <div>
              <label class="mb-1 block text-sm text-ink/60">Categoria</label>
              <select
                v-model="form.categoriaId"
                required
                class="w-full rounded-md border border-primary/20 bg-background px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none"
              >
                <option value="" disabled>Selecione uma categoria</option>
                <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">
                  {{ categoria.nome }}
                </option>
              </select>
            </div>
 
            <div class="mt-2 flex justify-end gap-2">
              <button
                type="button"
                class="rounded-md px-4 py-2 text-sm text-ink/60 transition-colors hover:text-ink"
                @click="emit('fechar')"
              >
                Cancelar
              </button>
              <button
                type="submit"
                class="rounded-md bg-primary px-5 py-2.5 text-sm text-secondary transition-colors hover:bg-primary/90"
              >
                Salvar
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>