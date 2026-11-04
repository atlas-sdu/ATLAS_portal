<script setup lang="ts">
import { footerLinks } from '../data/portal'
</script>

<template>
  <footer class="site-footer">
    <div class="container footer-grid">
      <div>
        <a class="footer-brand" href="#" data-scroll-top>ATLAS</a>
        <p>工业大模型与智能体评测平台</p>
      </div>
      <nav class="footer-nav" aria-label="页脚导航">
        <a v-for="link in footerLinks" :key="link.href" :href="link.href">{{ link.label }}</a>
      </nav>
    </div>
  </footer>
</template>
