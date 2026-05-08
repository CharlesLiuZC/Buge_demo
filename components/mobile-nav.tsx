'use client'

import { 
  LayoutDashboard, 
  MessageSquare, 
  CalendarDays, 
  CheckSquare, 
  Settings, 
  Bell,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface MobileNavProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const navItems = [
  { id: 'dashboard', label: '首页', icon: LayoutDashboard },
  { id: 'messages', label: '消息', icon: MessageSquare },
  { id: 'tasks', label: '任务', icon: CheckSquare },
  { id: 'notifications', label: '提醒', icon: Bell },
  { id: 'settings', label: '设置', icon: Settings },
]

export function MobileNav({ activeTab, onTabChange }: MobileNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-card/95 backdrop-blur-lg border-t border-border z-50 safe-area-pb">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all duration-200 min-w-[56px]",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground"
              )}
            >
              <div className={cn(
                "p-1.5 rounded-lg transition-all",
                isActive && "bg-primary/10"
              )}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
