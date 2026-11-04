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
  main.ts                      # 应用入口
  App.vue                      # 根组件
  components/                  # 组件
  assets/                      # 样式与图片
index.html                     # HTML 模板
vite.config.ts                 # Vite 配置（含 base 与 @ 别名）
```

## 推荐 IDE 配置

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar)（并关闭 Vetur）。
