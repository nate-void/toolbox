
# 🛠️ Toolbox Suite

[![Version](https://img.shields.io/badge/version-0.1.0-indigo.svg)](#)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC.svg)](https://tailwindcss.com/)

一个现代化的前端工具集合平台，采用 React + TypeScript + Tailwind CSS 构建，旨在提供流畅的用户体验和强大的验证机制。

## ✨ 特性

- 🌓 **深色模式支持**：基于系统偏好或手动切换，完美适配不同光线环境。
- 🌍 **国际化 (i18n)**：完整支持中英文切换。
- 🧩 **九宫格验证码**：内置 3x3 图像识别验证挑战，有效防止自动化脚本。
- 📊 **实时统计**：自动计算验证通过率，提供可视化的挑战记录。
- 📱 **响应式设计**：完美适配从移动端到桌面端的各种屏幕尺寸。
- ⚙️ **集中化配置**：通过 `appConfig.ts` 轻松管理应用名称、版本和元数据。

## 🚀 快速开始

```bash
git clone https://github.com/nate-void/toolbox.git
cd toolbox
pnpm i
pnpm run
```

### 技术栈
- **React 19** - UI 渲染
- **Tailwind CSS** - 样式管理
- **Framer Motion** - 丝滑的交互动画
- **Lucide React** - 优雅的图标库



## 📁 项目结构

```text
src/
├── components/      # 通用 UI 组件 (Sidebar, ThemeToggle, CaptchaModal 等)
├── config/          # 应用配置文件
├── contexts/        # 状态管理 (语言、主题等)
├── i18n/            # 国际化翻译文件
├── pages/           # 页面级组件 (Home, CaptchaTool)
├── constants/       # 静态数据与常量
└── types/           # TypeScript 类型定义
```

## 📝 许可证

本项目采用 [MIT](https://opensource.org/licenses/MIT) 许可证。
