<script setup>
defineProps({
  livros: { type: Array, required: true },
  carregando: { type: Boolean, default: false },
})

const emit = defineEmits(['editar', 'inativar'])
</script>

<template>
  <div class="overflow-x-auto rounded-md border border-primary/10 bg-secondary/20">
    <table class="w-full text-left text-sm">
      <thead class="border-b border-primary/10">
        <tr>
          <th class="px-4 py-3 text-xs font-medium uppercase tracking-wide text-primary/50">Título</th>
          <th class="px-4 py-3 text-xs font-medium uppercase tracking-wide text-primary/50">ISBN</th>
          <th class="px-4 py-3 text-xs font-medium uppercase tracking-wide text-primary/50">Autor</th>
          <th class="px-4 py-3 text-xs font-medium uppercase tracking-wide text-primary/50">Categoria</th>
          <th class="px-4 py-3 text-xs font-medium uppercase tracking-wide text-primary/50">Preço</th>
          <th class="px-4 py-3 text-xs font-medium uppercase tracking-wide text-primary/50">Estoque</th>
          <th class="px-4 py-3 text-right text-xs font-medium uppercase tracking-wide text-primary/50">Ações</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-primary/5">
        <tr v-if="carregando">
          <td colspan="7" class="px-4 py-10 text-center text-sm text-ink/40">
            Carregando o catálogo...
          </td>
        </tr>

        <tr v-else-if="livros.length === 0">
          <td colspan="7" class="px-4 py-10 text-center text-sm text-ink/40">
            Nenhum livro encontrado nesta coleção.
          </td>
        </tr>

        <tr v-for="livro in livros" :key="livro.id" class="transition-colors hover:bg-secondary/50">
          <td class="px-4 py-3 font-serif text-base text-primary">{{ livro.titulo }}</td>
          <td class="px-4 py-3 text-ink/60">{{ livro.isbn }}</td>
          <td class="px-4 py-3 text-ink/60">{{ livro.autor.nome }}</td>
          <td class="px-4 py-3 text-ink/60">{{ livro.categoria.nome }}</td>
          <td class="px-4 py-3 text-ink/60">
            {{ Number(livro.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
          </td>
          <td class="px-4 py-3 text-ink/60">{{ livro.quantidade }}</td>
          <td class="px-4 py-3">
            <div class="flex justify-end gap-4 text-xs uppercase tracking-wide">
              <button
                type="button"
                class="text-primary/70 transition-colors hover:text-primary"
                @click="emit('editar', livro)"
              >
                Editar
              </button>
              <button
                type="button"
                class="text-red-700/70 transition-colors hover:text-red-700"
                @click="emit('inativar', livro)"
              >
                Remover
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
