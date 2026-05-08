# 不搁

不搁是一款面向校园场景的 AI 智能助手 Demo。它尝试解决大学生日常学习中最常见的三个问题：群消息太分散、任务信息难整理、DDL 容易被遗忘。

项目首页提供完整介绍，交互 Demo 展示移动端任务看板、消息识别、任务管理、日程安排、提醒通知和设置等核心界面。

## 在线主页

上传到 GitHub 并启用 GitHub Pages 后，主页链接格式为：

```text
https://<你的 GitHub 用户名>.github.io/<仓库名>/
```

如果仓库名使用 `Buge_demo`，示例链接为：

```text
https://CharlesLiuZC.github.io/Buge_demo/
```

## 核心功能

- 多平台消息聚合：围绕 QQ、微信、飞书等群消息场景，集中呈现课程、社团、实习和项目通知。
- AI 任务识别：从自然语言消息中提取任务名称、截止时间、来源平台和优先级。
- DDL 时间线：按截止时间展示近期任务，帮助用户快速判断轻重缓急。
- 智能日程建议：根据任务密度和优先级给出当日安排建议。
- 提醒通知：展示任务临近、AI 识别、同步状态等通知类型。
- 移动端体验：以手机端任务助手为主要交互形态，适合校园高频使用场景。

## 页面结构

- `/`：项目介绍主页，适合作为 GitHub Pages 展示页。
- `/demo`：可交互移动端 Demo。
- `/intro`：保留原始介绍页，便于对照早期版本。

## 技术栈

- Next.js
- React
- TypeScript
- Tailwind CSS
- Radix UI
- Recharts
- Lucide Icons

## 本地运行

```bash
npm install
npm run dev
```

开发服务器启动后访问：

```text
http://localhost:3000
```

## 本地构建

```bash
npm run build
```

构建产物会输出到 `out/`，可直接用于静态站点托管。

## 上传到 GitHub Pages

1. 在 GitHub 新建仓库，例如 `Buge_demo`。
2. 将本项目目录中的所有文件提交到仓库默认分支。
3. 打开仓库的 `Settings -> Pages`。
4. 在 `Build and deployment` 中选择 `GitHub Actions`。
5. 推送到 `main` 或 `master` 后，工作流会自动构建并部署。
6. 部署完成后，GitHub Actions 的 `deploy` 任务会输出主页链接。

## 项目定位

当前版本是前端展示和交互原型，重点用于产品概念说明、演示评审和页面展示。后续可以继续接入真实机器人、消息解析服务、用户登录、任务同步和提醒推送能力。
