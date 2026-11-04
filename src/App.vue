<script setup lang="ts">
const year = new Date().getFullYear()

const links = [
  { label: 'GitHub', href: 'https://github.com/jellyfish-p' },
  { label: 'Email', href: 'mailto:jellyfish_p@vip.qq.com' },
]
</script>

<template>
  <div class="page">
    <main class="wrap">
      <header class="head">
        <h1 class="name">jellyfish-p</h1>
        <p class="tagline">写点代码，做点东西。</p>
      </header>

      <section class="block">
        <h2 class="label">关于</h2>
        <p class="text">
          这里是我的个人主页，用来记录项目、笔记和一点随手写下的东西。
          站点用 Vue 3 + Vite 构建，推送到 <code>main</code> 分支后由 GitHub Actions
          自动发布到 GitHub Pages。
        </p>
      </section>

      <section class="block">
        <h2 class="label">链接</h2>
        <ul class="links">
          <li v-for="link in links" :key="link.label">
            <a :href="link.href" target="_blank" rel="noopener">
              <span class="link-label">{{ link.label }}</span>
              <span class="arrow" aria-hidden="true">↗</span>
            </a>
          </li>
        </ul>
      </section>

      <footer class="foot">
        <span>© {{ year }} jellyfish-p</span>
        <span class="dot" aria-hidden="true">·</span>
        <a class="src" href="https://github.com/jellyfish-p/jellyfish-p.github.io">源码</a>
      </footer>
    </main>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 12vh 1.5rem 4rem;
}

.wrap {
  width: 100%;
  max-width: 36rem;
}

.head {
  margin-bottom: 3.5rem;
}

.name {
  margin: 0 0 0.5rem;
  font-size: clamp(2rem, 6vw, 2.75rem);
  font-weight: 600;
  letter-spacing: -0.02em;
}

.tagline {
  margin: 0;
  color: var(--muted);
  font-size: 1.0625rem;
}

.block {
  margin-bottom: 2.75rem;
}

.label {
  margin: 0 0 0.85rem;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
}

.text {
  margin: 0;
  color: #c3c9d4;
}

code {
  padding: 0.1em 0.4em;
  border-radius: 4px;
  background: var(--card);
  border: 1px solid var(--line);
  font-size: 0.875em;
}

.links {
  margin: 0;
  padding: 0;
  list-style: none;
  border-top: 1px solid var(--line);
}

.links li {
  border-bottom: 1px solid var(--line);
}

.links a {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.85rem 0.25rem;
  transition: color 0.15s ease;
}

.links a:hover {
  color: var(--accent);
}

.link-label {
  font-size: 0.95rem;
}

.arrow {
  color: var(--muted);
  font-size: 0.85rem;
}

.links a:hover .arrow {
  color: var(--accent);
}

.foot {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--line);
  color: var(--muted);
  font-size: 0.8125rem;
}

.src:hover {
  color: var(--accent);
}
</style>
