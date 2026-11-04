<script setup lang="ts">
import { onBeforeUnmount, onMounted, useTemplateRef } from 'vue'
import { ParticleField } from '@/lib/particle-field'

const canvas = useTemplateRef<HTMLCanvasElement>('canvas')

let field: ParticleField | null = null
let reducedMotion: MediaQueryList | null = null

function resize() {
  field?.resize(window.innerWidth, window.innerHeight)
}

function onPointerMove(e: PointerEvent) {
  field?.setPointer(e.clientX, e.clientY)
}

function onPointerEnd(e: PointerEvent) {
  // 触屏松手后不再保留吸引点；鼠标则一直跟随
  if (e.pointerType !== 'mouse') field?.clearPointer()
}

function onPointerLeave() {
  field?.clearPointer()
}

// 系统开启「减少动态效果」时只画静态的一帧
function applyMotionPreference() {
  if (reducedMotion?.matches) field?.stop()
  else field?.start()
}

onMounted(() => {
  if (!canvas.value) return
  try {
    field = new ParticleField(canvas.value)
  } catch {
    return
  }
  resize()

  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  applyMotionPreference()
  reducedMotion.addEventListener('change', applyMotionPreference)

  window.addEventListener('resize', resize)
  window.addEventListener('pointermove', onPointerMove, { passive: true })
  window.addEventListener('pointerdown', onPointerMove, { passive: true })
  window.addEventListener('pointerup', onPointerEnd)
  window.addEventListener('pointercancel', onPointerEnd)
  document.documentElement.addEventListener('pointerleave', onPointerLeave)
  window.addEventListener('blur', onPointerLeave)
})

onBeforeUnmount(() => {
  field?.stop()
  field = null
  reducedMotion?.removeEventListener('change', applyMotionPreference)
  window.removeEventListener('resize', resize)
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerdown', onPointerMove)
  window.removeEventListener('pointerup', onPointerEnd)
  window.removeEventListener('pointercancel', onPointerEnd)
  document.documentElement.removeEventListener('pointerleave', onPointerLeave)
  window.removeEventListener('blur', onPointerLeave)
})
</script>

<template>
  <canvas ref="canvas" class="particles" aria-hidden="true" />
</template>

<style scoped>
.particles {
  position: fixed;
  inset: 0;
  z-index: 0;
  display: block;
  pointer-events: none;
}
</style>
