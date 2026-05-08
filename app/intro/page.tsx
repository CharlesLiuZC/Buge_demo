'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Sparkles, 
  MessageSquare, 
  Calendar, 
  Bell, 
  Zap, 
  Shield, 
  Clock,
  ArrowRight,
  CheckCircle,
  Play,
  Github,
  ExternalLink
} from 'lucide-react'
import { cn } from '@/lib/utils'

const features = [
  {
    icon: MessageSquare,
    title: '多平台消息监测',
    description: '24小时自动监测QQ、微信、飞书等社交平台的群消息，不错过任何重要信息',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
  },
  {
    icon: Sparkles,
    title: 'AI智能识别',
    description: '基于大语言模型自动识别消息中的任务和DDL，准确率高达95%+',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    icon: Calendar,
    title: '智能日程安排',
    description: 'AI根据任务优先级和你的习惯，自动生成最优日程安排建议',
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
  },
  {
    icon: Bell,
    title: '智能提醒',
    description: '多渠道提醒，支持自定义提前时间，确保你不会错过任何DDL',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10',
  },
  {
    icon: Zap,
    title: '实时同步',
    description: '部署在腾讯云服务器，7x24小时稳定运行，消息实时同步',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
  },
  {
    icon: Shield,
    title: '隐私安全',
    description: '所有数据加密存储，消息仅用于任务识别，绝不泄露隐私',
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
  },
]

const techStack = [
  { name: 'OpenClaw', desc: '微信机器人框架' },
  { name: 'QQBot', desc: 'QQ官方机器人API' },
  { name: '飞书机器人', desc: '飞书开放平台' },
  { name: '腾讯云', desc: '服务器部署' },
  { name: 'GPT-4', desc: 'AI任务识别' },
  { name: 'Next.js', desc: '前端框架' },
]

const painPoints = [
  '群消息太多，重要信息容易被淹没',
  '同时使用多个平台，任务分散难以管理',
  'DDL临近才想起来，经常手忙脚乱',
  '日程安排混乱，时间规划困难',
]

export default function IntroPage() {
  const [showDemo, setShowDemo] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl opacity-30" />
        
        <div className="relative max-w-6xl mx-auto px-6 py-20">
          {/* Badge */}
          <div className="flex justify-center mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              腾讯PCG · 校园AI产品创意大赛
            </span>
          </div>

          {/* Title */}
          <h1 className="text-center text-5xl md:text-7xl font-bold mb-6">
            <span className="text-foreground">不搁</span>
            <span className="text-primary"> · </span>
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              AI智能助手
            </span>
          </h1>

          <p className="text-center text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto text-balance">
            再也不搁你的DDL！
            <br />
            <span className="text-foreground">全天候监测社交平台消息，AI自动识别任务，智能安排日程</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg hover:bg-primary/90 transition-all hover:scale-105"
            >
              体验Demo
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setShowDemo(true)}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-secondary text-foreground font-semibold text-lg hover:bg-secondary/80 transition-all"
            >
              <Play className="w-5 h-5" />
              观看演示
            </button>
          </div>

          {/* Preview Image */}
          <div className="relative rounded-2xl overflow-hidden border border-border shadow-2xl bg-card">
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10 pointer-events-none" />
            <div className="p-4 border-b border-border flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-4 text-sm text-muted-foreground">不搁 - AI智能助手</span>
            </div>
            <div className="aspect-video bg-gradient-to-br from-card to-secondary flex items-center justify-center">
              <div className="text-center">
                <Sparkles className="w-16 h-16 text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">Dashboard 预览</p>
                <Link href="/" className="inline-flex items-center gap-2 mt-4 text-primary hover:underline">
                  进入体验 <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-20 bg-card/50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4 text-foreground">
            你是否也有这些烦恼？
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            作为大学生，我们每天面对各种群消息和任务，经常会遇到这些问题...
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {painPoints.map((point, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/20"
              >
                <Clock className="w-5 h-5 text-destructive shrink-0" />
                <span className="text-foreground">{point}</span>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <span className="inline-flex items-center gap-2 text-primary text-lg font-medium">
              <Sparkles className="w-5 h-5" />
              不搁，让这些问题成为历史
            </span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4 text-foreground">
            核心功能
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            基于AI的全方位校园任务管理解决方案
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.title}
                  className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300"
                >
                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4", feature.bgColor)}>
                    <Icon className={cn("w-6 h-6", feature.color)} />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-card/50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4 text-foreground">
            工作原理
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            简单三步，让AI帮你管理所有任务
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">连接平台</h3>
              <p className="text-sm text-muted-foreground">
                通过QQBot、OpenClaw、飞书机器人连接你的社交平台
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">AI识别</h3>
              <p className="text-sm text-muted-foreground">
                AI自动监测群消息，智能识别任务和DDL
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">智能提醒</h3>
              <p className="text-sm text-muted-foreground">
                自动安排日程，按时提醒，再也不搁DDL
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4 text-foreground">
            技术架构
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            部署在腾讯云服务器，7x24小时稳定运行
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className="p-4 rounded-xl bg-card border border-border text-center"
              >
                <div className="font-semibold text-foreground mb-1">{tech.name}</div>
                <div className="text-xs text-muted-foreground">{tech.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-card to-accent/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4 text-foreground">
            准备好告别鸽子了吗？
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            立即体验不搁AI智能助手，让任务管理变得轻松简单
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg hover:bg-primary/90 transition-all hover:scale-105"
            >
              立即体验
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="https://github.com/Johnny-Zz/Buge_demo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-secondary text-foreground font-semibold text-lg hover:bg-secondary/80 transition-all"
            >
              <Github className="w-5 h-5" />
              GitHub
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="font-semibold text-foreground">不搁 · AI智能助手</span>
          </div>
          <p className="text-sm text-muted-foreground">
            腾讯PCG · 校园AI产品创意大赛参赛作品
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            © 2026 不搁团队 · All Rights Reserved
          </p>
        </div>
      </footer>

      {/* Demo Modal */}
      {showDemo && (
        <div 
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowDemo(false)}
        >
          <div 
            className="w-full max-w-4xl rounded-2xl bg-card border border-border overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-border flex items-center justify-between">
              <span className="font-semibold text-foreground">产品演示视频</span>
              <button 
                onClick={() => setShowDemo(false)}
                className="p-2 rounded-lg hover:bg-secondary transition-colors"
              >
                ×
              </button>
            </div>
            <div className="aspect-video bg-secondary flex items-center justify-center">
              <div className="text-center">
                <Play className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">演示视频将在这里播放</p>
                <p className="text-xs text-muted-foreground mt-2">（可上传录屏视频）</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
