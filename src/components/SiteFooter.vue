<script setup lang="ts">
defineProps<{
  name: string
  source: string
}>()

const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <span>© {{ year }} {{ name }}</span>
    <a class="source" :href="source" target="_blank" rel="noopener">源码 ↗</a>
  </footer>
</template>

<style scoped>
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--line);
  color: var(--muted);
  font-size: 0.8125rem;
}

.source {
  transition: color 0.15s var(--ease);
}

.source:hover {
  color: var(--fg);
}
</style>
