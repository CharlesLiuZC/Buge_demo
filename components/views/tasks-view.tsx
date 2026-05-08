'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { TaskList } from '@/components/task-card'
import { mockTasks } from '@/lib/mock-data'
import type { TaskStatus, TaskPriority } from '@/lib/types'
import { cn } from '@/lib/utils'
import { Plus, CheckSquare, Clock, AlertTriangle, ListTodo } from 'lucide-react'

const statusFilters: { id: TaskStatus | 'all'; label: string; icon: React.ElementType }[] = [
  { id: 'all', label: '全部', icon: ListTodo },
  { id: 'pending', label: '待处理', icon: Clock },
  { id: 'in_progress', label: '进行中', icon: AlertTriangle },
  { id: 'completed', label: '已完成', icon: CheckSquare },
]

export function TasksView() {
  const [tasks, setTasks] = useState(mockTasks)
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus | 'all'>('all')
  const [sortBy, setSortBy] = useState<'deadline' | 'priority'>('deadline')

  const filteredTasks = tasks.filter((task) => {
    if (selectedStatus !== 'all' && task.status !== selectedStatus) {
      return false
    }
    return true
  })

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'deadline') {
      return a.deadline.getTime() - b.deadline.getTime()
    }
    const priorityOrder: Record<TaskPriority, number> = { high: 0, medium: 1, low: 2 }
    return priorityOrder[a.priority] - priorityOrder[b.priority]
  })

  const handleStatusChange = (taskId: string, status: TaskStatus) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId ? { ...task, status } : task
      )
    )
  }

  const handleDelete = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId))
  }

  const taskCounts = {
    all: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    in_progress: tasks.filter(t => t.status === 'in_progress').length,
    completed: tasks.filter(t => t.status === 'completed').length,
  }

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <Header 
        title="任务管理" 
        subtitle={`${tasks.length} 个任务，${taskCounts.pending} 个待处理`}
      />
      
      <div className="flex-1 overflow-y-auto">
        {/* Filters */}
        <div className="sticky top-0 z-10 px-4 py-3 bg-background/90 backdrop-blur-sm border-b border-border">
          <div className="flex items-center justify-between gap-2 mb-3">
            {/* Status Filter - Scrollable */}
            <div className="flex items-center gap-1 p-0.5 bg-secondary rounded-lg overflow-x-auto flex-1">
              {statusFilters.map((filter) => {
                const Icon = filter.icon
                const count = taskCounts[filter.id]
                return (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedStatus(filter.id)}
                    className={cn(
                      "flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all whitespace-nowrap",
                      selectedStatus === filter.id
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {filter.label}
                    <span className={cn(
                      "text-[10px] px-1 py-0.5 rounded-full",
                      selectedStatus === filter.id
                        ? "bg-primary-foreground/20"
                        : "bg-muted"
                    )}>
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="flex items-center justify-between">
            {/* Sort Toggle */}
            <button
              onClick={() => setSortBy(sortBy === 'deadline' ? 'priority' : 'deadline')}
              className="text-xs text-muted-foreground"
            >
              按{sortBy === 'deadline' ? '截止时间' : '优先级'}排序
            </button>

            {/* Add Task */}
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground font-medium text-xs">
              <Plus className="w-3.5 h-3.5" />
              添加
            </button>
          </div>
        </div>

        {/* Tasks List */}
        <div className="p-4">
          {sortedTasks.length > 0 ? (
            <TaskList
              tasks={sortedTasks}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
            />
          ) : (
            <div className="text-center py-12">
              <CheckSquare className="w-10 h-10 mx-auto mb-3 text-muted-foreground opacity-50" />
              <p className="text-sm text-muted-foreground">没有符合条件的任务</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
