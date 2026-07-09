<script setup>
defineProps({
  livros: { type: Array, required: true },
  carregando: { type: Boolean, default: false },
})

const emit = defineEmits(['editar', 'inativar'])
</script>

<template>
  <div class="overflow-x-auto rounded-md border border-gray-200 bg-white">
    <table class="w-full text-left text-sm">
      <thead class="border-b border-gray-200 bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
        <tr>
          <th class="px-4 py-3 font-medium">Título</th>
          <th class="px-4 py-3 font-medium">ISBN</th>
          <th class="px-4 py-3 font-medium">Autor</th>
          <th class="px-4 py-3 font-medium">Categoria</th>
          <th class="px-4 py-3 font-medium">Preço</th>
          <th class="px-4 py-3 font-medium">Estoque</th>
          <th class="px-4 py-3 font-medium text-right">Ações</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-100">
        <tr v-if="carregando">
          <td colspan="7" class="px-4 py-8 text-center text-gray-400">
            Carregando livros...
          </td>
        </tr>

        <tr v-else-if="livros.length === 0">
          <td colspan="7" class="px-4 py-8 text-center text-gray-400">
            Nenhum livro encontrado.
          </td>
        </tr>

        <tr v-for="livro in livros" :key="livro.id" class="hover:bg-gray-50">
          <td class="px-4 py-3 font-medium text-gray-900">{{ livro.titulo }}</td>
          <td class="px-4 py-3 text-gray-500">{{ livro.isbn }}</td>
          <td class="px-4 py-3 text-gray-500">{{ livro.autor.nome }}</td>
          <td class="px-4 py-3 text-gray-500">{{ livro.categoria.nome }}</td>
          <td class="px-4 py-3 text-gray-500">
            {{ Number(livro.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
          </td>
          <td class="px-4 py-3 text-gray-500">{{ livro.quantidade }}</td>
          <td class="px-4 py-3">
            <div class="flex justify-end gap-3">
              <button
                type="button"
                class="text-sm text-gray-600 hover:text-gray-900"
                @click="emit('editar', livro)"
              >
                Editar
              </button>
              <button
                type="button"
                class="text-sm text-red-500 hover:text-red-700"
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
