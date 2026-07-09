<script setup>
defineProps({
  aberto: { type: Boolean, default: false },
  titulo: { type: String, default: 'Confirmar ação' },
  mensagem: { type: String, required: true },
  textoConfirmar: { type: String, default: 'Confirmar' },
})

const emit = defineEmits(['confirmar', 'cancelar'])
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-150"
      leave-active-class="transition-opacity duration-150"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="aberto"
        class="fixed inset-0 z-[90] flex items-center justify-center bg-ink/30 px-4"
        @click.self="emit('cancelar')"
      >
        <div class="w-full max-w-sm rounded-md border border-primary/10 bg-secondary p-6 shadow-md">
          <h2 class="mb-2 font-serif text-lg text-primary">{{ titulo }}</h2>
          <p class="mb-6 text-sm text-ink/70">{{ mensagem }}</p>

          <div class="flex justify-end gap-2">
            <button
              type="button"
              class="rounded-md px-4 py-2 text-sm text-ink/60 transition-colors hover:text-ink"
              @click="emit('cancelar')"
            >
              Cancelar
            </button>
            <button
              type="button"
              class="rounded-md bg-primary px-4 py-2 text-sm text-secondary transition-colors hover:bg-primary/90"
              @click="emit('confirmar')"
            >
              {{ textoConfirmar }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
