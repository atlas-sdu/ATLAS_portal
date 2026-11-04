<script setup lang="ts">
import { ref } from 'vue'
import HeroSection from './components/HeroSection.vue'
import MethodSection from './components/MethodSection.vue'
import PlatformDialog from './components/PlatformDialog.vue'
import PlatformsSection from './components/PlatformsSection.vue'
import PrinciplesSection from './components/PrinciplesSection.vue'
import ReportsSection from './components/ReportsSection.vue'
import SiteFooter from './components/SiteFooter.vue'
import SiteHeader from './components/SiteHeader.vue'
import WorkspaceSection from './components/WorkspaceSection.vue'
import { usePointerSurfaces } from './composables/usePointerSurfaces'
import { useScrollExperience } from './composables/useScrollExperience'
import { platforms } from './data/portal'

const { headerHidden } = useScrollExperience()
usePointerSurfaces()
const dialog = ref<InstanceType<typeof PlatformDialog> | null>(null)

function openPlatform(index: number) {
  const platform = platforms[index]
  if (platform) dialog.value?.open(platform.detail.title, platform.detail.body)
}
</script>

<template>
  <a class="skip-link" href="#main">跳到主要内容</a>
  <SiteHeader :hidden="headerHidden" />
  <main id="main">
    <HeroSection />
    <PrinciplesSection />
    <PlatformsSection @detail="openPlatform" />
    <MethodSection />
    <ReportsSection />
    <WorkspaceSection />
  </main>
  <SiteFooter />
  <PlatformDialog ref="dialog" />
</template>
