import { onBeforeUnmount, onMounted, ref } from 'vue'

type SnapPoint = { top: number; section: HTMLElement }

export function useScrollExperience() {
  const headerHidden = ref(false)
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  const snapEnabled = window.matchMedia('(min-width: 60rem) and (pointer: fine)')
  let sections: HTMLElement[] = []
  let siteHeader: HTMLElement | null = null
  let lastScrollY = window.scrollY
  let transitioning = false
  let wheelLockedUntil = 0
  let scrollFrame = 0
  let scrollDirection = 0
  let fadeTimer = 0
  let touchStartX = 0
  let touchStartY = 0
  let touchTracking = false

  const cleanups: Array<() => void> = []
  const listen = <K extends keyof WindowEventMap>(
    target: Window,
    type: K,
    handler: (event: WindowEventMap[K]) => void,
    options?: AddEventListenerOptions,
  ) => {
    target.addEventListener(type, handler, options)
    cleanups.push(() => target.removeEventListener(type, handler, options))
  }

  const headerOffset = () => (siteHeader?.offsetHeight ?? 0) + 16
  const navOpen = () => document.querySelector('.primary-nav')?.classList.contains('is-open') ?? false
  const dialogOpen = () => document.querySelector<HTMLDialogElement>('.detail-dialog')?.open ?? false

  function setHeaderHidden(hidden: boolean) {
    if (!hidden || window.scrollY < 72 || navOpen()) {
      headerHidden.value = false
      return
    }
    headerHidden.value = true
  }

  function snapPlan(): SnapPoint[] {
    const viewport = window.innerHeight
    const offset = headerOffset()
    const plan: SnapPoint[] = []
    sections.forEach((section, index) => {
      const top = section.getBoundingClientRect().top + window.scrollY
      const height = section.offsetHeight
      plan.push({ top: index === 0 ? 0 : Math.max(0, top - offset), section })
      if (height > viewport * 0.9) {
        const step = Math.round(viewport * 0.72)
        for (let y = top + step; y < top + height - viewport * 0.28; y += step) {
          plan.push({ top: Math.max(0, y - offset), section })
        }
      }
    })
    const maxScroll = Math.max(0, document.documentElement.scrollHeight - viewport)
    if (sections.length) plan.push({ top: maxScroll, section: sections[sections.length - 1] })
    const sorted = plan.sort((a, b) => a.top - b.top)
    const unique: SnapPoint[] = []
    sorted.forEach((item) => {
      if (unique.some((existing) => Math.abs(existing.top - item.top) < 2)) return
      unique.push({ ...item, top: Math.max(0, Math.min(item.top, maxScroll)) })
    })
    return unique
  }

  function currentSection() {
    const threshold = window.scrollY + headerOffset() + 20
    let current = sections[0]
    sections.forEach((section) => {
      const top = section.getBoundingClientRect().top + window.scrollY
      if (top <= threshold) current = section
    })
    return current
  }

  const easeInOutCubic = (progress: number) => progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 3) / 2

  function easeScrollTo(target: number, onComplete?: () => void) {
    cancelAnimationFrame(scrollFrame)
    const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
    const destination = Math.min(Math.max(0, target), maxScroll)
    const start = window.scrollY
    const distance = destination - start
    const direction = Math.sign(distance)
    if (Math.abs(distance) < 1) {
      setHeaderHidden(false)
      onComplete?.()
      return
    }
    const duration = Math.min(620, Math.max(320, Math.abs(distance) * 0.42))
    const startTime = performance.now()
    transitioning = true
    scrollDirection = direction

    const step = (now: number) => {
      const progress = Math.min(1, (now - startTime) / duration)
      window.scrollTo(0, start + distance * easeInOutCubic(progress))
      if (progress < 1) {
        scrollFrame = requestAnimationFrame(step)
        return
      }
      window.scrollTo(0, destination)
      transitioning = false
      scrollDirection = 0
      setHeaderHidden(direction > 0 && destination > 72)
      onComplete?.()
    }
    scrollFrame = requestAnimationFrame(step)
  }

  function clearSectionFades() {
    window.clearTimeout(fadeTimer)
    document.querySelectorAll<HTMLElement>('[data-snap-section].is-fading-out, [data-snap-section].is-fading-in')
      .forEach((section) => section.classList.remove('is-fading-out', 'is-fading-in'))
  }

  function crossfadeTo(targetSection: HTMLElement, target: number) {
    const from = currentSection()
    if (!from || !targetSection || from === targetSection || reducedMotion.matches) {
      easeScrollTo(target)
      return
    }
    from.classList.add('is-fading-out')
    targetSection.classList.add('is-fading-in')
    easeScrollTo(target, () => {
      requestAnimationFrame(() => {
        targetSection.classList.remove('is-fading-in')
        from.classList.remove('is-fading-out')
      })
    })
    fadeTimer = window.setTimeout(() => targetSection.classList.remove('is-fading-in'), 180)
  }

  function snapBy(direction: number, force = false) {
    if ((!force && !snapEnabled.matches) || reducedMotion.matches || transitioning || Date.now() < wheelLockedUntil) return false
    const plan = snapPlan()
    const current = window.scrollY
    let currentIndex = -1
    plan.forEach((item, index) => {
      if (item.top <= current + 24) currentIndex = index
    })
    if (currentIndex < 0) currentIndex = 0
    const targetIndex = Math.max(0, Math.min(plan.length - 1, currentIndex + (direction > 0 ? 1 : -1)))
    const item = plan[targetIndex]
    if (!item || Math.abs(item.top - current) < 2) return false
    wheelLockedUntil = Date.now() + 420
    crossfadeTo(item.section, item.top)
    return true
  }

  const onWheel = (event: WheelEvent) => {
    if (event.ctrlKey || Math.abs(event.deltaY) < 2) return
    if (dialogOpen() || navOpen()) return
    if (!snapEnabled.matches || reducedMotion.matches) return
    const direction = event.deltaY > 0 ? 1 : -1
    if (transitioning) {
      event.preventDefault()
      if (scrollDirection && direction !== scrollDirection) {
        cancelAnimationFrame(scrollFrame)
        transitioning = false
        scrollDirection = 0
        wheelLockedUntil = 0
        clearSectionFades()
        snapBy(direction, true)
      }
      return
    }
    event.preventDefault()
    snapBy(direction)
  }

  const onScroll = () => {
    const current = window.scrollY
    if (current < 72 || current < lastScrollY - 4) setHeaderHidden(false)
    else if (current > lastScrollY + 4) setHeaderHidden(true)
    lastScrollY = current
  }

  const onAnchorClick = (event: MouseEvent) => {
    const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[data-scroll-top], a[href^="#"]')
    if (!link) return
    if (link.hasAttribute('data-scroll-top')) {
      event.preventDefault()
      wheelLockedUntil = Date.now() + 420
      crossfadeTo(sections[0], 0)
      history.replaceState(null, '', `${location.pathname}${location.search}`)
      return
    }
    const hash = link.getAttribute('href')
    if (!hash || hash === '#') return
    const target = document.querySelector<HTMLElement>(hash)
    if (!target) return
    event.preventDefault()
    const top = target.getBoundingClientRect().top + window.scrollY - headerOffset()
    wheelLockedUntil = Date.now() + 420
    crossfadeTo(target.closest<HTMLElement>('[data-snap-section]') ?? target, Math.max(0, top))
    history.replaceState(null, '', hash)
  }

  const onTouchStart = (event: TouchEvent) => {
    if (event.touches.length !== 1 || dialogOpen() || navOpen()) return
    touchStartX = event.touches[0].clientX
    touchStartY = event.touches[0].clientY
    touchTracking = true
  }

  const onTouchMove = (event: TouchEvent) => {
    if (!touchTracking || event.touches.length !== 1) return
    const deltaX = event.touches[0].clientX - touchStartX
    const deltaY = event.touches[0].clientY - touchStartY
    if (Math.abs(deltaY) < 34 || Math.abs(deltaY) < Math.abs(deltaX) * 1.25) return
    touchTracking = false
    if (snapBy(deltaY < 0 ? 1 : -1, true)) event.preventDefault()
  }

  const onTouchEnd = () => { touchTracking = false }

  const syncSnapClass = () => {
    document.documentElement.classList.toggle('snap-enabled', snapEnabled.matches && !reducedMotion.matches)
  }

  onMounted(() => {
    sections = [...document.querySelectorAll<HTMLElement>('[data-snap-section]')]
    siteHeader = document.querySelector<HTMLElement>('.site-header')
    listen(window, 'wheel', onWheel, { passive: false })
    listen(window, 'scroll', onScroll, { passive: true })
    listen(window, 'touchstart', onTouchStart, { passive: true })
    listen(window, 'touchmove', onTouchMove, { passive: false })
    listen(window, 'touchend', onTouchEnd, { passive: true })
    document.addEventListener('click', onAnchorClick)
    cleanups.push(() => document.removeEventListener('click', onAnchorClick))
    snapEnabled.addEventListener('change', syncSnapClass)
    reducedMotion.addEventListener('change', syncSnapClass)
    cleanups.push(() => {
      snapEnabled.removeEventListener('change', syncSnapClass)
      reducedMotion.removeEventListener('change', syncSnapClass)
    })
    syncSnapClass()
  })

  onBeforeUnmount(() => {
    cancelAnimationFrame(scrollFrame)
    window.clearTimeout(fadeTimer)
    cleanups.forEach((cleanup) => cleanup())
  })

  return { headerHidden }
}
