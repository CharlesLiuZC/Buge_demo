'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { cn } from '@/lib/utils'
import { Bell, AlertTriangle, CheckCircle, Info, Trash2, Check, Clock, Sparkles } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { zhCN } from 'date-fns/locale'

type NotificationType = 'deadline' | 'ai' | 'sync' | 'system'

interface Notification {
  id: string
  type: NotificationType
  title: string
  content: string
  timestamp: Date
  read: boolean
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'deadline',
    title: '紧急：任务即将截止',
    content: '「项目中期汇报」将在明天下午3点截止',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    read: false,
  },
  {
    id: '2',
    type: 'ai',
    title: 'AI 识别到新任务',
    content: '从飞书消息中检测到新任务，已自动添加',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
    read: false,
  },
  {
    id: '3',
    type: 'sync',
    title: '消息同步完成',
    content: '已从QQ同步 23 条新消息',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    read: true,
  },
  {
    id: '4',
    type: 'deadline',
    title: '任务提醒',
    content: '「数据结构实验报告」将在3天后截止',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    read: true,
  },
  {
    id: '5',
    type: 'system',
    title: '平台连接成功',
    content: '微信已成功连接，将自动同步群消息',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    read: true,
  },
]

const typeConfig: Record<NotificationType, { icon: React.ElementType; color: string; bgColor: string }> = {
  deadline: { icon: AlertTriangle, color: 'text-red-400', bgColor: 'bg-red-500/10' },
  ai: { icon: Sparkles, color: 'text-primary', bgColor: 'bg-primary/10' },
  sync: { icon: CheckCircle, color: 'text-green-400', bgColor: 'bg-green-500/10' },
  system: { icon: Info, color: 'text-blue-400', bgColor: 'bg-blue-500/10' },
}

const typeFilters: { id: NotificationType | 'all'; label: string }[] = [
  { id: 'all', label: '全部' },
  { id: 'deadline', label: 'DDL' },
  { id: 'ai', label: 'AI' },
  { id: 'sync', label: '同步' },
]

export function NotificationsView() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [selectedType, setSelectedType] = useState<NotificationType | 'all'>('all')

  const filteredNotifications = notifications.filter((notif) => {
    if (selectedType !== 'all' && notif.type !== selectedType) {
      return false
    }
    return true
  })

  const unreadCount = notifications.filter(n => !n.read).length

  const handleMarkRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const handleDelete = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <Header 
        title="提醒中心" 
        subtitle={`${unreadCount} 条未读通知`}
      />
      
      <div className="flex-1 overflow-y-auto">
        {/* Filters */}
        <div className="sticky top-0 z-10 px-4 py-3 bg-background/90 backdrop-blur-sm border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 p-0.5 bg-secondary rounded-lg">
              {typeFilters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedType(filter.id)}
                  className={cn(
                    "px-3 py-1.5 rounded-md text-xs font-medium transition-all",
                    selectedType === filter.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            <button
              onClick={handleMarkAllRead}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs text-muted-foreground hover:bg-secondary transition-colors"
            >
              <Check className="w-3.5 h-3.5" />
              全部已读
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="p-4 space-y-2">
          {filteredNotifications.map((notif) => {
            const config = typeConfig[notif.type]
            const Icon = config.icon

            return (
              <div
                key={notif.id}
                className={cn(
                  "relative p-3 rounded-xl bg-card border border-border",
                  !notif.read && "bg-primary/5 border-primary/30"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className={cn("p-2 rounded-lg shrink-0", config.bgColor)}>
                    <Icon className={cn("w-4 h-4", config.color)} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="font-medium text-sm text-foreground truncate">{notif.title}</h3>
                      {!notif.read && (
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mb-1.5 line-clamp-2">{notif.content}</p>
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{formatDistanceToNow(notif.timestamp, { locale: zhCN, addSuffix: true })}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    {!notif.read && (
                      <button
                        onClick={() => handleMarkRead(notif.id)}
                        className="p-1.5 rounded-lg hover:bg-secondary transition-colors"
                      >
                        <Check className="w-3.5 h-3.5 text-muted-foreground" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(notif.id)}
                      className="p-1.5 rounded-lg hover:bg-destructive/10 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-destructive" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}

          {filteredNotifications.length === 0 && (
            <div className="text-center py-12">
              <Bell className="w-10 h-10 mx-auto mb-3 text-muted-foreground opacity-50" />
              <p className="text-sm text-muted-foreground">暂无通知</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
