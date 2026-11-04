<script setup lang="ts">
import { WORKBENCH_URL } from '../data/portal'
</script>

<template>
  <section class="workspace-section section-band snap-slide" data-snap-section aria-labelledby="workspace-title">
    <div class="container workspace-cta">
      <div>
        <h2 id="workspace-title">一个入口，<br>进入你的评测任务。</h2>
        <p>数据、模型、智能体与安全评测工作台，将在完成服务部署后接入。</p>
      </div>
      <a class="workspace-link" :href="WORKBENCH_URL" data-spotlight>前往评测工作台</a>
    </div>
  </section>
</template>
