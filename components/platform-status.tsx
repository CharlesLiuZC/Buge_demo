'use client'

import { formatDistanceToNow } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { PlatformStatus, Platform } from '@/lib/types'

interface PlatformStatusCardProps {
  status: PlatformStatus
  onRefresh?: () => void
}

const platformConfig: Record<Platform, { name: string; color: string; bgColor: string; icon: string }> = {
  qq: { 
    name: 'QQ', 
    color: 'text-blue-400', 
    bgColor: 'bg-blue-500/20',
    icon: '🐧'
  },
  wechat: { 
    name: '微信', 
    color: 'text-green-400', 
    bgColor: 'bg-green-500/20',
    icon: '💬'
  },
  feishu: { 
    name: '飞书', 
    color: 'text-purple-400', 
    bgColor: 'bg-purple-500/20',
    icon: '🪶'
  },
}

export function PlatformStatusCard({ status, onRefresh }: PlatformStatusCardProps) {
  const config = platformConfig[status.platform]
  
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border">
      <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0", config.bgColor)}>
        {config.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className={cn("font-medium text-sm", config.color)}>{config.name}</h3>
          {status.isConnected ? (
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
          ) : (
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
          )}
        </div>
        <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
          <span>{status.messageCount}条</span>
          <span>·</span>
          <span>{status.unreadCount}未读</span>
        </div>
      </div>
      <button 
        onClick={onRefresh}
        className="p-2 rounded-lg hover:bg-secondary transition-colors"
      >
        <RefreshCw className="w-4 h-4 text-muted-foreground" />
      </button>
    </div>
  )
}

interface PlatformStatusListProps {
  platforms: PlatformStatus[]
}

export function PlatformStatusList({ platforms }: PlatformStatusListProps) {
  return (
    <div className="space-y-2">
      {platforms.map((platform) => (
        <PlatformStatusCard 
          key={platform.platform} 
          status={platform} 
        />
      ))}
    </div>
  )
}
