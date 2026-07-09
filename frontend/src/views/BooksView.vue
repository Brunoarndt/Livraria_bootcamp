<script setup>
import { ref, watch, onMounted } from 'vue'
import { useLivrosStore } from '../stores/livros.js'
import { useAutoresStore } from '../stores/autores.js'
import { useCategoriasStore } from '../stores/categorias.js'
import { useDebounce } from '../composables/useDebounce.js'
import BookTable from '../components/books/BookTable.vue'
import BookFormModal from '../components/books/BookFormModal.vue'
import SearchFilterBar from '../components/books/SearchFilterBar.vue'

const livrosStore = useLivrosStore()
const autoresStore = useAutoresStore()
const categoriasStore = useCategoriasStore()

const busca = ref('')
const autorId = ref('')
const categoriaId = ref('')
const buscaComDebounce = useDebounce(busca, 400)

const modalAberto = ref(false)
const livroSelecionado = ref(null) // null = criando, objeto = editando
const errosFormulario = ref([])

function buscar() {
  livrosStore.buscarLivros({
    busca: buscaComDebounce.value,
    autorId: autorId.value,
    categoriaId: categoriaId.value,
  })
}

// Refaz a busca sempre que busca (com debounce) ou filtros mudarem —
// equivalente a um useEffect com array de dependências no React,
// mas sem precisar listar as dependências manualmente.
watch([buscaComDebounce, autorId, categoriaId], buscar)

onMounted(() => {
  buscar()
  autoresStore.buscarAutores()
  categoriasStore.buscarCategorias()
})

function abrirCadastro() {
  livroSelecionado.value = null
  errosFormulario.value = []
  modalAberto.value = true
}

function abrirEdicao(livro) {
  livroSelecionado.value = livro
  errosFormulario.value = []
  modalAberto.value = true
}

async function salvarLivro(dadosFormulario) {
  try {
    if (livroSelecionado.value) {
      await livrosStore.editarLivro(livroSelecionado.value.id, dadosFormulario)
    } else {
      await livrosStore.criarLivro(dadosFormulario)
    }
    modalAberto.value = false
  } catch (erro) {
    errosFormulario.value = erro.response?.data?.mensagens ?? ['Não foi possível concluir a operação.']
  }
}

async function inativarLivro(livro) {
  if (!confirm(`Remover "${livro.titulo}"?`)) return
  try {
    await livrosStore.inativarLivro(livro.id)
  } catch (erro) {
    livrosStore.erro = 'Não foi possível remover o livro.'
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <div class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 class="text-xl font-semibold text-gray-900">Catálogo de livros</h1>
        <button
          type="button"
          class="w-full rounded-md bg-gray-900 px-4 py-2 text-sm text-white transition-colors hover:bg-gray-800 sm:w-auto"
          @click="abrirCadastro"
        >
          Novo livro
        </button>
      </div>

      <div class="mb-4 rounded-md border border-gray-200 bg-white p-4">
        <SearchFilterBar
          v-model:busca="busca"
          v-model:autor-id="autorId"
          v-model:categoria-id="categoriaId"
          :autores="autoresStore.autores"
          :categorias="categoriasStore.categorias"
        />
      </div>

      <p v-if="livrosStore.erro" class="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
        {{ livrosStore.erro }}
      </p>

      <BookTable
        :livros="livrosStore.livros"
        :carregando="livrosStore.carregando"
        @editar="abrirEdicao"
        @inativar="inativarLivro"
      />

      <BookFormModal
        :aberto="modalAberto"
        :livro="livroSelecionado"
        :autores="autoresStore.autores"
        :categorias="categoriasStore.categorias"
        :erros="errosFormulario"
        @salvar="salvarLivro"
        @fechar="modalAberto = false"
      />
    </div>
  </div>
</template>
