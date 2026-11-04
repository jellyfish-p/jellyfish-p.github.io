<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <section class="section">
    <h2 class="title">
      <span class="slash" aria-hidden="true">/</span>
      {{ title }}
    </h2>
    <slot />
  </section>
</template>

<style scoped>
.title {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin: 0 0 1.25rem;
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--fg);
}

.slash {
  color: var(--muted);
  font-weight: 400;
}

/* 标题后面拉一条线到右边缘 */
.title::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--line);
}
</style>
