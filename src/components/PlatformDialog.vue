<script setup lang="ts">
import { ref } from 'vue'

const dialog = ref<HTMLDialogElement>()
const title = ref('')
const body = ref('')

function open(nextTitle: string, nextBody: string) {
  title.value = nextTitle
  body.value = nextBody
  dialog.value?.showModal()
}

function close() {
  dialog.value?.close()
}

function onBackdrop(event: MouseEvent) {
  if (event.target === dialog.value) close()
}

defineExpose({ open, close })
</script>

<template>
  <dialog
    ref="dialog"
    id="detail-dialog"
    class="detail-dialog"
    data-glass
    aria-labelledby="dialog-title"
    aria-describedby="dialog-body"
    @click="onBackdrop"
  >
    <form method="dialog" class="dialog-shell">
      <div class="dialog-head">
        <span class="measured">平台说明</span>
        <button class="dialog-close" type="submit" aria-label="关闭">关闭</button>
      </div>
      <h2 id="dialog-title">{{ title }}</h2>
      <p id="dialog-body">{{ body }}</p>
      <button class="button button-quiet dialog-dismiss" type="submit">返回页面</button>
    </form>
  </dialog>
</template>
