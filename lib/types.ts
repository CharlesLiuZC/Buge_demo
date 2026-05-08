export type Platform = 'qq' | 'wechat' | 'feishu'

export type TaskPriority = 'high' | 'medium' | 'low'

export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'overdue'

export interface Message {
  id: string
  platform: Platform
  sender: string
  content: string
  timestamp: Date
  hasDeadline: boolean
  extractedDeadline?: Date
  extractedTask?: string
  isRead: boolean
  groupName?: string
}

export interface Task {
  id: string
  title: string
  description?: string
  deadline: Date
  priority: TaskPriority
  status: TaskStatus
  source: {
    platform: Platform
    messageId: string
    sender: string
  }
  createdAt: Date
  tags?: string[]
}

export interface PlatformStatus {
  platform: Platform
  isConnected: boolean
  lastSync: Date
  messageCount: number
  unreadCount: number
}

export interface DailySchedule {
  date: Date
  tasks: Task[]
  suggestedOrder: string[]
  aiInsights?: string
}

export interface Statistics {
  totalTasks: number
  completedTasks: number
  upcomingDeadlines: number
  overdueCount: number
  messagesSynced: number
  platformStats: {
    platform: Platform
    tasks: number
    messages: number
  }[]
}
