'use client'

import { format, formatDistanceToNow, isPast, isToday, isTomorrow } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { Clock, AlertTriangle, CheckCircle2, Circle, MoreVertical, Flag, Tag } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Task, Platform, TaskPriority, TaskStatus } from '@/lib/types'
import { useState } from 'react'

interface TaskCardProps {
  task: Task
  onStatusChange?: (taskId: string, status: TaskStatus) => void
  onDelete?: (taskId: string) => void
}

const platformConfig: Record<Platform, { name: string; color: string }> = {
  qq: { name: 'QQ', color: 'text-blue-400' },
  wechat: { name: '微信', color: 'text-green-400' },
  feishu: { name: '飞书', color: 'text-purple-400' },
}

const priorityConfig: Record<TaskPriority, { label: string; color: string; bgColor: string }> = {
  high: { label: '紧急', color: 'text-red-400', bgColor: 'bg-red-500/20' },
  medium: { label: '一般', color: 'text-yellow-400', bgColor: 'bg-yellow-500/20' },
  low: { label: '低', color: 'text-blue-400', bgColor: 'bg-blue-500/20' },
}

const statusConfig: Record<TaskStatus, { label: string; color: string }> = {
  pending: { label: '待处理', color: 'text-muted-foreground' },
  in_progress: { label: '进行中', color: 'text-primary' },
  completed: { label: '已完成', color: 'text-green-400' },
  overdue: { label: '已逾期', color: 'text-red-400' },
}

function getDeadlineText(deadline: Date): { text: string; isUrgent: boolean } {
  if (isPast(deadline)) {
    return { text: '已逾期', isUrgent: true }
  }
  if (isToday(deadline)) {
    return { text: `今天 ${format(deadline, 'HH:mm')}`, isUrgent: true }
  }
  if (isTomorrow(deadline)) {
    return { text: `明天 ${format(deadline, 'HH:mm')}`, isUrgent: true }
  }
  return { 
    text: format(deadline, 'M月d日 HH:mm', { locale: zhCN }), 
    isUrgent: false 
  }
}

export function TaskCard({ task, onStatusChange, onDelete }: TaskCardProps) {
  const [showMenu, setShowMenu] = useState(false)
  const platform = platformConfig[task.source.platform]
  const priority = priorityConfig[task.priority]
  const status = statusConfig[task.status]
  const { text: deadlineText, isUrgent } = getDeadlineText(task.deadline)
  
  const handleToggleComplete = () => {
    if (onStatusChange) {
      onStatusChange(task.id, task.status === 'completed' ? 'pending' : 'completed')
    }
  }

  return (
    <div 
      className={cn(
        "group relative p-4 rounded-xl bg-card border border-border",
        "hover:border-primary/50 transition-all duration-300",
        task.status === 'completed' && "opacity-60"
      )}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button 
          onClick={handleToggleComplete}
          className="mt-0.5 shrink-0"
        >
          {task.status === 'completed' ? (
            <CheckCircle2 className="w-5 h-5 text-green-500" />
          ) : (
            <Circle className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
          )}
        </button>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className={cn(
              "font-medium text-foreground",
              task.status === 'completed' && "line-through"
            )}>
              {task.title}
            </h3>
            <div className="relative shrink-0">
              <button 
                onClick={() => setShowMenu(!showMenu)}
                className="p-1 rounded hover:bg-secondary transition-colors opacity-0 group-hover:opacity-100"
              >
                <MoreVertical className="w-4 h-4 text-muted-foreground" />
              </button>
              {showMenu && (
                <div className="absolute right-0 top-full mt-1 w-32 py-1 rounded-lg bg-popover border border-border shadow-lg z-10">
                  <button 
                    onClick={() => { onStatusChange?.(task.id, 'in_progress'); setShowMenu(false) }}
                    className="w-full px-3 py-1.5 text-left text-sm hover:bg-secondary transition-colors"
                  >
                    标记进行中
                  </button>
                  <button 
                    onClick={() => { onDelete?.(task.id); setShowMenu(false) }}
                    className="w-full px-3 py-1.5 text-left text-sm text-destructive hover:bg-secondary transition-colors"
                  >
                    删除
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {task.description && (
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
              {task.description}
            </p>
          )}
          
          <div className="flex flex-wrap items-center gap-2 mt-3">
            {/* Priority Badge */}
            <span className={cn(
              "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium",
              priority.bgColor, priority.color
            )}>
              <Flag className="w-3 h-3" />
              {priority.label}
            </span>
            
            {/* Platform Badge */}
            <span className={cn("text-xs", platform.color)}>
              来自 {platform.name}
            </span>
            
            {/* Tags */}
            {task.tags && task.tags.map((tag) => (
              <span 
                key={tag}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-secondary text-secondary-foreground"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
          
          {/* Deadline */}
          <div className={cn(
            "flex items-center gap-1.5 mt-3 text-sm",
            isUrgent ? "text-destructive" : "text-muted-foreground"
          )}>
            {isUrgent ? (
              <AlertTriangle className="w-4 h-4" />
            ) : (
              <Clock className="w-4 h-4" />
            )}
            <span>截止：{deadlineText}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

interface TaskListProps {
  tasks: Task[]
  onStatusChange?: (taskId: string, status: TaskStatus) => void
  onDelete?: (taskId: string) => void
}

export function TaskList({ tasks, onStatusChange, onDelete }: TaskListProps) {
  const sortedTasks = [...tasks].sort((a, b) => {
    // 按优先级和截止时间排序
    const priorityOrder = { high: 0, medium: 1, low: 2 }
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority]
    }
    return a.deadline.getTime() - b.deadline.getTime()
  })

  return (
    <div className="space-y-3">
      {sortedTasks.map((task) => (
        <TaskCard 
          key={task.id} 
          task={task} 
          onStatusChange={onStatusChange}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
