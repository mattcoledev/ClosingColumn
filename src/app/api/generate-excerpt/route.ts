import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

function portableTextToPlain(blocks: any[]): string {
  if (!Array.isArray(blocks)) return ''
  return blocks
    .filter((b) => b._type === 'block')
    .map((b) => b.children?.map((c: any) => c.text ?? '').join('') ?? '')
    .filter(Boolean)
    .join('\n\n')
    .slice(0, 3000) // cap to avoid burning tokens on huge articles
}

export async function POST(req: NextRequest) {
  try {
    const { title, body } = await req.json()

    const bodyText = portableTextToPlain(body ?? [])

    if (!title && !bodyText) {
      return NextResponse.json({ error: 'Article has no title or body yet' }, { status: 400 })
    }

    const prompt = `Write a 2–3 sentence excerpt for the following real estate article. The excerpt should hook the reader and summarise what they will learn — no fluff, no meta labels, just the excerpt text itself.

Title: ${title ?? '(untitled)'}

${bodyText ? `Article body:\n${bodyText}` : ''}

Return only the excerpt text, nothing else.`

    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 400,
      messages: [{ role: 'user', content: prompt }],
    })

    const textBlock = message.content.find((b) => b.type === 'text')
    if (!textBlock || textBlock.type !== 'text') {
      return NextResponse.json({ error: 'No response from Claude' }, { status: 500 })
    }

    const raw = textBlock.text
      .replace(/^\*\*[^*]+\*\*:?\s*/i, '') // strip any leaked label
      .trim()

    const excerpt = raw.length > 300 ? raw.slice(0, 297).trimEnd() + '…' : raw

    return NextResponse.json({ excerpt })
  } catch (err: any) {
    console.error('generate-excerpt error:', err)
    return NextResponse.json({ error: err.message ?? 'Unknown error' }, { status: 500 })
  }
}
