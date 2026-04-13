import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Submission Received — The Closing Column',
  description: 'Your guest post submission has been received and payment confirmed.',
}

export default function SubmitSuccessPage() {
  return (
    <section className="min-h-[60vh] flex items-center justify-center px-4 py-24">
      <div className="max-w-lg w-full text-center">
        {/* Check icon */}
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1
          className="text-slate-900 text-3xl sm:text-4xl font-serif font-bold mb-4"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Submission Received
        </h1>

        <p className="text-slate-600 font-sans text-lg mb-3">
          Payment confirmed. Your guest post is in the review queue.
        </p>

        <p className="text-slate-500 font-sans text-sm mb-10 max-w-sm mx-auto">
          You&apos;ll receive a confirmation email shortly. Editorial review begins within one business day — we&apos;ll be in touch if we have any questions.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-6 py-2.5 bg-[#0F172A] hover:bg-slate-700 text-white font-sans font-semibold text-sm rounded transition-colors duration-200"
          >
            Back to Home
          </Link>
          <Link
            href="/guidelines"
            className="px-6 py-2.5 border border-slate-300 hover:border-slate-400 text-slate-700 font-sans font-semibold text-sm rounded transition-colors duration-200"
          >
            Review Guidelines
          </Link>
        </div>
      </div>
    </section>
  )
}
