'use client'

import { useEffect, useMemo, useState } from 'react'
import { Header } from '@/components/header'
import { MessageList } from '@/components/message-card'
import { mockMessages } from '@/lib/mock-data'
import type { Message, Platform, TaskPriority } from '@/lib/types'
import { cn } from '@/lib/utils'
import { Check, Filter, RefreshCw, Sparkles, X } from 'lucide-react'

const platformFilters: { id: Platform | 'all'; label: string }[] = [
  { id: 'all', label: '全部' },
  { id: 'qq', label: 'QQ' },
  { id: 'wechat', label: '微信' },
  { id: 'feishu', label: '飞书' },
]

const priorityOptions: { id: TaskPriority; label: string }[] = [
  { id: 'high', label: 'P0 高' },
  { id: 'medium', label: 'P1 中' },
  { id: 'low', label: 'P2 低' },
]

function toDateTimeInputValue(date?: Date) {
  if (!date) return ''
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
  return localDate.toISOString().slice(0, 16)
}

function fromDateTimeInputValue(value: string) {
  return value ? new Date(value) : undefined
}

interface TaskEditorState {
  id: string
  title: string
  deadline: string
  priority: TaskPriority
}

export function MessagesView() {
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | 'all'>('all')
  const [showDeadlinesOnly, setShowDeadlinesOnly] = useState(false)
  const [isSyncing, setIsSyncing] = useState(false)
  const [editor, setEditor] = useState<TaskEditorState | null>(null)
  const [savedMessageId, setSavedMessageId] = useState<string | null>(null)

  const filteredMessages = useMemo(
    () =>
      messages.filter((msg) => {
        if (selectedPlatform !== 'all' && msg.platform !== selectedPlatform) return false
        if (showDeadlinesOnly && !msg.hasDeadline) return false
        return true
      }),
    [messages, selectedPlatform, showDeadlinesOnly]
  )

  useEffect(() => {
    if (!savedMessageId) return
    const timer = window.setTimeout(() => setSavedMessageId(null), 1600)
    return () => window.clearTimeout(timer)
  }, [savedMessageId])

  const handleMarkRead = (id: string) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, isRead: !msg.isRead } : msg))
    )
  }

  const handleSync = () => {
    setIsSyncing(true)
    window.setTimeout(() => setIsSyncing(false), 1200)
  }

  const handleOpenEditor = (message: Message) => {
    setEditor({
      id: message.id,
      title: message.extractedTask || '',
      deadline: toDateTimeInputValue(message.extractedDeadline),
      priority: message.extractedPriority || 'medium',
    })
  }

  const handleSaveEditor = () => {
    if (!editor) return
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === editor.id
          ? {
              ...msg,
              hasDeadline: true,
              extractedTask: editor.title.trim() || msg.extractedTask,
              extractedDeadline: fromDateTimeInputValue(editor.deadline) || msg.extractedDeadline,
              extractedPriority: editor.priority,
            }
          : msg
      )
    )
    setSavedMessageId(editor.id)
    setEditor(null)
  }

  const editingMessage = editor ? messages.find((message) => message.id === editor.id) : null
  const unreadCount = messages.filter((m) => !m.isRead).length
  const deadlineCount = messages.filter((m) => m.hasDeadline).length

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <Header title="消息监测" subtitle={`${messages.length} 条消息，${unreadCount} 条未读`} />

      <div className="flex-1 overflow-y-auto">
        <div className="sticky top-0 z-10 px-4 py-3 bg-background/90 backdrop-blur-sm border-b border-border">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-1 p-0.5 bg-secondary rounded-lg overflow-x-auto flex-1">
              {platformFilters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedPlatform(filter.id)}
                  className={cn(
                    "px-3 py-1.5 rounded-md text-xs font-medium transition-all whitespace-nowrap",
                    selectedPlatform === filter.id ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                  )}
                >
                  {filter.label}
                </button>
              ))}
            </div>

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

          <button
            onClick={() => setShowDeadlinesOnly(!showDeadlinesOnly)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
              showDeadlinesOnly ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground"
            )}
          >
            <Sparkles className="w-3.5 h-3.5" />
            仅含 DDL ({deadlineCount})
          </button>
        </div>

        {savedMessageId && (
          <div className="mx-4 mt-3 rounded-lg border border-primary/30 bg-primary/10 px-3 py-2 text-xs text-primary">
            AI 识别任务已更新
          </div>
        )}

        <div className="p-4">
          {filteredMessages.length > 0 ? (
            <MessageList messages={filteredMessages} onMarkRead={handleMarkRead} onCreateTask={handleOpenEditor} />
          ) : (
            <div className="text-center py-12">
              <Filter className="w-10 h-10 mx-auto mb-3 text-muted-foreground opacity-50" />
              <p className="text-sm text-muted-foreground">没有符合条件的消息</p>
            </div>
          )}
        </div>
      </div>

      {editor && (
        <div className="fixed inset-0 z-[80] bg-background/80 backdrop-blur-sm flex items-end justify-center px-3 pb-3">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card shadow-2xl">
            <div className="flex items-start justify-between gap-3 border-b border-border p-4">
              <div>
                <h3 className="font-semibold text-foreground">编辑 AI 识别任务</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {editingMessage ? `${editingMessage.sender} · ${editingMessage.groupName || '私聊消息'}` : '修正任务信息'}
                </p>
              </div>
              <button
                onClick={() => setEditor(null)}
                className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                aria-label="关闭编辑面板"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4 p-4">
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-muted-foreground">任务内容</span>
                <textarea
                  value={editor.title}
                  onChange={(event) => setEditor((prev) => prev ? { ...prev, title: event.target.value } : prev)}
                  className="min-h-20 w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition focus:border-primary"
                  placeholder="输入任务内容"
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-muted-foreground">截止时间</span>
                <input
                  type="datetime-local"
                  value={editor.deadline}
                  onChange={(event) => setEditor((prev) => prev ? { ...prev, deadline: event.target.value } : prev)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition focus:border-primary"
                />
              </label>

              <div>
                <span className="mb-1.5 block text-xs font-medium text-muted-foreground">优先级</span>
                <div className="grid grid-cols-3 gap-2">
                  {priorityOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setEditor((prev) => prev ? { ...prev, priority: option.id } : prev)}
                      className={cn(
                        "rounded-lg border px-3 py-2 text-xs font-medium transition",
                        editor.priority === option.id
                          ? "border-primary bg-primary/20 text-primary"
                          : "border-border bg-background text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-2 border-t border-border p-4">
              <button
                onClick={() => setEditor(null)}
                className="flex-1 rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition hover:bg-secondary hover:text-foreground"
              >
                取消
              </button>
              <button
                onClick={handleSaveEditor}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                <Check className="h-4 w-4" />
                保存修改
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
