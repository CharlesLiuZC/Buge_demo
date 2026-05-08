'use client'

import { CheckCircle2, Clock, CalendarDays, MessageSquare } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Statistics } from '@/lib/types'

interface StatsCardsProps {
  stats: Statistics
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: '总任务',
      value: stats.totalTasks,
      icon: CalendarDays,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: '即将截止',
      value: stats.upcomingDeadlines,
      icon: Clock,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
    },
    {
      title: '已完成',
      value: stats.completedTasks,
      icon: CheckCircle2,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
    },
    {
      title: '消息数',
      value: stats.messagesSynced,
      icon: MessageSquare,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
    },
  ]

  return (
    <div className="grid grid-cols-4 gap-2">
      {cards.map((card) => {
        const Icon = card.icon
        return (
          <div
            key={card.title}
            className="p-3 rounded-xl bg-card border border-border"
          >
            <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center mb-2", card.bgColor)}>
              <Icon className={cn("w-4 h-4", card.color)} />
            </div>
            <div className="text-lg font-bold text-foreground">
              {card.value}
            </div>
            <div className="text-[10px] text-muted-foreground">
              {card.title}
            </div>
          </div>
        )
      })}
    </div>
  )
}
