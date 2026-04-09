'use client'

import { useState, useCallback, useRef } from 'react'
import { useDocumentOperation } from 'sanity'

interface ActionProps {
  id: string
  type: string
  draft?: any
  published?: any
}

export function GenerateImageAction(props: ActionProps) {
  const { id, type } = props
  const { patch } = useDocumentOperation(id, type)

  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = useCallback(async () => {
    setIsGenerating(true)
    setError(null)

    const doc = props.draft ?? props.published
    const title = doc?.title
    const excerpt = doc?.excerpt
    const category = doc?.category

    if (!title) {
      setError('Add a title first so the image can match the article.')
      setIsGenerating(false)
      return
    }

    try {
      const res = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, excerpt, category }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error ?? 'Image generation failed')
      }

      patch.execute([
        {
          set: {
            coverImage: {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: data.assetId,
              },
              alt: `Cover image for: ${title}`,
            },
          },
        },
      ])
    } catch (err: any) {
      setError(err.message ?? 'Something went wrong')
    } finally {
      setIsGenerating(false)
    }
  }, [patch, props.draft, props.published])

  if (type !== 'guestPost') return null

  return {
    label: isGenerating ? 'Generating image…' : 'Generate Cover Image',
    icon: () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="m21 15-5-5L5 21" />
      </svg>
    ),
    disabled: isGenerating,
    onHandle: handleGenerate,
    dialog: error
      ? {
          type: 'dialog' as const,
          header: 'Image Generation Error',
          onClose: () => setError(null),
          content: (
            <div style={{ padding: '1.5rem' }}>
              <p style={{ color: '#ef4444', fontSize: 14, margin: 0 }}>{error}</p>
            </div>
          ),
        }
      : undefined,
  }
}
