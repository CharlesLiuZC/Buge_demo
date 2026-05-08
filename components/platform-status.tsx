'use client'

import { useEffect, useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { PlatformStatus, Platform } from '@/lib/types'

interface PlatformStatusCardProps {
  status: PlatformStatus
  onRefresh?: () => void
  isRefreshing?: boolean
}

const platformConfig: Record<Platform, { name: string; color: string; bgColor: string; icon: string }> = {
  qq: {
    name: 'QQ',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20',
    icon: 'QQ',
  },
  wechat: {
    name: '微信',
    color: 'text-green-400',
    bgColor: 'bg-green-500/20',
    icon: '微',
  },
  feishu: {
    name: '飞书',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/20',
    icon: '飞',
  },
}

export function PlatformStatusCard({ status, onRefresh, isRefreshing = false }: PlatformStatusCardProps) {
  const config = platformConfig[status.platform]

  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border">
      <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold shrink-0", config.bgColor, config.color)}>
        {config.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className={cn("font-medium text-sm", config.color)}>{config.name}</h3>
          <span className={cn("w-1.5 h-1.5 rounded-full", status.isConnected ? "bg-green-500" : "bg-red-500")} />
        </div>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[10px] text-muted-foreground">
          <span>{status.messageCount}条</span>
          <span>·</span>
          <span>{status.unreadCount}未读</span>
          <span>·</span>
          <span>{formatDistanceToNow(status.lastSync, { locale: zhCN, addSuffix: true })}同步</span>
        </div>
      </div>
      <button
        onClick={onRefresh}
        disabled={isRefreshing}
        className={cn(
          "p-2 rounded-lg hover:bg-secondary transition-colors",
          isRefreshing && "cursor-not-allowed opacity-70"
        )}
        title={`${config.name} 手动同步`}
        aria-label={`${config.name} 手动同步`}
      >
        <RefreshCw className={cn("w-4 h-4 text-muted-foreground", isRefreshing && "animate-spin text-primary")} />
      </button>
    </div>
  )
}

interface PlatformStatusListProps {
  platforms: PlatformStatus[]
}

export function PlatformStatusList({ platforms }: PlatformStatusListProps) {
  const [items, setItems] = useState(platforms)
  const [refreshingPlatform, setRefreshingPlatform] = useState<Platform | null>(null)

  useEffect(() => {
    setItems(platforms)
  }, [platforms])

  const handleRefresh = (platform: Platform) => {
    if (refreshingPlatform) return
    setRefreshingPlatform(platform)
    window.setTimeout(() => {
      setItems((prev) =>
        prev.map((item) =>
          item.platform === platform
            ? {
                ...item,
                lastSync: new Date(),
                messageCount: item.messageCount + Math.floor(Math.random() * 4),
              }
            : item
        )
      )
      setRefreshingPlatform(null)
    }, 900)
  }

  return (
    <div className="space-y-2">
      {items.map((platform) => (
        <PlatformStatusCard
          key={platform.platform}
          status={platform}
          isRefreshing={refreshingPlatform === platform.platform}
          onRefresh={() => handleRefresh(platform.platform)}
        />
      ))}
    </div>
  )
}
