<script setup lang="ts">
import type { Project } from '@/data/profile'

defineProps<{
  project: Project
}>()
</script>

<template>
  <article class="card">
    <div class="head">
      <h3 class="name">
        <a class="name-link" :href="project.href" target="_blank" rel="noopener">
          {{ project.name }}
        </a>
      </h3>
      <a
        v-if="project.related"
        class="related"
        :href="project.related.href"
        target="_blank"
        rel="noopener"
      >
        + {{ project.related.label }}
      </a>
      <span class="arrow" aria-hidden="true">↗</span>
    </div>
    <p class="desc">{{ project.description }}</p>
    <ul class="tags">
      <li v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</li>
    </ul>
  </article>
</template>

<style scoped>
/*
 * 卡片用两层 clip-path 画出带切角的 1px 描边：
 * 外层背景是描边颜色，::before 往里缩 1px 填充底色
 */
.card {
  position: relative;
  padding: 1.25rem 1.375rem 1.375rem;
  background: var(--line);
  isolation: isolate;
  clip-path: polygon(0 0, calc(100% - var(--cut)) 0, 100% var(--cut), 100% 100%, 0 100%);
  transition: background-color 0.2s var(--ease);
}

.card::before {
  content: '';
  position: absolute;
  inset: 1px;
  z-index: -1;
  background: var(--surface);
  clip-path: polygon(
    0 0,
    calc(100% - var(--cut) + 0.4px) 0,
    100% calc(var(--cut) - 0.4px),
    100% 100%,
    0 100%
  );
  transition: background-color 0.2s var(--ease);
}

.card:hover,
.card:focus-within {
  background: var(--fg);
}

.card:hover::before,
.card:focus-within::before {
  background: var(--surface-hover);
}

.head {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.name {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  letter-spacing: -0.01em;
}

/* 整张卡片可点：把主链接的点击区域撑满卡片 */
.name-link::after {
  content: '';
  position: absolute;
  inset: 0;
}

.name-link:focus-visible {
  outline: none;
}

.related {
  position: relative;
  z-index: 1;
  color: var(--muted);
  font-size: 0.8125rem;
  transition: color 0.15s var(--ease);
}

.related:hover {
  color: var(--fg);
}

.arrow {
  margin-left: auto;
  color: var(--muted);
  font-size: 0.875rem;
  transition:
    transform 0.2s var(--ease),
    color 0.2s var(--ease);
}

.card:hover .arrow {
  color: var(--fg);
  transform: translate(2px, -2px);
}

.desc {
  margin: 0 0 1rem;
  color: var(--text);
  font-size: 0.9375rem;
  line-height: 1.65;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  padding: 0.125rem 0.5rem;
  border: 1px solid var(--line-strong);
  color: var(--muted);
  font-size: 0.75rem;
  line-height: 1.5;
}
</style>
