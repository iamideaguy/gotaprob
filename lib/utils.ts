import { format, parseISO, formatDistanceToNow } from 'date-fns'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateStr: string): string {
  try { return format(parseISO(dateStr), 'MMMM d, yyyy') } catch { return dateStr }
}

export function formatDateShort(dateStr: string): string {
  try { return format(parseISO(dateStr), 'MMM d, yyyy') } catch { return dateStr }
}

export function timeAgo(dateStr: string): string {
  try { return formatDistanceToNow(parseISO(dateStr), { addSuffix: true }) } catch { return dateStr }
}

export function slugify(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export function scoreColor(score: number): string {
  if (score >= 75) return 'text-forest-600'
  if (score >= 50) return 'text-amber-700'
  return 'text-red-700'
}

export function scoreBg(score: number): string {
  if (score >= 75) return 'bg-forest-50 border-forest-200'
  if (score >= 50) return 'bg-amber-50 border-amber-200'
  return 'bg-red-50 border-red-200'
}
