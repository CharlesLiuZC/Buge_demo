'use client'

import { format, formatDistanceToNow } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { Calendar, ChevronRight, Eye, EyeOff, Sparkles, Users } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Message, Platform, TaskPriority } from '@/lib/types'

interface MessageCardProps {
  message: Message
  onMarkRead?: (id: string) => void
  onCreateTask?: (message: Message) => void
}

const platformConfig: Record<Platform, { name: string; color: string; bgColor: string; borderColor: string }> = {
  qq: {
    name: 'QQ',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-l-blue-500',
  },
  wechat: {
    name: '微信',
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-l-green-500',
  },
  feishu: {
    name: '飞书',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-l-purple-500',
  },
}

const priorityConfig: Record<TaskPriority, { label: string; className: string }> = {
  high: { label: 'P0 高优先级', className: 'bg-red-500/15 text-red-300 border-red-500/30' },
  medium: { label: 'P1 中优先级', className: 'bg-yellow-500/15 text-yellow-200 border-yellow-500/30' },
  low: { label: 'P2 低优先级', className: 'bg-blue-500/15 text-blue-200 border-blue-500/30' },
}

export function MessageCard({ message, onMarkRead, onCreateTask }: MessageCardProps) {
  const platform = platformConfig[message.platform]

  return (
    <div
      className={cn(
        "group relative p-4 rounded-xl bg-card border border-border border-l-4",
        platform.borderColor,
        "hover:border-primary/50 transition-all duration-300",
        !message.isRead && "bg-card/80"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", platform.bgColor, platform.color)}>
              {platform.name}
            </span>
            {message.groupName && (
              <span className="text-xs text-muted-foreground flex items-center gap-1 min-w-0">
                <Users className="w-3 h-3 shrink-0" />
                <span className="truncate">{message.groupName}</span>
              </span>
            )}
            {!message.isRead && <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />}
          </div>

          <div className="flex items-center gap-2 mb-2">
            <span className="font-medium text-foreground">{message.sender}</span>
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(message.timestamp, { locale: zhCN, addSuffix: true })}
            </span>
          </div>

          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{message.content}</p>

          {message.hasDeadline && message.extractedTask && (
            <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
              <div className="flex items-center gap-2 text-primary text-sm font-medium mb-1">
                <Sparkles className="w-4 h-4" />
                <span>AI 识别到任务</span>
              </div>
              <p className="text-sm text-foreground mb-2">{message.extractedTask}</p>
              {message.extractedPriority && (
                <span className={cn("inline-flex mb-2 rounded-md border px-2 py-0.5 text-[10px] font-medium", priorityConfig[message.extractedPriority].className)}>
                  {priorityConfig[message.extractedPriority].label}
                </span>
              )}
              {message.extractedDeadline && (
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>截止时间：{format(message.extractedDeadline, 'M月d日 HH:mm', { locale: zhCN })}</span>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 shrink-0">
          <button
            onClick={() => onMarkRead?.(message.id)}
            className="p-2 rounded-lg hover:bg-secondary transition-colors"
            title={message.isRead ? "标记未读" : "标记已读"}
          >
            {message.isRead ? (
              <Eye className="w-4 h-4 text-muted-foreground" />
            ) : (
              <EyeOff className="w-4 h-4 text-muted-foreground" />
            )}
          </button>
          {message.hasDeadline && (
            <button
              onClick={() => onCreateTask?.(message)}
              className="p-2 rounded-lg bg-primary/20 hover:bg-primary/30 transition-colors text-primary"
              title="编辑 AI 识别任务"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

interface MessageListProps {
  messages: Message[]
  onMarkRead?: (id: string) => void
  onCreateTask?: (message: Message) => void
}

export function MessageList({ messages, onMarkRead, onCreateTask }: MessageListProps) {
  const sortedMessages = [...messages].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())

  return (
    <div className="space-y-3">
      {sortedMessages.map((message) => (
        <MessageCard
          key={message.id}
          message={message}
          onMarkRead={onMarkRead}
          onCreateTask={onCreateTask}
        />
      ))}
    </div>
  )
}
