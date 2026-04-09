'use client'

import { useState, useCallback } from 'react'
import { useDocumentOperation } from 'sanity'

interface ActionProps {
  id: string
  type: string
  draft?: any
  published?: any
}

export function GenerateArticleAction(props: ActionProps) {
  const { id, type } = props
  const { patch } = useDocumentOperation(id, type)

  const [isOpen, setIsOpen] = useState(false)
  const [topic, setTopic] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = useCallback(async () => {
    setIsGenerating(true)
    setError(null)

    try {
      const res = await fetch('/api/generate-article', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: topic.trim() || undefined,
          category: props.draft?.category ?? props.published?.category,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error ?? 'Generation failed')
      }

      patch.execute([
        // Ensure string fields that may be null have a value before Sanity diffs them
        {
          setIfMissing: {
            reviewStatus: 'pending',
            paymentStatus: 'unpaid',
          },
        },
        {
          set: {
            title: data.title,
            slug: { _type: 'slug', current: data.slug },
            category: data.category,
            excerpt: data.excerpt,
            body: data.body,
          },
        },
      ])

      setIsOpen(false)
      setTopic('')
    } catch (err: any) {
      setError(err.message ?? 'Something went wrong')
    } finally {
      setIsGenerating(false)
    }
  }, [topic, patch, props.draft, props.published])

  if (type !== 'guestPost') return null

  return {
    label: 'Generate with AI',
    icon: () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    onHandle: () => setIsOpen(true),
    dialog: isOpen
      ? {
          type: 'dialog' as const,
          header: 'Generate Article with Claude AI',
          onClose: () => {
            setIsOpen(false)
            setError(null)
          },
          content: (
            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: 400 }}>
              <p style={{ margin: 0, color: '#64748b', fontSize: 14 }}>
                Claude will write a complete article — title, slug, excerpt, and body. Optionally give it a topic or angle.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: '#334155' }}>
                  Topic or angle (optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. rising mortgage rates and first-time buyers"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !isGenerating && handleGenerate()}
                  disabled={isGenerating}
                  style={{
                    padding: '8px 12px',
                    border: '1px solid #cbd5e1',
                    borderRadius: 6,
                    fontSize: 14,
                    outline: 'none',
                    width: '100%',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              {error && (
                <p style={{ margin: 0, color: '#ef4444', fontSize: 13 }}>{error}</p>
              )}
              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                <button
                  onClick={() => { setIsOpen(false); setError(null) }}
                  disabled={isGenerating}
                  style={{
                    padding: '8px 16px',
                    border: '1px solid #cbd5e1',
                    borderRadius: 6,
                    background: 'white',
                    cursor: 'pointer',
                    fontSize: 14,
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  style={{
                    padding: '8px 16px',
                    border: 'none',
                    borderRadius: 6,
                    background: isGenerating ? '#94a3b8' : '#d97706',
                    color: 'white',
                    cursor: isGenerating ? 'not-allowed' : 'pointer',
                    fontSize: 14,
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  {isGenerating ? (
                    <>
                      <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⟳</span>
                      Generating…
                    </>
                  ) : (
                    'Generate Article'
                  )}
                </button>
              </div>
            </div>
          ),
        }
      : undefined,
  }
}
