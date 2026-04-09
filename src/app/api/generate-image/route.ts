import { GoogleGenAI } from '@google/genai'
import { createClient } from '@sanity/client'
import { NextRequest, NextResponse } from 'next/server'
import sharp from 'sharp'

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_AI_API_KEY! })

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_WRITE_TOKEN!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2026-04-08',
  useCdn: false,
})

const CATEGORY_CONTEXT: Record<string, string> = {
  homebuying: 'house hunting, suburban neighborhoods, front doors, moving boxes, mortgage paperwork',
  investing: 'rental properties, urban skylines, apartment buildings, ROI spreadsheets, city high-rises',
  'market-analysis': 'city skylines, neighborhood aerial views, housing developments, economic activity',
  'agents-industry': 'open houses, real estate offices, for-sale signs, handshakes, professional meetings',
  'property-types': 'condos, townhomes, single-family homes, architectural details, building facades',
  'local-markets': 'city neighborhoods, local streets, community parks, downtown districts, landmarks',
}

const VISUAL_DIRECTIONS = [
  'Aerial drone shot looking down at a neighborhood, golden hour light casting long shadows across rooftops',
  'Ground-level street perspective with shallow depth of field, a single home sharp in the foreground, street blurring behind',
  'Minimalist sun-drenched interior — white walls, large windows, hardwood floors, no people',
  'Close-up architectural detail: a front door, brick facade, iron railing, or stone steps — abstract and textural',
  'Wide establishing shot from across the street, overcast sky giving even soft light, mature trees framing the scene',
  'Dusk exterior with warm interior lights glowing through windows against a deep blue evening sky',
  'Overhead flat-lay of a desk with a blueprint, keys, and coffee — clean and editorial',
  'Rooftop terrace looking out over a city skyline at sunset, foreground in soft focus',
  'Rain-wet city street reflecting building lights, urban real estate context, cinematic mood',
  'Bright open kitchen with island and pendant lights, no people, architectural digest style',
  'Suburban cul-de-sac from a low angle in autumn, orange leaves on the ground and trees',
  'Modern glass building facade shot from below, geometric patterns, blue sky reflection',
]

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

export async function POST(req: NextRequest) {
  try {
    const { title, excerpt, category } = await req.json()

    const categoryCtx = CATEGORY_CONTEXT[category] ?? 'real estate, property, housing'
    const visualDirection = pick(VISUAL_DIRECTIONS)

    const prompt = `A single unified editorial photograph for a real estate publication article. One scene, one composition — not a collage, not a grid, not multiple photos side by side.

Article title: "${title}"
${excerpt ? `Article summary: "${excerpt}"` : ''}
Subject matter: ${categoryCtx}

Visual direction: ${visualDirection}

Style requirements:
- Single cohesive scene filling the entire frame
- Professional, magazine-quality photography
- No text, logos, watermarks, or graphic overlays
- No people unless essential to the scene
- Think a single establishing shot from Bloomberg Real Estate or WSJ House of the Day`

    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt,
      config: {
        numberOfImages: 1,
        aspectRatio: '16:9',
        outputMimeType: 'image/jpeg',
      },
    })

    const imageBytes = response.generatedImages?.[0]?.image?.imageBytes
    if (!imageBytes) {
      return NextResponse.json({ error: 'No image returned from Imagen' }, { status: 500 })
    }

    // Strip all EXIF / XMP / AI-origin metadata, then re-encode cleanly
    const rawBuffer = Buffer.from(imageBytes, 'base64')
    const cleanBuffer = await sharp(rawBuffer)
      .jpeg({ quality: 88 })  // re-encoding without .withMetadata() drops all EXIF/XMP
      .toBuffer()

    // Build a natural-sounding filename from the article title
    const filename = title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .slice(0, 72)
      .concat('.jpg')

    const asset = await sanity.assets.upload('image', cleanBuffer, {
      filename,
      contentType: 'image/jpeg',
    })

    return NextResponse.json({ assetId: asset._id })
  } catch (err: any) {
    console.error('generate-image error:', err)
    return NextResponse.json({ error: err.message ?? 'Unknown error' }, { status: 500 })
  }
}
