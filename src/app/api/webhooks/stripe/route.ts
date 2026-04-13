import Stripe from 'stripe'
import { NextRequest, NextResponse } from 'next/server'
import { sendBuyerConfirmation, sendAdminNotification } from '@/lib/emails'
import { createSubmissionDraft } from '@/lib/sanity-submission'

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
  const body = await req.text()
  const sig  = req.headers.get('stripe-signature')

  if (!sig) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err: any) {
    console.error('Stripe webhook signature verification failed:', err.message)
    return NextResponse.json({ error: `Webhook error: ${err.message}` }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    const meta = (session.metadata ?? {}) as Record<string, string>

    try {
      await Promise.all([
        sendBuyerConfirmation(meta),
        sendAdminNotification(meta, session.amount_total),
        createSubmissionDraft(meta, session.id),
      ])
    } catch (err: any) {
      console.error('Webhook handler error:', err?.message ?? err)
      throw err
    }
  }

  return NextResponse.json({ received: true })
}
