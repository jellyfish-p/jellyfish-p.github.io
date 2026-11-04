<script setup lang="ts">
import type { ContactLink } from '@/data/profile'

defineProps<{
  links: ContactLink[]
}>()

function isExternal(href: string) {
  return href.startsWith('http')
}
</script>

<template>
  <ul class="contacts">
    <li v-for="link in links" :key="link.label">
      <a
        class="row"
        :href="link.href"
        :target="isExternal(link.href) ? '_blank' : undefined"
        :rel="isExternal(link.href) ? 'noopener' : undefined"
      >
        <span class="label">{{ link.label }}</span>
        <span class="value">{{ link.value }}</span>
        <span class="arrow" aria-hidden="true">→</span>
      </a>
    </li>
  </ul>
</template>

<style scoped>
.contacts {
  border-top: 1px solid var(--line);
}

.contacts li {
  border-bottom: 1px solid var(--line);
}

.row {
  position: relative;
  display: grid;
  grid-template-columns: 5.5rem 1fr auto;
  align-items: center;
  gap: 1rem;
  padding: 0.95rem 0.75rem;
  background: var(--surface);
  transition:
    background-color 0.2s var(--ease),
    color 0.2s var(--ease);
}

/* 悬停时左边出现一条竖线 */
.row::before {
  content: '';
  position: absolute;
  left: 0;
  top: -1px;
  bottom: -1px;
  width: 2px;
  background: var(--fg);
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 0.2s var(--ease);
}

.row:hover,
.row:focus-visible {
  background: var(--surface-hover);
}

.row:hover::before,
.row:focus-visible::before {
  transform: scaleY(1);
}

.label {
  font-size: 0.9375rem;
  font-weight: 600;
}

.value {
  min-width: 0;
  color: var(--text);
  font-size: 0.9375rem;
  overflow-wrap: anywhere;
}

.arrow {
  color: var(--muted);
  transition:
    transform 0.2s var(--ease),
    color 0.2s var(--ease);
}

.row:hover .arrow,
.row:focus-visible .arrow {
  color: var(--fg);
  transform: translateX(3px);
}

@media (max-width: 480px) {
  .row {
    grid-template-columns: 1fr auto;
    gap: 0.15rem 1rem;
  }

  .label {
    grid-column: 1;
  }

  .value {
    grid-column: 1;
    grid-row: 2;
    font-size: 0.875rem;
  }

  .arrow {
    grid-column: 2;
    grid-row: 1 / 3;
  }
}
</style>
