'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { MobileNav } from '@/components/mobile-nav'
import { DashboardView } from '@/components/views/dashboard-view'
import { MessagesView } from '@/components/views/messages-view'
import { TasksView } from '@/components/views/tasks-view'
import { ScheduleView } from '@/components/views/schedule-view'
import { NotificationsView } from '@/components/views/notifications-view'
import { SettingsView } from '@/components/views/settings-view'

export default function DemoPage() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const renderView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />
      case 'messages':
        return <MessagesView />
      case 'tasks':
        return <TasksView />
      case 'schedule':
        return <ScheduleView />
      case 'notifications':
        return <NotificationsView />
      case 'settings':
        return <SettingsView />
      default:
        return <DashboardView />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4 pointer-events-none">
        <Link
          href="/"
          className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-border bg-card/90 px-3 py-2 text-xs font-medium text-muted-foreground backdrop-blur transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          返回项目介绍
        </Link>
      </div>
      <div className="flex flex-col h-screen bg-background max-w-md mx-auto relative border-x border-border/60">
        <main className="flex-1 overflow-hidden pb-16 pt-14">
          {renderView()}
        </main>
        <MobileNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  )
}
