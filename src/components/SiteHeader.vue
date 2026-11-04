<script setup lang="ts">
import { ref } from 'vue'
import { WORKBENCH_URL, navLinks } from '../data/portal'

defineProps<{ hidden: boolean }>()
const menuOpen = ref(false)

function closeMenu() {
  menuOpen.value = false
}
</script>

<template>
  <header class="site-header" :class="{ 'is-hidden': hidden }">
    <div class="nav-shell">
      <a class="brand" href="#" data-scroll-top aria-label="ATLAS 首页" @click="closeMenu">
        <span class="brand-name">ATLAS</span>
        <span class="brand-subtitle">工业大模型与智能体评测平台</span>
      </a>
      <button
        class="nav-toggle"
        type="button"
        :aria-expanded="menuOpen"
        aria-controls="primary-nav"
        @click="menuOpen = !menuOpen"
      >
        导航
      </button>
      <nav id="primary-nav" class="primary-nav" :class="{ 'is-open': menuOpen }" aria-label="主要导航">
        <a v-for="link in navLinks" :key="link.href" :href="link.href" @click="closeMenu">{{ link.label }}</a>
        <a class="nav-action" :href="WORKBENCH_URL" @click="closeMenu">评测工作台</a>
      </nav>
    </div>
  </header>
</template>
