<script setup lang="ts">
import { protocolSteps } from '../data/portal'
</script>

<template>
  <section id="method" class="section section-band snap-slide" data-snap-section aria-labelledby="method-title">
    <div class="container split-section">
      <div class="section-intro">
        <h2 id="method-title">先约定判据，<br>再验证实际效果。</h2>
        <p>同一套方法适配不同工业场景。只提交单类对象时执行适用环节，报告明确未覆盖范围；全栈中试时核验跨平台交接与安全门控。</p>
      </div>
      <ol class="protocol-trail">
        <li v-for="step in protocolSteps" :key="step.marker">
          <span class="measured">{{ step.marker }}</span>
          <div><h3>{{ step.title }}</h3><p>{{ step.body }}</p></div>
        </li>
      </ol>
    </div>
  </section>
</template>
