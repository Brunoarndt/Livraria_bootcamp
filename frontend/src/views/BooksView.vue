<script setup>
import { ref, watch, onMounted } from 'vue'
import { useLivrosStore } from '../stores/livros.js'
import { useAutoresStore } from '../stores/autores.js'
import { useCategoriasStore } from '../stores/categorias.js'
import { useDebounce } from '../composables/useDebounce.js'
import BookTable from '../components/books/BookTable.vue'
import BookFormModal from '../components/books/BookFormModal.vue'
import SearchFilterBar from '../components/books/SearchFilterBar.vue'
import ConfirmDialog from '../components/common/ConfirmDialog.vue'

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

const confirmacaoAberta = ref(false)
const livroParaRemover = ref(null)

function buscar() {
  livrosStore.buscarLivros({
    busca: buscaComDebounce.value,
    autorId: autorId.value,
    categoriaId: categoriaId.value,
  })
}

// refaz a busca sempre que busca (com debounce), equivalente ao useEffect com array de dependencias no react, mas sem precisar listar manualmente
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

function pedirConfirmacaoRemocao(livro) {
  livroParaRemover.value = livro
  confirmacaoAberta.value = true
}

async function confirmarRemocao() {
  try {
    await livrosStore.inativarLivro(livroParaRemover.value.id)
  } catch {
    // erro já notificado pelo toast
  } finally {
    confirmacaoAberta.value = false
    livroParaRemover.value = null
  }
}

function cancelarRemocao() {
  confirmacaoAberta.value = false
  livroParaRemover.value = null
}
</script>

<template>
  <div class="min-h-screen bg-background">
    <div class="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div class="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 class="font-serif text-3xl text-primary">Catálogo</h1>
          <p class="mt-1 text-sm text-ink/50">Livros na coleção Sabitiruc's</p>
        </div>
        <button
          type="button"
          class="w-full rounded-md bg-primary px-5 py-2.5 text-sm text-secondary transition-colors hover:bg-primary/90 sm:w-auto"
          @click="abrirCadastro"
        >
          Novo livro
        </button>
      </div>

      <div class="mb-6 rounded-md border border-primary/10 bg-secondary/40 p-4">
        <SearchFilterBar
          v-model:busca="busca"
          v-model:autor-id="autorId"
          v-model:categoria-id="categoriaId"
          :autores="autoresStore.autores"
          :categorias="categoriasStore.categorias"
        />
      </div>

      <p v-if="livrosStore.erro" class="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
        {{ livrosStore.erro }}
      </p>

      <BookTable
        :livros="livrosStore.livros"
        :carregando="livrosStore.carregando"
        @editar="abrirEdicao"
        @inativar="pedirConfirmacaoRemocao"
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

      <ConfirmDialog
        :aberto="confirmacaoAberta"
        titulo="Remover livro"
        :mensagem="livroParaRemover ? `Remover '${livroParaRemover.titulo}' do catálogo?` : ''"
        texto-confirmar="Remover"
        @confirmar="confirmarRemocao"
        @cancelar="cancelarRemocao"
      />
    </div>
  </div>
</template>
