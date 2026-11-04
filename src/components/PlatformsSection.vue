<script setup lang="ts">
import { platforms } from '../data/portal'

const emit = defineEmits<{
  detail: [index: number]
}>()
</script>

<template>
  <section id="platforms" class="section container platforms-section" data-snap-section aria-labelledby="platforms-title">
    <div class="section-heading">
      <div>
        <h2 id="platforms-title">从数据基础，到执行结果。</h2>
        <p>统一评测入口，四个独立能力体系。</p>
      </div>
    </div>
    <div class="platform-index console-table" data-glass>
      <article
        v-for="(platform, index) in platforms"
        :key="platform.id"
        class="platform-row console-row"
        :class="{ 'platform-row-security': platform.id === 'P4' }"
        data-spotlight
      >
        <div class="platform-main">
          <h3><span class="platform-id measured">{{ platform.id }}</span>{{ platform.title }}</h3>
          <p>{{ platform.description }}</p>
        </div>
        <div class="platform-meta">
          <p>{{ platform.metrics }}</p>
          <button class="detail-button" type="button" :data-detail-index="index" @click="emit('detail', index)">查看评测范围</button>
        </div>
      </article>
    </div>
  </section>
</template>
