'use client'

import { format, isToday, isTomorrow, differenceInDays } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { Clock, AlertTriangle, Flag } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Task, Platform, TaskPriority } from '@/lib/types'

interface DeadlineTimelineProps {
  tasks: Task[]
}

const platformColors: Record<Platform, string> = {
  qq: 'bg-blue-500',
  wechat: 'bg-green-500',
  feishu: 'bg-purple-500',
}

const priorityColors: Record<TaskPriority, string> = {
  high: 'border-red-500',
  medium: 'border-yellow-500',
  low: 'border-blue-500',
}

function getRelativeDay(date: Date): string {
  if (isToday(date)) return '今天'
  if (isTomorrow(date)) return '明天'
  const days = differenceInDays(date, new Date())
  if (days < 7) return `${days}天后`
  return format(date, 'M月d日', { locale: zhCN })
}

export function DeadlineTimeline({ tasks }: DeadlineTimelineProps) {
  const sortedTasks = [...tasks]
    .filter(t => t.status !== 'completed')
    .sort((a, b) => a.deadline.getTime() - b.deadline.getTime())
    .slice(0, 5)

  return (
    <div className="p-4 rounded-xl bg-card border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">即将到期</h3>
        <span className="text-xs text-muted-foreground">
          {sortedTasks.length} 个任务
        </span>
      </div>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-[7px] top-3 bottom-3 w-0.5 bg-border" />

        <div className="space-y-4">
          {sortedTasks.map((task, index) => {
            const isUrgent = isToday(task.deadline) || isTomorrow(task.deadline)
            
            return (
              <div key={task.id} className="relative flex gap-4">
                {/* Timeline Dot */}
                <div 
                  className={cn(
                    "relative z-10 w-4 h-4 rounded-full border-2 shrink-0 mt-1",
                    platformColors[task.source.platform],
                    priorityColors[task.priority]
                  )}
                />

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={cn(
                      "text-xs font-medium px-2 py-0.5 rounded-full",
                      isUrgent 
                        ? "bg-destructive/20 text-destructive" 
                        : "bg-secondary text-secondary-foreground"
                    )}>
                      {getRelativeDay(task.deadline)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {format(task.deadline, 'HH:mm')}
                    </span>
                    {task.priority === 'high' && (
                      <Flag className="w-3 h-3 text-red-400" />
                    )}
                  </div>
                  <h4 className="font-medium text-foreground text-sm truncate">
                    {task.title}
                  </h4>
                  <p className="text-xs text-muted-foreground truncate">
                    来自 {task.source.sender}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {sortedTasks.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">暂无即将到期的任务</p>
        </div>
      )}
    </div>
  )
}
