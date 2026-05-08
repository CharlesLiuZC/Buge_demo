'use client'

import { Sparkles, AlertTriangle, Lightbulb, Bell, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface Suggestion {
  id: string
  type: 'urgent' | 'optimize' | 'reminder'
  title: string
  content: string
  actionText: string
}

interface AISuggestionsProps {
  suggestions: Suggestion[]
}

const typeConfig = {
  urgent: {
    icon: AlertTriangle,
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
  },
  optimize: {
    icon: Lightbulb,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10',
  },
  reminder: {
    icon: Bell,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
  },
}

export function AISuggestions({ suggestions: initialSuggestions }: AISuggestionsProps) {
  const [suggestions, setSuggestions] = useState(initialSuggestions)
  const [dismissed, setDismissed] = useState<Set<string>>(new Set())

  const visibleSuggestions = suggestions.filter(s => !dismissed.has(s.id))

  const handleDismiss = (id: string) => {
    setDismissed(prev => new Set([...prev, id]))
  }

  if (visibleSuggestions.length === 0) {
    return null
  }

  return (
    <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 via-card to-accent/10 border border-primary/20">
      <div className="flex items-center gap-2 mb-3">
        <div className="p-1.5 rounded-lg bg-primary/20">
          <Sparkles className="w-4 h-4 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-sm text-foreground">AI 建议</h3>
        </div>
      </div>

      <div className="space-y-2">
        {visibleSuggestions.slice(0, 2).map((suggestion) => {
          const config = typeConfig[suggestion.type]
          const Icon = config.icon

          return (
            <div
              key={suggestion.id}
              className={cn(
                "relative p-2.5 rounded-lg",
                config.bgColor
              )}
            >
              <button
                onClick={() => handleDismiss(suggestion.id)}
                className="absolute top-2 right-2 p-0.5 rounded hover:bg-secondary/50 transition-colors"
              >
                <X className="w-3 h-3 text-muted-foreground" />
              </button>

              <div className="flex items-start gap-2 pr-5">
                <Icon className={cn("w-4 h-4 mt-0.5 shrink-0", config.color)} />
                <div className="flex-1 min-w-0">
                  <h4 className={cn("font-medium text-xs mb-0.5", config.color)}>
                    {suggestion.title}
                  </h4>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {suggestion.content}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
