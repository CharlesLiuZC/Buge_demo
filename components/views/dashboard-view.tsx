'use client'

import { Header } from '@/components/header'
import { StatsCards } from '@/components/stats-cards'
import { PlatformStatusList } from '@/components/platform-status'
import { AISuggestions } from '@/components/ai-suggestions'
import { DeadlineTimeline } from '@/components/deadline-timeline'
import { mockStatistics, mockPlatformStatus, mockTasks, aiSuggestions } from '@/lib/mock-data'

export function DashboardView() {
  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <Header 
        title="不搁" 
        subtitle="今天有 3 个任务需要关注" 
      />
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          {/* Stats Overview */}
          <StatsCards stats={mockStatistics} />

          {/* Platform Status */}
          <div>
            <h2 className="text-sm font-semibold text-foreground mb-3">平台状态</h2>
            <PlatformStatusList platforms={mockPlatformStatus} />
          </div>

          {/* AI Suggestions */}
          <AISuggestions suggestions={aiSuggestions} />

          {/* Deadline Timeline */}
          <DeadlineTimeline tasks={mockTasks} />
        </div>
      </div>
    </div>
  )
}
