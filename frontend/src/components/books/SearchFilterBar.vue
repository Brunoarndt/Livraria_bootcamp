<script setup>
defineProps({
  autores: { type: Array, default: () => [] },
  categorias: { type: Array, default: () => [] },
})

// defineModel cria automaticamente o par prop+emit para v-model.
// É o equivalente Vue de um input controlado do React, mas sem escrever
// :value e @input manualmente — o v-model do componente pai já sincroniza.
const busca = defineModel('busca', { default: '' })
const autorId = defineModel('autorId', { default: '' })
const categoriaId = defineModel('categoriaId', { default: '' })
</script>

<template>
  <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
    <input
      v-model="busca"
      type="text"
      placeholder="Buscar por título ou ISBN..."
      class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none sm:max-w-xs"
    />

    <select
      v-model="autorId"
      class="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none"
    >
      <option value="">Todos os autores</option>
      <option v-for="autor in autores" :key="autor.id" :value="autor.id">
        {{ autor.nome }}
      </option>
    </select>

    <select
      v-model="categoriaId"
      class="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none"
    >
      <option value="">Todas as categorias</option>
      <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">
        {{ categoria.nome }}
      </option>
    </select>
  </div>
</template>
