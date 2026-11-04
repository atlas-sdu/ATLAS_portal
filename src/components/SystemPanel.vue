<script setup lang="ts">
import { ref } from 'vue'
import WindowDots from './WindowDots.vue'

const drawerOpen = ref(true)
const previewPlatforms = [
  { id: 'P1', title: '数据集质量', subtitle: '数据基础', security: false },
  { id: 'P2', title: '模型可靠性', subtitle: '结论与证据', security: false },
  { id: 'P3', title: '智能体测试', subtitle: '任务执行', security: false },
  { id: 'P4', title: 'AI 应用安全', subtitle: '横切数据、模型、执行与交接', security: true },
]
</script>

<template>
  <aside class="system-panel" data-glass aria-label="ATLAS 平台协同架构">
    <div class="panel-head">
      <WindowDots />
    </div>
    <div class="entry-node" data-glass>
      <div>
        <strong>统一门户与评测工作台</strong>
        <span>按对象独立接入，按场景组合评测</span>
      </div>
    </div>
    <div
      id="platform-drawer"
      class="platform-drawer"
      :data-open="String(drawerOpen)"
      :aria-hidden="!drawerOpen"
      :inert="!drawerOpen"
    >
      <div class="platform-drawer-inner">
        <div class="platform-stack" data-glass>
          <div
            v-for="platform in previewPlatforms"
            :key="platform.id"
            class="platform-line"
            :class="{ 'platform-line-security': platform.security }"
          >
            <span class="measured line-code">{{ platform.id }}</span>
            <div>
              <strong>{{ platform.title }}</strong>
              <span :class="platform.security ? undefined : 'line-detail'">{{ platform.subtitle }}</span>
            </div>
            <span v-if="platform.security" class="measured gate-code">G_safe</span>
          </div>
        </div>
      </div>
    </div>
    <div class="drawer-control">
      <button
        class="drawer-toggle"
        type="button"
        :aria-expanded="drawerOpen"
        aria-controls="platform-drawer"
        @click="drawerOpen = !drawerOpen"
      >
        <span class="visually-hidden">{{ drawerOpen ? '收起平台列表' : '展开平台列表' }}</span>
      </button>
    </div>
    <p class="panel-note">四个平台独立出具结论；全栈评测时串链执行，安全判定绑定对象、版本与任务范围。</p>
  </aside>
</template>
