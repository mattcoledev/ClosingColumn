'use client'

import { useState } from 'react'
import { set } from 'sanity'
import { useFormValue } from 'sanity'
import type { TextInputProps } from 'sanity'

export function ExcerptInput(props: TextInputProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const title = useFormValue(['title']) as string | undefined
  const body = useFormValue(['body']) as any[] | undefined

  const handleGenerate = async () => {
    setIsGenerating(true)
    setError(null)
    try {
      const res = await fetch('/api/generate-excerpt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, body }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Generation failed')
      props.onChange(set(data.excerpt))
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsGenerating(false)
    }
  }

  const hasContent = !!title || (Array.isArray(body) && body.length > 0)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {props.renderDefault(props)}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <button
          type="button"
          onClick={handleGenerate}
          disabled={isGenerating || !hasContent}
          style={{
            padding: '6px 14px',
            border: 'none',
            borderRadius: 4,
            background: isGenerating || !hasContent ? '#94a3b8' : '#d97706',
            color: 'white',
            cursor: isGenerating || !hasContent ? 'not-allowed' : 'pointer',
            fontSize: 12,
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            whiteSpace: 'nowrap',
          }}
        >
          {isGenerating ? '⟳ Generating…' : '✦ Generate from article'}
        </button>
        {error && (
          <span style={{ color: '#ef4444', fontSize: 12 }}>{error}</span>
        )}
      </div>
    </div>
  )
}
