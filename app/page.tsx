'use client'

import Link from 'next/link'
import {
  ArrowRight,
  Bell,
  Calendar,
  CheckCircle2,
  Github,
  MessageSquare,
  Shield,
  Sparkles,
  Zap,
} from 'lucide-react'

const features = [
  {
    icon: MessageSquare,
    title: '多平台消息聚合',
    description: '面向 QQ、微信、飞书等高频社交与协作场景，集中监测群通知、课程消息和项目沟通。',
  },
  {
    icon: Sparkles,
    title: 'AI 任务识别',
    description: '从自然语言消息中自动抽取任务、DDL、地点、来源和优先级，减少手动整理成本。',
  },
  {
    icon: Calendar,
    title: '智能日程安排',
    description: '根据截止时间、任务紧急度和用户习惯生成安排建议，让当天要做什么一目了然。',
  },
  {
    icon: Bell,
    title: '主动提醒',
    description: '在任务临近截止前触发提醒，并支持按不同任务类型设置提醒节奏。',
  },
  {
    icon: Shield,
    title: '隐私优先',
    description: '仅围绕任务识别处理必要消息，可扩展为本地脱敏、加密存储和最小权限接入。',
  },
  {
    icon: Zap,
    title: '可部署 Demo',
    description: '当前版本为前端交互原型，可通过 GitHub Pages 静态部署，便于展示和评审。',
  },
]

const workflow = [
  '连接消息平台或导入示例消息',
  'AI 识别任务、DDL 和来源上下文',
  '生成任务列表、提醒时间线与日程建议',
]

const techStack = ['Next.js', 'TypeScript', 'Tailwind CSS', 'Radix UI', 'Recharts', 'Lucide Icons']

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(51,214,204,0.16),transparent_42%),linear-gradient(135deg,rgba(56,189,248,0.08),transparent_45%)]" />
        <div className="relative mx-auto grid min-h-[92vh] max-w-6xl content-center gap-12 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              腾讯 PCG 校园 AI 产品创意 Demo
            </div>
            <h1 className="max-w-3xl text-5xl font-bold tracking-normal md:text-7xl">
              不搁
            </h1>
            <p className="mt-5 max-w-2xl text-xl leading-8 text-muted-foreground md:text-2xl">
              一个面向校园场景的 AI 智能助手，自动从群消息里识别任务和 DDL，帮助学生把分散通知变成清晰日程。
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                体验交互 Demo
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="https://github.com/Johnny-Zz/Buge_demo"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-secondary"
              >
                <Github className="h-4 w-4" />
                查看源码
              </a>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-4 shadow-2xl">
            <div className="mb-4 flex items-center justify-between border-b border-border pb-3">
              <div>
                <p className="text-sm font-semibold">今日任务概览</p>
                <p className="text-xs text-muted-foreground">AI 已识别 7 个待处理事项</p>
              </div>
              <span className="rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">Live Demo</span>
            </div>
            <div className="space-y-3">
              {[
                ['高', '项目中期汇报', '明天 15:00'],
                ['高', '数据结构实验报告三', '5 月 9 日 18:00'],
                ['中', '编程社团会议', '5 月 13 日 19:00'],
              ].map(([level, title, time]) => (
                <div key={title} className="flex items-center gap-3 rounded-md border border-border bg-background/70 p-3">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{title}</p>
                    <p className="text-xs text-muted-foreground">{time}</p>
                  </div>
                  <span className="rounded bg-secondary px-2 py-1 text-xs">{level}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-8 max-w-2xl">
          <h2 className="text-3xl font-bold">项目亮点</h2>
          <p className="mt-3 text-muted-foreground">
            不搁聚焦“消息太散、DDL 太多、任务容易忘”的真实校园痛点，把通知处理、任务抽取和日程管理收束到一个轻量移动端体验里。
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <article key={feature.title} className="rounded-lg border border-border bg-card p-5">
                <Icon className="mb-4 h-6 w-6 text-primary" />
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{feature.description}</p>
              </article>
            )
          })}
        </div>
      </section>

      <section className="border-y border-border bg-card/40">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold">工作流程</h2>
            <div className="mt-6 space-y-4">
              {workflow.map((item, index) => (
                <div key={item} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary text-sm font-bold text-primary-foreground">
                    {index + 1}
                  </span>
                  <p className="pt-1 text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold">技术栈</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {techStack.map((item) => (
                <span key={item} className="rounded-md border border-border bg-background px-3 py-2 text-sm">
                  {item}
                </span>
              ))}
            </div>
            <p className="mt-6 text-sm leading-6 text-muted-foreground">
              仓库已配置静态导出与 GitHub Pages 工作流。上传到 GitHub 后开启 Pages，即可得到可公开访问的项目主页。
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
