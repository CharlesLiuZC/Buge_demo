'use client'

import { Bell, User, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface HeaderProps {
  title: string
  subtitle?: string
}

export function Header({ title, subtitle }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false)

  const notifications = [
    { id: 1, title: '新任务提醒', content: '项目中期汇报明天截止', time: '5分钟前', unread: true },
    { id: 2, title: 'AI 识别到新DDL', content: '检测到数据结构实验报告截止时间', time: '1小时前', unread: true },
    { id: 3, title: '同步完成', content: '微信消息同步已完成', time: '2小时前', unread: false },
  ]

  return (
    <header className="sticky top-0 z-30 px-4 py-3 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/20 text-primary">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-base font-bold text-foreground">{title}</h1>
            {subtitle && (
              <p className="text-xs text-muted-foreground line-clamp-1">{subtitle}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg hover:bg-secondary transition-colors"
            >
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary animate-pulse" />
            </button>

            {showNotifications && (
              <>
                <div 
                  className="fixed inset-0 z-40"
                  onClick={() => setShowNotifications(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-72 rounded-xl bg-popover border border-border shadow-lg z-50">
                  <div className="p-3 border-b border-border">
                    <h3 className="font-semibold text-sm text-foreground">通知</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={cn(
                          "p-3 border-b border-border last:border-0 hover:bg-secondary/50 transition-colors",
                          notif.unread && "bg-primary/5"
                        )}
                      >
                        <div className="flex items-start gap-2">
                          {notif.unread && (
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-xs text-foreground">{notif.title}</h4>
                            <p className="text-xs text-muted-foreground truncate">{notif.content}</p>
                            <span className="text-[10px] text-muted-foreground">{notif.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-2 border-t border-border">
                    <button className="w-full py-1.5 text-xs text-primary hover:bg-secondary rounded-lg transition-colors">
                      查看全部通知
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* User Avatar */}
          <button className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20">
            <User className="w-4 h-4 text-primary" />
          </button>
        </div>
      </div>
    </header>
  )
}
