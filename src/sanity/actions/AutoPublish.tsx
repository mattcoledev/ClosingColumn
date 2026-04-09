'use client'

import { useCallback, useEffect, useState } from 'react'
import { useDocumentOperation } from 'sanity'

export function AutoPublishAction({ id, type, draft, published }: any) {
  const { patch, publish } = useDocumentOperation(id, type)
  const [isPublishing, setIsPublishing] = useState(false)

  // Reset when the draft disappears (publish completed)
  useEffect(() => {
    if (isPublishing && !draft) setIsPublishing(false)
  }, [draft, isPublishing])

  const onHandle = useCallback(() => {
    patch.execute([
      { setIfMissing: { reviewStatus: 'pending', paymentStatus: 'unpaid' } },
      ...(!draft?.publishedAt
        ? [{ set: { publishedAt: new Date().toISOString() } }]
        : []),
    ])
    publish.execute()
    setIsPublishing(true)
  }, [draft, patch, publish])

  if (type !== 'guestPost') return null

  return {
    label: isPublishing ? 'Publishing…' : 'Publish',
    tone: 'primary' as const,
    disabled: !!publish.disabled || isPublishing,
    onHandle,
  }
}
