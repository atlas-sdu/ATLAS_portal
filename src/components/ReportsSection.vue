<script setup lang="ts">
import { reportRows } from '../data/portal'
import WindowDots from './WindowDots.vue'
</script>

<template>
  <section id="reports" class="section container evidence-section snap-slide" data-snap-section aria-labelledby="reports-title">
    <div class="section-intro">
      <h2 id="reports-title">结论可解释，问题可定位。</h2>
    </div>
    <div class="report-ledger console-table" data-glass>
      <div class="report-ledger-head">
        <WindowDots />
        <span class="visually-hidden">报告结构</span>
      </div>
      <div
        v-for="row in reportRows"
        :key="row.title"
        class="report-row console-row"
        :class="{ 'report-row-gate': row.gate }"
        data-spotlight
      >
        <div><h3>{{ row.title }}</h3><p>{{ row.body }}</p></div>
      </div>
    </div>
  </section>
</template>
