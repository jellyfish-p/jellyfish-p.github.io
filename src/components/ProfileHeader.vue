<script setup lang="ts">
defineProps<{
  name: string
  handle: string
  tagline: string
  avatar: string
}>()
</script>

<template>
  <header class="profile">
    <div class="avatar-frame">
      <img class="avatar" :src="avatar" alt="" width="88" height="88" />
    </div>
    <div class="info">
      <p class="handle">@{{ handle }}</p>
      <h1 class="name">{{ name }}</h1>
      <p class="tagline">{{ tagline }}</p>
    </div>
  </header>
</template>

<style scoped>
.profile {
  display: flex;
  align-items: flex-end;
  gap: 1.5rem;
}

/* 头像外框：直角描边，右上角切掉一角 */
.avatar-frame {
  flex-shrink: 0;
  padding: 4px;
  background: var(--line-strong);
  clip-path: polygon(0 0, calc(100% - var(--cut)) 0, 100% var(--cut), 100% 100%, 0 100%);
}

.avatar {
  display: block;
  width: 88px;
  height: 88px;
  object-fit: cover;
  background: var(--bg);
  filter: grayscale(1) contrast(1.05);
  clip-path: polygon(
    0 0,
    calc(100% - var(--cut) + 3px) 0,
    100% calc(var(--cut) - 3px),
    100% 100%,
    0 100%
  );
}

.info {
  min-width: 0;
}

.handle {
  margin: 0 0 0.25rem;
  color: var(--muted);
  font-size: 0.875rem;
}

.name {
  margin: 0;
  font-size: clamp(2.5rem, 9vw, 4rem);
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 0.95;
}

.tagline {
  margin: 0.75rem 0 0;
  color: var(--text);
  font-size: 1.0625rem;
}

@media (max-width: 480px) {
  .profile {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.25rem;
  }
}
</style>
