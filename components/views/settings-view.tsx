'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { cn } from '@/lib/utils'
import { 
  User, 
  Bell, 
  Link2, 
  Shield, 
  Sparkles, 
  ChevronRight,
  Server
} from 'lucide-react'

type SettingSection = 'platforms' | 'ai' | 'notifications' | 'about'

export function SettingsView() {
  const [activeSection, setActiveSection] = useState<SettingSection | null>(null)
  
  const [aiSettings, setAiSettings] = useState({
    autoExtractDeadlines: true,
    smartScheduling: true,
    priorityPrediction: true,
  })

  const [notificationSettings, setNotificationSettings] = useState({
    deadlineReminder: true,
    aiSuggestions: true,
    syncNotifications: false,
  })

  if (activeSection === 'platforms') {
    return (
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Header title="平台连接" subtitle="管理社交平台连接" />
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <button onClick={() => setActiveSection(null)} className="text-xs text-primary mb-2">
            ← 返回设置
          </button>

          {/* QQ */}
          <div className="p-4 rounded-xl bg-card border border-border">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-lg">
                  🐧
                </div>
                <div>
                  <h3 className="font-medium text-sm text-foreground">QQ</h3>
                  <p className="text-[10px] text-muted-foreground">通过 QQBot 连接</p>
                </div>
              </div>
              <span className="flex items-center gap-1 text-[10px] text-green-400">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                已连接
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">同步间隔</span>
              <span className="text-foreground">5分钟</span>
            </div>
          </div>

          {/* WeChat */}
          <div className="p-4 rounded-xl bg-card border border-border">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center text-lg">
                  💬
                </div>
                <div>
                  <h3 className="font-medium text-sm text-foreground">微信</h3>
                  <p className="text-[10px] text-muted-foreground">通过 OpenClaw 连接</p>
                </div>
              </div>
              <span className="flex items-center gap-1 text-[10px] text-green-400">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                已连接
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">同步间隔</span>
              <span className="text-foreground">5分钟</span>
            </div>
          </div>

          {/* Feishu */}
          <div className="p-4 rounded-xl bg-card border border-border">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center text-lg">
                  🪶
                </div>
                <div>
                  <h3 className="font-medium text-sm text-foreground">飞书</h3>
                  <p className="text-[10px] text-muted-foreground">通过飞书机器人连接</p>
                </div>
              </div>
              <span className="flex items-center gap-1 text-[10px] text-green-400">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                已连接
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">同步间隔</span>
              <span className="text-foreground">3分钟</span>
            </div>
          </div>

          {/* Server Status */}
          <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
            <div className="flex items-center gap-2 mb-3">
              <Server className="w-4 h-4 text-primary" />
              <h3 className="font-medium text-sm text-foreground">服务器状态</h3>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-muted-foreground">部署位置</span>
                <p className="font-medium text-foreground">腾讯云 - 上海</p>
              </div>
              <div>
                <span className="text-muted-foreground">运行状态</span>
                <p className="font-medium text-green-400">正常 (24/7)</p>
              </div>
              <div>
                <span className="text-muted-foreground">OpenClaw</span>
                <p className="font-medium text-foreground">v2.3.1</p>
              </div>
              <div>
                <span className="text-muted-foreground">上次重启</span>
                <p className="font-medium text-foreground">3天前</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (activeSection === 'ai') {
    return (
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Header title="AI 设置" subtitle="调整AI识别行为" />
        <div className="flex-1 overflow-y-auto p-4">
          <button onClick={() => setActiveSection(null)} className="text-xs text-primary mb-4">
            ← 返回设置
          </button>

          <div className="space-y-4">
            <SettingItem
              title="自动提取DDL"
              description="AI自动识别消息中的截止日期"
              checked={aiSettings.autoExtractDeadlines}
              onChange={(v) => setAiSettings(s => ({ ...s, autoExtractDeadlines: v }))}
            />
            <SettingItem
              title="智能排程"
              description="根据任务优先级自动安排日程"
              checked={aiSettings.smartScheduling}
              onChange={(v) => setAiSettings(s => ({ ...s, smartScheduling: v }))}
            />
            <SettingItem
              title="优先级预测"
              description="AI自动预测任务优先级"
              checked={aiSettings.priorityPrediction}
              onChange={(v) => setAiSettings(s => ({ ...s, priorityPrediction: v }))}
            />
          </div>
        </div>
      </div>
    )
  }

  if (activeSection === 'notifications') {
    return (
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Header title="通知设置" subtitle="自定义提醒方式" />
        <div className="flex-1 overflow-y-auto p-4">
          <button onClick={() => setActiveSection(null)} className="text-xs text-primary mb-4">
            ← 返回设置
          </button>

          <div className="space-y-4">
            <SettingItem
              title="DDL提醒"
              description="任务截止前发送提醒"
              checked={notificationSettings.deadlineReminder}
              onChange={(v) => setNotificationSettings(s => ({ ...s, deadlineReminder: v }))}
            />
            <SettingItem
              title="AI建议通知"
              description="接收AI的日程优化建议"
              checked={notificationSettings.aiSuggestions}
              onChange={(v) => setNotificationSettings(s => ({ ...s, aiSuggestions: v }))}
            />
            <SettingItem
              title="同步通知"
              description="消息同步完成时发送通知"
              checked={notificationSettings.syncNotifications}
              onChange={(v) => setNotificationSettings(s => ({ ...s, syncNotifications: v }))}
            />
          </div>
        </div>
      </div>
    )
  }

  if (activeSection === 'about') {
    return (
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Header title="关于" subtitle="不搁 · AI智能助手" />
        <div className="flex-1 overflow-y-auto p-4">
          <button onClick={() => setActiveSection(null)} className="text-xs text-primary mb-4">
            ← 返回设置
          </button>

          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-lg font-bold text-foreground mb-1">不搁</h2>
            <p className="text-sm text-muted-foreground mb-4">AI智能助手 v1.0.0</p>
            <p className="text-xs text-muted-foreground mb-6">
              腾讯PCG · 校园AI产品创意大赛参赛作品
            </p>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>全天候监测社交平台消息</p>
              <p>AI自动识别任务和DDL</p>
              <p>智能安排日程，再也不搁置任务</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <Header 
        title="设置" 
        subtitle="管理账号和偏好"
      />
      
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {/* Menu Items */}
        <MenuItem
          icon={Link2}
          title="平台连接"
          description="管理QQ、微信、飞书"
          onClick={() => setActiveSection('platforms')}
        />
        <MenuItem
          icon={Sparkles}
          title="AI 设置"
          description="调整AI识别和建议行为"
          onClick={() => setActiveSection('ai')}
        />
        <MenuItem
          icon={Bell}
          title="通知设置"
          description="自定义提醒方式和频率"
          onClick={() => setActiveSection('notifications')}
        />
        <MenuItem
          icon={Shield}
          title="隐私与安全"
          description="管理数据和隐私设置"
          onClick={() => {}}
          disabled
        />
        <MenuItem
          icon={User}
          title="关于"
          description="不搁 · AI智能助手"
          onClick={() => setActiveSection('about')}
        />
      </div>
    </div>
  )
}

interface MenuItemProps {
  icon: React.ElementType
  title: string
  description: string
  onClick: () => void
  disabled?: boolean
}

function MenuItem({ icon: Icon, title, description, onClick, disabled }: MenuItemProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "w-full flex items-center gap-3 p-4 rounded-xl bg-card border border-border text-left transition-all",
        disabled ? "opacity-50" : "hover:border-primary/50 active:scale-[0.98]"
      )}
    >
      <div className="p-2 rounded-lg bg-secondary">
        <Icon className="w-5 h-5 text-muted-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-foreground">{title}</div>
        <div className="text-xs text-muted-foreground">{description}</div>
      </div>
      <ChevronRight className="w-4 h-4 text-muted-foreground" />
    </button>
  )
}

interface SettingItemProps {
  title: string
  description: string
  checked: boolean
  onChange: (checked: boolean) => void
}

function SettingItem({ title, description, checked, onChange }: SettingItemProps) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl bg-card border border-border">
      <div>
        <div className="text-sm font-medium text-foreground">{title}</div>
        <div className="text-xs text-muted-foreground">{description}</div>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={cn(
          "relative w-10 h-6 rounded-full transition-colors",
          checked ? "bg-primary" : "bg-secondary"
        )}
      >
        <span
          className={cn(
            "absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform",
            checked && "translate-x-4"
          )}
        />
      </button>
    </div>
  )
}
