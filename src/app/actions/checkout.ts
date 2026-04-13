'use server'

import Stripe from 'stripe'
import { redirect } from 'next/navigation'

const PACKAGES = {
  standard: { name: 'Standard Guest Post — The Closing Column', price: 8900 },
  premium:  { name: 'Premium Guest Post — The Closing Column',  price: 13900 },
  featured: { name: 'Featured Guest Post — The Closing Column', price: 19900 },
} as const

export async function createCheckoutSession(formData: FormData) {
  const pkg          = (formData.get('package')          ?? '') as string
  const contactName  = (formData.get('contactName')      ?? '') as string
  const contactEmail = (formData.get('contactEmail')     ?? '') as string
  const articleTitle = (formData.get('articleTitle')     ?? '') as string
  const articleContent = (formData.get('articleContent') ?? '') as string
  const targetUrl    = (formData.get('targetUrl')        ?? '') as string
  const anchorText   = (formData.get('anchorText')       ?? '') as string
  const anchorPlacement = (formData.get('anchorPlacement') ?? '') as string

  if (!pkg || !(pkg in PACKAGES)) {
    throw new Error('Please select a package before submitting.')
  }

  const selected = PACKAGES[pkg as keyof typeof PACKAGES]
  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: 'usd',
          unit_amount: selected.price,
          product_data: { name: selected.name },
        },
      },
    ],
    customer_email: contactEmail || undefined,
    success_url: `${origin}/submit/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url:  `${origin}/pricing`,
    metadata: {
      package:       pkg,
      contactName:   contactName.slice(0, 500),
      contactEmail:  contactEmail.slice(0, 500),
      articleTitle:  articleTitle.slice(0, 500),
      targetUrl:     targetUrl.slice(0, 500),
      anchorText:    anchorText.slice(0, 500),
      anchorPlacement: anchorPlacement.slice(0, 500),
      // Article content is stored truncated here; full content arrives via webhook
      articlePreview: articleContent.slice(0, 490),
    },
  })

  redirect(session.url!)
}
