不搁 Buge - AI 原生校园 DDL 行动管家
本项目为纯前端高保真 Demo，旨在展示“不搁”AI 智能助手在校园任务管理、群消息解析、DDL 提醒和移动端日程统筹中的核心交互流。

🔗 在线主页：https://CharlesLiuZC.github.io/Buge_demo/

📱 交互 Demo：https://CharlesLiuZC.github.io/Buge_demo/demo/

📦 GitHub 仓库：https://github.com/CharlesLiuZC/Buge_demo

产品背景与愿景
在大学校园里，任务并不会只出现在一个地方。课程群、班级群、社团群、实习群、飞书项目群和老师私聊不断产生新的通知，而真正需要执行的事项往往藏在一句自然语言里：

“周五晚 6 点前交实验报告”
“下周三 A301 开会”
“明天下午 3 点准备项目中期汇报”
“论文终稿 5 月 15 日截止”
这些信息分散、格式不统一、时间表达模糊，最终会变成学生的“时间统筹认知负荷”。

“不搁”希望把 AI 的自然语言理解能力和轻量 GTD 任务管理方法结合起来，成为一个能从消息里自动识别任务、整理 DDL、生成提醒和日程建议的校园行动管家。它的目标不是再造一个复杂日历，而是帮学生把“看到通知”到“安排行动”之间的空白补上。

核心业务亮点
1. 全域消息聚合与任务识别
围绕 QQ、微信、飞书等高频校园消息入口，Demo 模拟了多平台群消息同步场景。

自动识别消息中的任务标题、截止时间、来源平台和发送人。
将非结构化群聊通知转化为可管理的任务卡片。
支持课程、社团、实习、项目、论文、缴费等典型校园任务类型。
在消息卡片中展示 AI 提取结果，让用户确认“这条消息为什么被识别为任务”。
2. DDL 看板与轻量任务管理
“不搁”的核心体验是把分散任务收束成一个可扫描的移动端看板。

首页展示总任务、待处理任务、临近截止和消息同步统计。
任务管理页支持按状态和优先级查看任务。
DDL 时间线按截止时间排序，帮助用户快速判断轻重缓急。
任务卡片保留来源平台，方便从任务反查原始消息语境。
3. AI 日程建议与提醒通知
Demo 中内置了 AI 建议与通知流，用来表达未来智能体能力。

根据任务紧急程度生成“今日建议”。
对高优先级任务给出提前准备提示。
在通知页集中展示 DDL 提醒、AI 识别、同步状态和系统通知。
为后续接入真实提醒推送、日历同步和多端通知预留交互空间。
4. 移动端优先的校园助手体验
校园任务往往发生在手机场景中，因此 Demo 采用移动端优先的交互模型。

底部导航覆盖首页、消息、任务、提醒和设置。
单屏信息密度适合碎片时间快速查看。
暗色科技风视觉语言强化 AI 助手与效率工具定位。
GitHub Pages 首页负责产品介绍，/demo 页面负责可交互体验。
Demo 页面结构
/：产品介绍主页，适合作为 GitHub Pages 项目首页。
/demo：高保真移动端交互 Demo。
/intro：早期介绍页，保留用于版本对照。
技术架构与技术栈
本 Demo 聚焦前端状态流转和产品表达，不依赖真实后端服务。

框架：Next.js App Router + React
语言：TypeScript
样式：Tailwind CSS
基础组件：Radix UI / shadcn UI 风格组件
图表：Recharts
图标：Lucide Icons
数据：本地 Mock Data
部署：GitHub Pages + GitHub Actions 静态导出
仓库结构说明
路径	作用
.github/	GitHub Actions 与 Pages 自动部署配置。
app/	Next.js 页面路由、主页、Demo 页和全局样式入口。
components/	产品业务组件和基础 UI 组件。
hooks/	可复用 React Hook。
lib/	模拟数据、类型定义和通用工具函数。
public/	图标、占位图和公开静态资源。
styles/	兼容保留的样式目录。
.gitignore	规定哪些本地生成文件不进入仓库。
components.json	shadcn/ui 组件生成、路径别名和图标库配置。
next-env.d.ts	Next.js 自动生成的 TypeScript 环境声明。
next.config.mjs	Next.js 静态导出与 GitHub Pages 子路径配置。
package.json	项目脚本、依赖、包管理器和仓库元信息。
pnpm-lock.yaml	pnpm 依赖锁文件，保证部署环境安装结果一致。
postcss.config.mjs	Tailwind CSS 的 PostCSS 插件配置。
tsconfig.json	TypeScript 编译选项和 @/* 路径别名配置。
快速本地运行
pnpm install
pnpm run dev
启动后访问：

http://localhost:3000
如果本地没有 pnpm，也可以使用：

npx pnpm@10.33.4 install
npx pnpm@10.33.4 run dev
本地构建
pnpm run build
构建产物会输出到 out/，可直接用于静态站点托管。

GitHub Pages 部署
本仓库已经配置 .github/workflows/pages.yml：

推送到 main 分支。
GitHub Actions 自动安装依赖。
执行 pnpm run build 生成静态站点。
将 out/ 发布到 GitHub Pages。
部署完成后访问：

https://CharlesLiuZC.github.io/Buge_demo/

项目定位
当前版本是前端展示与交互原型，重点用于产品概念说明、演示评审和页面展示。

后续可以继续扩展：

接入真实 QQ / 微信 / 飞书机器人或消息导入能力。
增加真实 AI 解析服务与任务置信度判断。
接入用户登录、云端任务同步和多端提醒。
引入课程表约束，升级为冲突检测与智能排程。
增加任务撤回、暂存、二次编辑和习惯快捷键。
