<script setup>
defineProps({
  autores: { type: Array, default: () => [] },
  categorias: { type: Array, default: () => [] },
})
// defineModel cria automaticamente o par prop+emit para v-model, o equivalente do input controlado do react, mas bem mais facil
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
      class="w-full rounded-md border border-primary/20 bg-background px-3 py-2 text-sm text-ink placeholder:text-ink/40 focus:border-primary focus:outline-none sm:max-w-xs"
    />

    <select
      v-model="autorId"
      class="rounded-md border border-primary/20 bg-background px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none"
    >
      <option value="">Todos os autores</option>
      <option v-for="autor in autores" :key="autor.id" :value="autor.id">
        {{ autor.nome }}
      </option>
    </select>

    <select
      v-model="categoriaId"
      class="rounded-md border border-primary/20 bg-background px-3 py-2 text-sm text-ink focus:border-primary focus:outline-none"
    >
      <option value="">Todas as categorias</option>
      <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">
        {{ categoria.nome }}
      </option>
    </select>
  </div>
</template>
