<script setup>
import { onMounted } from 'vue'
import { useCategoriasStore } from '../stores/categorias.js'
import SimpleEntityManager from '../components/common/SimpleEntityManager.vue'

const categoriasStore = useCategoriasStore()

onMounted(() => {
  categoriasStore.buscarCategorias()
})

function criarCategoria(nome) {
  categoriasStore.criarCategoria(nome).catch(() => {})
}
</script>

<template>
  <SimpleEntityManager
    titulo="Categorias"
    placeholder="Nome da categoria"
    :itens="categoriasStore.categorias"
    :carregando="categoriasStore.carregando"
    :erro="categoriasStore.erro"
    @criar="criarCategoria"
  />
</template>
