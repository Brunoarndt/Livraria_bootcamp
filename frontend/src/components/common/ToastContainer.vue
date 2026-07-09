<script setup>
import { useToastStore } from '../../stores/toast.js'

const toastStore = useToastStore()
</script>

<template>
  <Teleport to="body">
    <div class="fixed right-4 top-4 z-[100] flex w-full max-w-sm flex-col gap-2">
      <TransitionGroup
        enter-active-class="transition-all duration-200"
        enter-from-class="opacity-0 translate-x-4"
        leave-active-class="transition-all duration-150"
        leave-to-class="opacity-0"
      >
        <div
          v-for="toast in toastStore.toasts"
          :key="toast.id"
          class="flex items-start justify-between gap-3 rounded-md border px-4 py-3 text-sm shadow-sm"
          :class="toast.tipo === 'sucesso'
            ? 'border-green-200 bg-green-50 text-green-700'
            : 'border-red-200 bg-red-50 text-red-700'"
        >
          <span>{{ toast.mensagem }}</span>
          <button
            type="button"
            class="text-xs opacity-60 hover:opacity-100"
            @click="toastStore.remover(toast.id)"
          >
            ✕
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>
