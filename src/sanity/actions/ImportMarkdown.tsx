'use client'

import { useDocumentOperation } from 'sanity'

interface ActionProps {
  id: string
  type: string
}

// ─── Inline parser (bold + links) ────────────────────────────────────────────

function parseInline(text: string, blockKey: number) {
  const children: any[] = []
  const markDefs: any[] = []
  let spanIdx = 0

  const pattern = /(\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\))/g
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      children.push({
        _type: 'span',
        _key: `s${blockKey}_${spanIdx++}`,
        text: text.slice(lastIndex, match.index),
        marks: [],
      })
    }

    if (match[0].startsWith('**')) {
      children.push({
        _type: 'span',
        _key: `s${blockKey}_${spanIdx++}`,
        text: match[2],
        marks: ['strong'],
      })
    } else {
      const linkKey = `lnk${blockKey}_${spanIdx}`
      markDefs.push({ _key: linkKey, _type: 'link', href: match[4] })
      children.push({
        _type: 'span',
        _key: `s${blockKey}_${spanIdx++}`,
        text: match[3],
        marks: [linkKey],
      })
    }

    lastIndex = pattern.lastIndex
  }

  if (lastIndex < text.length) {
    children.push({
      _type: 'span',
      _key: `s${blockKey}_${spanIdx++}`,
      text: text.slice(lastIndex),
      marks: [],
    })
  }

  if (children.length === 0) {
    children.push({ _type: 'span', _key: `s${blockKey}_0`, text, marks: [] })
  }

  return { children, markDefs }
}

// ─── Markdown → Portable Text ─────────────────────────────────────────────────

function markdownToPortableText(markdown: string) {
  const lines = markdown.split('\n')
  const blocks: any[] = []
  let key = 0

  for (const raw of lines) {
    const line = raw.trimEnd()
    if (!line || line === '---') continue

    let style = 'normal'
    let content = line

    if (line.startsWith('### '))     { style = 'h3';         content = line.slice(4) }
    else if (line.startsWith('## ')) { style = 'h2';         content = line.slice(3) }
    else if (line.startsWith('# '))  { style = 'h2';         content = line.slice(2) }
    else if (line.startsWith('> '))  { style = 'blockquote'; content = line.slice(2) }

    if (/^\*By .+\*$/.test(content.trim())) continue
    if (/^(\*+)?(Suggested\s+)?Meta(\s+Description)?:/i.test(content.trim())) continue

    const { children, markDefs } = parseInline(content, key)
    const hasText = children.some((c: any) => c.text?.trim())
    if (!hasText) continue

    blocks.push({
      _type: 'block',
      _key: `blk${key++}`,
      style,
      markDefs,
      children,
    })
  }

  return blocks
}

// ─── Parse whole file ─────────────────────────────────────────────────────────

function parseMarkdownFile(text: string) {
  const lines = text.split('\n')

  const titleLine = lines.find((l) => l.startsWith('# '))
  const title = titleLine ? titleLine.slice(2).trim() : ''

  const META_RE = /^(\*+)?(Suggested\s+)?Meta(\s+Description)?:/i

  const metaLine = lines.find((l) => META_RE.test(l.trim()))
  const excerpt = metaLine
    ? metaLine.replace(/^\*+(?:Suggested\s+)?Meta(?:\s+Description)?:\*+\s*/i, '').replace(META_RE, '').trim()
    : ''

  const bodyLines = lines.filter((l) => {
    if (l.startsWith('# ')) return false
    if (/^\*By .+\*$/.test(l.trim())) return false
    if (META_RE.test(l.trim())) return false
    return true
  })

  const body = markdownToPortableText(bodyLines.join('\n'))

  return { title, excerpt, body }
}

// ─── Document Action ──────────────────────────────────────────────────────────

export function ImportMarkdownAction({ id, type }: ActionProps) {
  const { patch } = useDocumentOperation(id, type)

  return {
    label: 'Import Markdown',
    icon: () => '📄',
    onHandle: () => {
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = '.md,.markdown'
      input.onchange = () => {
        const file = input.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.onload = (e) => {
          const text = e.target?.result as string
          const { title, excerpt, body } = parseMarkdownFile(text)

          const sets: Record<string, any> = { body }
          if (title)   sets.title = title
          if (excerpt) sets.excerpt = excerpt
          if (title) {
            sets.slug = {
              _type: 'slug',
              current: title
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '')
                .trim()
                .replace(/\s+/g, '-')
                .slice(0, 96),
            }
          }

          patch.execute([{ set: sets }])
        }
        reader.readAsText(file)
      }
      input.click()
    },
  }
}
