/** 页面上的全部内容。改文案、加项目、加联系方式只需要改这个文件 */

export interface Project {
  name: string
  description: string
  tags: string[]
  href: string
  /** 关联仓库，显示在卡片右上角 */
  related?: { label: string; href: string }
}

export interface ContactLink {
  label: string
  value: string
  href: string
}

export const profile = {
  name: 'jellyfish',
  handle: 'jellyfish-p',
  tagline: '写 Go 后端和 AI 开发工具。',
  avatar: 'https://avatars.githubusercontent.com/jellyfish-p?s=192',
  source: 'https://github.com/jellyfish-p/jellyfish-p.github.io',
}

export const projects: Project[] = [
  {
    name: 'Ephyra',
    description:
      '开源在线评测系统。Go 模块化单体后端，PostgreSQL 记录提交与评测，独立判题节点通过自定义 gRPC 协议接入，在 go-sandbox 中编译运行。',
    tags: ['Go', 'gRPC', 'PostgreSQL'],
    href: 'https://github.com/jellyfish-p/ephyra',
    related: { label: 'judge', href: 'https://github.com/jellyfish-p/ephyra-judge' },
  },
  {
    name: 'pi-claude-code',
    description:
      '抓取 Claude Code 实际发给模型的系统提示词和工具定义，用来提升 Claude 在 pi 等 agent harness 里的兼容性。',
    tags: ['TypeScript', 'AI Agent'],
    href: 'https://github.com/jellyfish-p/pi-claude-code',
  },
]

export const contacts: ContactLink[] = [
  { label: 'GitHub', value: '@jellyfish-p', href: 'https://github.com/jellyfish-p' },
  { label: 'Email', value: 'jellyfish_p@vip.qq.com', href: 'mailto:jellyfish_p@vip.qq.com' },
]
