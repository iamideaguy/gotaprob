'use client'

import { useState } from 'react'
import { Link2, Mail, Check } from 'lucide-react'

export function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false)

  function getUrl() {
    return typeof window !== 'undefined' ? window.location.href : ''
  }

  async function copyLink() {
    await navigator.clipboard.writeText(getUrl())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function shareX() {
    window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(getUrl())}`, '_blank')
  }

  function shareFacebook() {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getUrl())}`, '_blank')
  }

  function shareReddit() {
    window.open(`https://reddit.com/submit?url=${encodeURIComponent(getUrl())}&title=${encodeURIComponent(title)}`, '_blank')
  }

  function shareEmail() {
    window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(getUrl())}`, '_self')
  }

  return (
    <div className="ml-auto flex items-center gap-1">
      <span className="text-xs text-muted mr-1">Share</span>

      {/* X / Twitter */}
      <button onClick={shareX} title="Share on X"
        className="w-7 h-7 flex items-center justify-center rounded-sm border border-border bg-white hover:bg-ink hover:text-cream hover:border-ink transition-colors text-ink">
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      </button>

      {/* Facebook */}
      <button onClick={shareFacebook} title="Share on Facebook"
        className="w-7 h-7 flex items-center justify-center rounded-sm border border-border bg-white hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-colors text-ink">
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      </button>

      {/* Reddit */}
      <button onClick={shareReddit} title="Share on Reddit"
        className="w-7 h-7 flex items-center justify-center rounded-sm border border-border bg-white hover:bg-[#FF4500] hover:text-white hover:border-[#FF4500] transition-colors text-ink">
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
          <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
        </svg>
      </button>

      {/* Email */}
      <button onClick={shareEmail} title="Share via email"
        className="w-7 h-7 flex items-center justify-center rounded-sm border border-border bg-white hover:bg-forest-600 hover:text-cream hover:border-forest-600 transition-colors text-ink">
        <Mail className="w-3.5 h-3.5" />
      </button>

      {/* Copy link */}
      <button onClick={copyLink} title="Copy link"
        className="w-7 h-7 flex items-center justify-center rounded-sm border border-border bg-white hover:bg-cream-200 transition-colors text-ink">
        {copied ? <Check className="w-3.5 h-3.5 text-forest-600" /> : <Link2 className="w-3.5 h-3.5" />}
      </button>
    </div>
  )
}
