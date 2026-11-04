# jellyfish-p.github.io

个人主页，基于 **Vue 3 + Vite + TypeScript**，通过 GitHub Actions 自动构建并部署到 GitHub Pages。

- 站点地址：https://jellyfish-p.github.io/
- 部署方式：推送 `main` 分支 → Actions 构建 `dist/` → 发布到 Pages（GitHub Actions 源）

## 本地开发

```sh
npm install
npm run dev        # 本地开发服务器 http://localhost:5173/
```

## 构建与预览

```sh
npm run build      # 类型检查 + 构建到 dist/
npm run preview    # 本地预览构建产物
```

## 部署

`.github/workflows/deploy.yml` 会在每次推送到 `main` 时自动运行：

1. `npm ci` 安装依赖
2. `npm run build` 生成 `dist/`
3. 通过官方 Pages Actions 上传并发布

也可以在 GitHub 仓库的 **Actions → Deploy to GitHub Pages → Run workflow** 手动触发。

> 首次使用需要在仓库 **Settings → Pages → Build and deployment → Source** 中选择 **GitHub Actions**。

## 关于路径（base）

本仓库是用户站点仓库（`<user>.github.io`），站点部署在根路径，因此 `vite.config.ts` 中 `base` 为 `/`。
如果以后改为项目站点（`<user>.github.io/<repo>/`），需要把 `base` 改成 `/<repo>/`，否则静态资源会 404。

## 目录结构

```
.github/workflows/deploy.yml   # CI：构建并部署到 Pages
public/                        # 原样拷贝的静态资源（favicon 等）
src/
  data/profile.ts              # 页面全部内容：名字、简介、项目、联系方式
  lib/particle-field.ts        # 粒子背景引擎（Canvas 2D，无依赖）
  components/
    ParticleBackground.vue     # 粒子背景：挂载画布、转发鼠标事件、减少动态效果时停止
    ProfileHeader.vue          # 头像、名字、一句话介绍
    SectionBlock.vue           # 分区标题
    ProjectCard.vue            # 切角项目卡片
    ContactList.vue            # 联系方式列表
    SiteFooter.vue             # 页脚
  App.vue                      # 页面组装
  assets/base.css              # 重置 + 黑白灰主题变量
  assets/main.css              # 全局样式入口
index.html                     # HTML 模板
vite.config.ts                 # Vite 配置（含 base 与 @ 别名）
```

改内容只需要改 `src/data/profile.ts`；粒子数量、连线距离、吸引半径等参数在 `src/lib/particle-field.ts` 顶部的 `DEFAULTS` 里。

## 推荐 IDE 配置

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar)（并关闭 Vetur）。
