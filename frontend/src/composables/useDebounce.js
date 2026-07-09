import { ref, watch } from 'vue'

/**
 * Retorna uma ref que só é atualizada `delay` ms depois da última mudança do valor de origem.
 * Equivalente a um useDebounce customizado no React.
 */
export function useDebounce(valorOrigem, delay = 400) {
  const valorComDebounce = ref(valorOrigem.value)
  let timeoutId

  watch(valorOrigem, (novoValor) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      valorComDebounce.value = novoValor
    }, delay)
  })

  return valorComDebounce
}
