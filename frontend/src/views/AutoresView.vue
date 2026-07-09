<script setup>
import { onMounted } from 'vue'
import { useAutoresStore } from '../stores/autores.js'
import SimpleEntityManager from '../components/common/SimpleEntityManager.vue'

const autoresStore = useAutoresStore()

//// equivalente ao useEffect do react, executa uma vez só quando o componente é montado
onMounted(() => {
  autoresStore.buscarAutores()
})

function criarAutor(nome) {
  autoresStore.criarAutor(nome).catch(() => {})
}
</script>

<template>
  <SimpleEntityManager
    titulo="Autores"
    placeholder="Nome do autor"
    :itens="autoresStore.autores"
    :carregando="autoresStore.carregando"
    :erro="autoresStore.erro"
    @criar="criarAutor"
  />
</template>
