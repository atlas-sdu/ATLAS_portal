<script setup lang="ts">
import { principles } from '../data/portal'
</script>

<template>
  <section class="principles-section section container snap-slide" data-snap-section aria-labelledby="principles-title">
    <div class="section-intro">
      <h2 id="principles-title">评测从范围开始。</h2>
      <p>四个平台按对象独立接入，也可以按场景组合评测。</p>
    </div>
    <div class="principle-list">
      <article v-for="principle in principles" :key="principle.title" class="principle-row">
        <div>
          <h3>{{ principle.title }}</h3>
          <p>{{ principle.body }}</p>
        </div>
      </article>
    </div>
  </section>
</template>
