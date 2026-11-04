<script setup lang="ts">
import SystemPanel from './SystemPanel.vue'
import { useTypewriter } from '../composables/useTypewriter'

const { typedHtml, paused, reducedMotion, toggle } = useTypewriter()
</script>

<template>
  <section class="hero container" data-snap-section aria-labelledby="hero-title">
    <div class="hero-copy">
      <h1
        id="hero-title"
        class="type-title"
        :class="{ 'is-paused': paused }"
        aria-label="让工业智能的每一步，都有据可验。"
      >
        <span class="typed-text" aria-hidden="true" v-html="typedHtml"></span>
        <span class="type-caret" aria-hidden="true"></span>
      </h1>
      <p class="hero-lead">四个独立平台，统一核验数据、模型、智能体与应用安全。</p>
      <div class="hero-actions">
        <a class="button button-primary" href="#platforms">探索四大平台</a>
        <a class="button button-quiet" href="#method">了解评测流程</a>
      </div>
      <button
        v-if="!reducedMotion"
        class="typing-toggle"
        type="button"
        :aria-pressed="paused"
        @click="toggle"
      >
        {{ paused ? '继续标题' : '暂停标题' }}
      </button>
    </div>
    <SystemPanel />
  </section>
</template>
