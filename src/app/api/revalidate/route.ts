import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

// Called by a Sanity webhook on document publish/unpublish.
// Sanity webhook URL: https://yourdomain.com/api/revalidate?secret=<SANITY_REVALIDATE_SECRET>
export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }

  // Revalidate all content pages
  revalidatePath('/', 'layout')

  return NextResponse.json({ revalidated: true, at: new Date().toISOString() })
}
