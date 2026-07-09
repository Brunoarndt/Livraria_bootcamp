<script setup>
const links = [
  { to: '/', label: 'Livros' },
  { to: '/autores', label: 'Autores' },
  { to: '/categorias', label: 'Categorias' },
]
</script>

<template>
  <nav class="border-b border-gray-200 bg-white">
    <div class="mx-auto flex max-w-5xl gap-6 px-4 py-3 sm:px-6">
      <RouterLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="text-sm text-gray-500 hover:text-gray-900"
        active-class="font-medium text-gray-900"
      >
        {{ link.label }}
      </RouterLink>
    </div>
  </nav>
</template>
