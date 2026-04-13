import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const CATEGORIES = [
  'homebuying',
  'investing',
  'market-analysis',
  'agents-industry',
  'property-types',
  'local-markets',
]

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 96)
}

function textToPortableText(text: string) {
  const lines = text.split('\n').filter((l) => l.trim())
  const blocks: any[] = []
  let key = 0

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) continue

    let style = 'normal'
    let content = trimmed

    if (trimmed.startsWith('## ')) {
      style = 'h2'
      content = trimmed.slice(3)
    } else if (trimmed.startsWith('### ')) {
      style = 'h3'
      content = trimmed.slice(4)
    } else if (trimmed.startsWith('# ')) {
      style = 'h2'
      content = trimmed.slice(2)
    }

    blocks.push({
      _type: 'block',
      _key: `block${key++}`,
      style,
      markDefs: [],
      children: [
        {
          _type: 'span',
          _key: `span${key++}`,
          text: content,
          marks: [],
        },
      ],
    })
  }

  return blocks
}

export async function POST(req: NextRequest) {
  try {
    const { topic, category } = await req.json()

    const categoryHint = category && CATEGORIES.includes(category) ? category : null
    const topicLine = topic ? `Topic/angle: ${topic}` : 'Choose a compelling, timely real estate topic.'
    const categoryLine = categoryHint
      ? `Category: ${categoryHint}`
      : `Pick the most fitting category from: ${CATEGORIES.join(', ')}`

    const prompt = `You are a professional real estate content writer for The Closing Column, a publication for buyers, investors, and industry professionals.

${topicLine}
${categoryLine}

Write a complete, publish-ready guest article. Return ONLY valid JSON — no markdown fences, no extra commentary — matching this exact shape:

{
  "title": "Article headline (compelling, under 80 chars)",
  "slug": "url-safe-slug-matching-title",
  "category": "one of: homebuying|investing|market-analysis|agents-industry|property-types|local-markets",
  "excerpt": "2-3 sentence teaser, under 280 chars",
  "body": "Full article text, 600-900 words. Use ## for section headers and plain paragraphs. No bullet lists."
}

Rules:
- Title must be specific and newsworthy, not generic
- Excerpt should hook the reader immediately
- Body must open with a strong lede paragraph, use 3-4 ## subheadings, and end with a clear takeaway
- Write in an authoritative but accessible tone — think WSJ meets Bigger Pockets`

    const message = await client.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: 2048,
      thinking: { type: 'adaptive' },
      messages: [{ role: 'user', content: prompt }],
    })

    const textBlock = message.content.find((b) => b.type === 'text')
    if (!textBlock || textBlock.type !== 'text') {
      return NextResponse.json({ error: 'No text response from Claude' }, { status: 500 })
    }

    let parsed: any
    try {
      // Strip any accidental markdown fences
      const clean = textBlock.text.replace(/^```(?:json)?\n?/m, '').replace(/\n?```$/m, '').trim()
      parsed = JSON.parse(clean)
    } catch {
      return NextResponse.json({ error: 'Failed to parse Claude response as JSON', raw: textBlock.text }, { status: 500 })
    }

    // Strip any leaked meta-labels from the body (e.g. "Meta: ..." or "**Body:**\n...")
    const rawBody: string = (parsed.body ?? '').replace(/^(\*\*[^*]+\*\*|[A-Z][a-z]+(?: [A-Z][a-z]+)?):[ \t]*/m, '').trim()
    const body = textToPortableText(rawBody)

    // Strip any leaked AI meta-labels like "**Suggested Meta Description:** ..."
    const rawExcerpt: string = parsed.excerpt ?? ''
    const cleanExcerpt = rawExcerpt.replace(/^\*\*[^*]+\*\*:?\s*/i, '').trim()

    return NextResponse.json({
      title: parsed.title ?? '',
      slug: slugify(parsed.slug ?? parsed.title ?? ''),
      category: CATEGORIES.includes(parsed.category) ? parsed.category : (categoryHint ?? 'homebuying'),
      excerpt: cleanExcerpt,
      body,
    })
  } catch (err: any) {
    console.error('generate-article error:', err)
    return NextResponse.json({ error: err.message ?? 'Unknown error' }, { status: 500 })
  }
}
