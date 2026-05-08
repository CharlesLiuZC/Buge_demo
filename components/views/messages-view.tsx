'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { MessageList } from '@/components/message-card'
import { mockMessages } from '@/lib/mock-data'
import type { Platform } from '@/lib/types'
import { cn } from '@/lib/utils'
import { Filter, RefreshCw, Sparkles } from 'lucide-react'

const platformFilters: { id: Platform | 'all'; label: string }[] = [
  { id: 'all', label: '全部' },
  { id: 'qq', label: 'QQ' },
  { id: 'wechat', label: '微信' },
  { id: 'feishu', label: '飞书' },
]

export function MessagesView() {
  const [messages, setMessages] = useState(mockMessages)
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | 'all'>('all')
  const [showDeadlinesOnly, setShowDeadlinesOnly] = useState(false)
  const [isSyncing, setIsSyncing] = useState(false)

  const filteredMessages = messages.filter((msg) => {
    if (selectedPlatform !== 'all' && msg.platform !== selectedPlatform) {
      return false
    }
    if (showDeadlinesOnly && !msg.hasDeadline) {
      return false
    }
    return true
  })

  const handleMarkRead = (id: string) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === id ? { ...msg, isRead: !msg.isRead } : msg
      )
    )
  }

  const handleSync = () => {
    setIsSyncing(true)
    setTimeout(() => setIsSyncing(false), 2000)
  }

  const unreadCount = messages.filter(m => !m.isRead).length
  const deadlineCount = messages.filter(m => m.hasDeadline).length

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <Header 
        title="消息监测" 
        subtitle={`${messages.length} 条消息，${unreadCount} 条未读`}
      />
      
      <div className="flex-1 overflow-y-auto">
        {/* Filters */}
        <div className="sticky top-0 z-10 px-4 py-3 bg-background/90 backdrop-blur-sm border-b border-border">
          <div className="flex items-center justify-between gap-2 mb-3">
            {/* Platform Filter */}
            <div className="flex items-center gap-1 p-0.5 bg-secondary rounded-lg overflow-x-auto flex-1">
              {platformFilters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedPlatform(filter.id)}
                  className={cn(
                    "px-3 py-1.5 rounded-md text-xs font-medium transition-all whitespace-nowrap",
                    selectedPlatform === filter.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Sync Button */}
            <button
              onClick={handleSync}
              disabled={isSyncing}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground font-medium text-xs transition-all shrink-0",
                "disabled:opacity-50"
              )}
            >
              <RefreshCw className={cn("w-3.5 h-3.5", isSyncing && "animate-spin")} />
              {isSyncing ? '同步中' : '同步'}
            </button>
          </div>

          {/* DDL Filter */}
          <button
            onClick={() => setShowDeadlinesOnly(!showDeadlinesOnly)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
              showDeadlinesOnly
                ? "bg-primary/20 text-primary"
                : "bg-secondary text-muted-foreground"
            )}
          >
            <Sparkles className="w-3.5 h-3.5" />
            仅含 DDL ({deadlineCount})
          </button>
        </div>

        {/* Messages List */}
        <div className="p-4">
          {filteredMessages.length > 0 ? (
            <MessageList
              messages={filteredMessages}
              onMarkRead={handleMarkRead}
            />
          ) : (
            <div className="text-center py-12">
              <Filter className="w-10 h-10 mx-auto mb-3 text-muted-foreground opacity-50" />
              <p className="text-sm text-muted-foreground">没有符合条件的消息</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
