import { createClient } from 'next-sanity'

function getWriteClient() {
  return createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET!,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2026-04-08',
    useCdn: false,
    token: process.env.SANITY_API_WRITE_TOKEN,
  })
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 96)
}

export async function createSubmissionDraft(
  meta: Record<string, string>,
  stripeSessionId: string
) {
  const client = getWriteClient()

  const slug = slugify(meta.articleTitle ?? stripeSessionId)

  await client.create({
    _type: 'guestPost',
    title: meta.articleTitle ?? '(untitled)',
    slug: { _type: 'slug', current: slug },
    reviewStatus: 'pending',
    paymentStatus: 'paid',
    stripePaymentId: stripeSessionId,
    package: meta.package,
    submittedBy: {
      name: meta.contactName ?? '',
      email: meta.contactEmail ?? '',
    },
    targetUrl: meta.targetUrl ?? '',
    anchorText: meta.anchorText ?? '',
    anchorPlacement: meta.anchorPlacement ?? '',
    rawSubmission: meta.articlePreview ?? '',
    category: 'homebuying', // default — editor assigns correct category in studio
  })
}
