import { HEAT_CONFIG, type HeatLevel } from '@/lib/problems'
import { cn } from '@/lib/utils'

export function HeatBadge({ heat, className }: { heat: HeatLevel; className?: string }) {
  const { label, emoji, bg, text } = HEAT_CONFIG[heat]
  return (
    <span className={cn('inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-sm', bg, text, className)}>
      <span>{emoji}</span>
      {label}
    </span>
  )
}
