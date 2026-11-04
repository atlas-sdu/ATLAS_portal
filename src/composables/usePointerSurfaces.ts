import { onBeforeUnmount, onMounted } from 'vue'

export function usePointerSurfaces() {
  const cleanups: Array<() => void> = []

  onMounted(() => {
    document.querySelectorAll<HTMLElement>('[data-glass], [data-spotlight]').forEach((surface) => {
      const move = (event: PointerEvent) => {
        const rect = surface.getBoundingClientRect()
        surface.style.setProperty('--pointer-x', `${event.clientX - rect.left}px`)
        surface.style.setProperty('--pointer-y', `${event.clientY - rect.top}px`)
      }
      const leave = () => {
        surface.style.removeProperty('--pointer-x')
        surface.style.removeProperty('--pointer-y')
      }
      surface.addEventListener('pointermove', move)
      surface.addEventListener('pointerleave', leave)
      cleanups.push(() => {
        surface.removeEventListener('pointermove', move)
        surface.removeEventListener('pointerleave', leave)
      })
    })
  })

  onBeforeUnmount(() => cleanups.forEach((cleanup) => cleanup()))
}
