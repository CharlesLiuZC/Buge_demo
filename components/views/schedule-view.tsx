'use client'

import { useState } from 'react'
import { format, addDays, startOfWeek, isSameDay, isToday } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { Header } from '@/components/header'
import { mockTasks } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight, Sparkles, Flag, Clock } from 'lucide-react'
import type { Task, TaskPriority } from '@/lib/types'

const priorityColors: Record<TaskPriority, string> = {
  high: 'bg-red-500/20 border-l-red-500 text-red-400',
  medium: 'bg-yellow-500/20 border-l-yellow-500 text-yellow-400',
  low: 'bg-blue-500/20 border-l-blue-500 text-blue-400',
}

export function ScheduleView() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDay, setSelectedDay] = useState<Date>(new Date())
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 })
  
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))

  const getTasksForDate = (date: Date): Task[] => {
    return mockTasks.filter(task => isSameDay(task.deadline, date))
  }

  const goToPreviousWeek = () => setCurrentDate(addDays(currentDate, -7))
  const goToNextWeek = () => setCurrentDate(addDays(currentDate, 7))
  const goToToday = () => {
    setCurrentDate(new Date())
    setSelectedDay(new Date())
  }

  const selectedDayTasks = getTasksForDate(selectedDay)

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <Header 
        title="日程安排" 
        subtitle={format(currentDate, 'yyyy年M月', { locale: zhCN })}
      />
      
      <div className="flex-1 overflow-y-auto">
        {/* Week Navigation */}
        <div className="sticky top-0 z-10 px-4 py-3 bg-background/90 backdrop-blur-sm border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1">
              <button
                onClick={goToPreviousWeek}
                className="p-2 rounded-lg hover:bg-secondary transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-muted-foreground" />
              </button>
              <button
                onClick={goToToday}
                className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium"
              >
                今天
              </button>
              <button
                onClick={goToNextWeek}
                className="p-2 rounded-lg hover:bg-secondary transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>AI 排程</span>
            </div>
          </div>

          {/* Week Days */}
          <div className="grid grid-cols-7 gap-1">
            {weekDays.map((day) => {
              const today = isToday(day)
              const selected = isSameDay(day, selectedDay)
              const hasTasks = getTasksForDate(day).length > 0
              
              return (
                <button
                  key={day.toISOString()}
                  onClick={() => setSelectedDay(day)}
                  className={cn(
                    "flex flex-col items-center py-2 rounded-xl transition-all",
                    selected 
                      ? "bg-primary text-primary-foreground" 
                      : today 
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-secondary"
                  )}
                >
                  <span className="text-[10px] font-medium mb-1">
                    {format(day, 'EEE', { locale: zhCN })}
                  </span>
                  <span className={cn(
                    "text-sm font-bold",
                    !selected && !today && "text-foreground"
                  )}>
                    {format(day, 'd')}
                  </span>
                  {hasTasks && !selected && (
                    <span className="w-1 h-1 rounded-full bg-primary mt-1" />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Selected Day Tasks */}
        <div className="p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">
            {format(selectedDay, 'M月d日 EEEE', { locale: zhCN })}
            <span className="text-muted-foreground font-normal ml-2">
              {selectedDayTasks.length} 个任务
            </span>
          </h3>

          {selectedDayTasks.length > 0 ? (
            <div className="space-y-2">
              {selectedDayTasks.map((task) => (
                <div
                  key={task.id}
                  className={cn(
                    "p-3 rounded-xl border-l-2",
                    priorityColors[task.priority]
                  )}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Flag className="w-3.5 h-3.5" />
                    <span className="font-medium text-sm text-foreground">{task.title}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                    {task.description}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{format(task.deadline, 'HH:mm')} 截止</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-sm text-muted-foreground">暂无任务</p>
            </div>
          )}

          {/* AI Schedule Suggestion */}
          <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <h3 className="font-semibold text-sm text-foreground">AI 建议</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              建议将「项目中期汇报」分成两天完成，今天完成PPT大纲，明天完善细节。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
