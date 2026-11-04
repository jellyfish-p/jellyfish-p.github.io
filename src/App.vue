<script setup lang="ts">
const year = new Date().getFullYear()

const projects = [
  {
    name: 'Ephyra',
    desc: '开源在线评测系统。Go 模块化单体后端，PostgreSQL 记录提交与评测，独立判题节点通过自定义 gRPC 协议接入，在 go-sandbox 中编译运行。',
    tags: ['Go', 'gRPC', 'PostgreSQL'],
    href: 'https://github.com/jellyfish-p/ephyra',
    extra: { label: 'judge', href: 'https://github.com/jellyfish-p/ephyra-judge' },
  },
  {
    name: 'pi-claude-code',
    desc: '抓取 Claude Code 实际发给模型的系统提示词和工具定义，用来提升 Claude 在 pi 等 agent harness 里的兼容性。',
    tags: ['TypeScript', 'AI Agent'],
    href: 'https://github.com/jellyfish-p/pi-claude-code',
  },
]

const links = [
  { label: 'GitHub', value: '@jellyfish-p', href: 'https://github.com/jellyfish-p' },
  { label: 'Email', value: 'jellyfish_p@vip.qq.com', href: 'mailto:jellyfish_p@vip.qq.com' },
]
</script>

<template>
  <div class="page">
    <main class="wrap">
      <header class="head">
        <img
          class="avatar"
          src="https://avatars.githubusercontent.com/jellyfish-p?s=160"
          alt=""
          width="64"
          height="64"
        />
        <div>
          <h1 class="name">jellyfish</h1>
          <p class="tagline">写 Go 后端和 AI 开发工具。</p>
        </div>
      </header>

      <section class="block">
        <h2 class="label">项目</h2>
        <ul class="projects">
          <li v-for="p in projects" :key="p.name" class="project">
            <div class="project-head">
              <a class="project-name" :href="p.href" target="_blank" rel="noopener">
                {{ p.name }} <span class="arrow" aria-hidden="true">↗</span>
              </a>
              <a
                v-if="p.extra"
                class="project-extra"
                :href="p.extra.href"
                target="_blank"
                rel="noopener"
              >
                + {{ p.extra.label }}
              </a>
            </div>
            <p class="project-desc">{{ p.desc }}</p>
            <ul class="tags">
              <li v-for="t in p.tags" :key="t">{{ t }}</li>
            </ul>
          </li>
        </ul>
      </section>

      <section class="block">
        <h2 class="label">联系</h2>
        <ul class="links">
          <li v-for="link in links" :key="link.label">
            <a :href="link.href" target="_blank" rel="noopener">
              <span class="link-label">{{ link.label }}</span>
              <span class="link-value">{{ link.value }}</span>
            </a>
          </li>
        </ul>
      </section>

      <footer class="foot">
        <span>© {{ year }} jellyfish</span>
        <span aria-hidden="true">·</span>
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
  display: flex;
  align-items: center;
  gap: 1.1rem;
  margin-bottom: 3.5rem;
}

.avatar {
  flex-shrink: 0;
  border-radius: 50%;
  border: 1px solid var(--line);
  background: var(--card);
}

.name {
  margin: 0 0 0.2rem;
  font-size: clamp(1.75rem, 5vw, 2.25rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.2;
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

.projects {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 0.75rem;
}

.project {
  padding: 1rem 1.1rem;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: var(--card);
}

.project-head {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  margin-bottom: 0.35rem;
}

.project-name {
  font-weight: 600;
  transition: color 0.15s ease;
}

.project-name:hover,
.project-extra:hover,
.links a:hover,
.src:hover {
  color: var(--accent);
}

.arrow {
  color: var(--muted);
  font-size: 0.8rem;
  font-weight: 400;
}

.project-extra {
  color: var(--muted);
  font-size: 0.8125rem;
  transition: color 0.15s ease;
}

.project-desc {
  margin: 0 0 0.7rem;
  color: #c3c9d4;
  font-size: 0.925rem;
}

.tags {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.tags li {
  padding: 0.1rem 0.5rem;
  border: 1px solid var(--line);
  border-radius: 999px;
  color: var(--muted);
  font-size: 0.75rem;
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

.link-label {
  font-size: 0.95rem;
}

.link-value {
  color: var(--muted);
  font-size: 0.875rem;
  overflow-wrap: anywhere;
  text-align: right;
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
</style>
