<script setup>
const links = [
  { to: '/', label: 'Catálogo' },
  { to: '/autores', label: 'Autores' },
  { to: '/categorias', label: 'Categorias' },
]
</script>

<template>
  <nav class="border-b border-primary/10 bg-background">
    <div class="mx-auto flex max-w-5xl items-center gap-8 px-4 py-4 sm:px-6">
      <span class="font-serif text-lg text-primary">Sabitiruc's</span>
      <div class="flex gap-6">
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="text-sm text-ink/50 transition-colors hover:text-primary"
          active-class="text-primary border-b border-accent"
        >
          {{ link.label }}
        </RouterLink>
      </div>
    </div>
  </nav>
</template>
