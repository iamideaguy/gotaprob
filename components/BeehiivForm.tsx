'use client'

import { useEffect } from 'react'

export function BeehiivForm() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://subscribe-forms.beehiiv.com/embed.js'
    script.async = true
    document.body.appendChild(script)
    return () => { document.body.removeChild(script) }
  }, [])

  return (
    <iframe
      src="https://subscribe-forms.beehiiv.com/cabb5be0-c7be-46f1-8c0d-ea79eb27f1c2"
      frameBorder={0}
      scrolling="no"
      style={{
        width: '100%',
        maxWidth: '100%',
        height: '315px',
        margin: 0,
        borderRadius: 0,
        backgroundColor: 'transparent',
        boxShadow: 'none',
      }}
    />
  )
}
