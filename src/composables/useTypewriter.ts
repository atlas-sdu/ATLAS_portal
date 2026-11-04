import { onBeforeUnmount, onMounted, ref } from 'vue'

const firstLine = '让工业智能的每一步，'
const secondLine = '都有据可验。'
const fullTitle = firstLine + secondLine

export function useTypewriter() {
  const media = window.matchMedia('(prefers-reduced-motion: reduce)')
  const reducedMotion = ref(media.matches)
  const typedHtml = ref(`${firstLine}<br>${secondLine}`)
  const paused = ref(false)
  let titleLength = fullTitle.length
  let deleting = false
  let timer: ReturnType<typeof setTimeout> | undefined

  function renderTitle(length: number) {
    if (length <= firstLine.length) {
      typedHtml.value = firstLine.slice(0, length)
      return
    }
    typedHtml.value = `${firstLine}<br>${secondLine.slice(0, length - firstLine.length)}`
  }

  function schedule(delay: number) {
    window.clearTimeout(timer)
    if (paused.value || reducedMotion.value) return
    timer = window.setTimeout(tick, delay)
  }

  function tick() {
    if (paused.value || reducedMotion.value) return
    if (!deleting) {
      if (titleLength < fullTitle.length) {
        titleLength += 1
        renderTitle(titleLength)
        schedule(72)
        return
      }
      deleting = true
      schedule(1800)
      return
    }
    if (titleLength > 0) {
      titleLength -= 1
      renderTitle(titleLength)
      schedule(38)
      return
    }
    deleting = false
    schedule(520)
  }

  function toggle() {
    paused.value = !paused.value
    if (paused.value) window.clearTimeout(timer)
    else schedule(120)
  }

  function syncMotionPreference() {
    reducedMotion.value = media.matches
    if (reducedMotion.value) {
      window.clearTimeout(timer)
      typedHtml.value = `${firstLine}<br>${secondLine}`
      titleLength = fullTitle.length
    }
  }

  onMounted(() => {
    media.addEventListener('change', syncMotionPreference)
    if (!reducedMotion.value) {
      typedHtml.value = ''
      renderTitle(0)
      schedule(700)
    }
  })

  onBeforeUnmount(() => {
    window.clearTimeout(timer)
    media.removeEventListener('change', syncMotionPreference)
  })

  return { typedHtml, paused, reducedMotion, toggle }
}
