import type { Metadata } from 'next'
import Link from 'next/link'
import { categories } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Guest Post Guidelines',
  description:
    'Editorial standards and submission requirements for The Closing Column. Read before submitting to ensure your article meets our quality criteria.',
}

export default function GuidelinesPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-[#0F172A] py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-amber-400 text-sm font-sans font-semibold uppercase tracking-widest mb-4">
            Editorial Standards
          </p>
          <h1
            className="text-white text-4xl sm:text-5xl font-serif font-bold mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Guest Post Guidelines
          </h1>
          <p className="text-slate-300 font-sans text-lg leading-relaxed">
            Read these guidelines before submitting. Articles that don&apos;t meet these standards are rejected without refund.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
        <div className="prose-like space-y-12">

          {/* Accepted Topics */}
          <section>
            <h2
              className="text-slate-900 text-2xl font-serif font-bold mb-4"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              1. Accepted Topics
            </h2>
            <p className="text-slate-600 font-sans text-base leading-relaxed mb-4">
              All submitted content must fall within one of our six content categories. Off-topic submissions are rejected automatically.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {categories.map((cat) => (
                <div key={cat.slug} className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                  <h3 className="font-sans font-semibold text-slate-900 text-sm mb-1">{cat.label}</h3>
                  <p className="text-slate-500 text-xs font-sans leading-relaxed">{cat.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Content Quality Requirements */}
          <section>
            <h2
              className="text-slate-900 text-2xl font-serif font-bold mb-4"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              2. Content Quality Requirements
            </h2>
            <ul className="space-y-4">
              {[
                {
                  title: 'Minimum 800 words',
                  body: 'We prefer 1,200–2,000 words for competitive topics. Thin articles under 800 words are rejected regardless of quality.',
                },
                {
                  title: 'Original content only',
                  body: 'Articles must not be published or scheduled to publish anywhere else. We check for duplicate content before editorial review begins.',
                },
                {
                  title: 'A real angle — not a topic summary',
                  body: 'We reject articles that simply describe a topic without providing a specific perspective, data point, or actionable insight. "What is a cap rate?" is a topic. "Why cap rate is useless in high-appreciation markets" is an angle.',
                },
                {
                  title: 'No AI boilerplate',
                  body: 'Articles that open with phrases like "In today\'s fast-paced real estate market..." or rely on obvious AI padding are rejected on sight. Claude-assisted drafts are acceptable if they have been substantially rewritten and fact-checked.',
                },
                {
                  title: 'Factual accuracy',
                  body: 'Real estate content is audited against market data. Wrong numbers — incorrect interest rates, outdated law citations, fabricated statistics — result in rejection and ineligibility for resubmission.',
                },
              ].map((item) => (
                <li key={item.title} className="flex gap-4 bg-white border border-slate-200 rounded-lg p-5">
                  <div className="flex-shrink-0 w-6 h-6 bg-[#0F172A] rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-sans font-semibold text-slate-900 text-sm mb-1">{item.title}</h3>
                    <p className="text-slate-600 text-sm font-sans leading-relaxed">{item.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Link Policy */}
          <section>
            <h2
              className="text-slate-900 text-2xl font-serif font-bold mb-4"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              3. Link Policy
            </h2>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 mb-6">
              <p className="text-amber-900 font-sans text-sm font-semibold mb-1">All paid links carry rel=sponsored</p>
              <p className="text-amber-800 font-sans text-sm leading-relaxed">
                This is non-negotiable. Per Google&apos;s link spam guidelines, paid guest post links must carry the <code className="bg-amber-100 px-1 rounded">rel=sponsored</code> attribute. This is how we protect long-term domain health for all parties.
              </p>
            </div>
            <ul className="space-y-3 text-sm font-sans text-slate-700">
              {[
                '1 link for Standard packages. 2 links for Premium and Featured.',
                'Links must point to real estate adjacent destinations (real estate brands, property tools, investing resources, etc.)',
                'No casino, pharma, CBD, or adult vertical links — these result in immediate rejection and are ineligible for resubmission.',
                'Link placement is at our editorial discretion. Anchor placement notes are considered but not guaranteed.',
                'Exact-match anchor text is accepted as long as it reads naturally in context.',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <svg className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Author Bio Requirements */}
          <section>
            <h2
              className="text-slate-900 text-2xl font-serif font-bold mb-4"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              4. Author Bio Requirements
            </h2>
            <p className="text-slate-600 font-sans text-sm leading-relaxed mb-4">
              Every article must have a named author. Real names are preferred but pen names with consistent identities are accepted.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: 'Name', detail: 'Real name or a consistent pen name used across multiple submissions.' },
                { label: 'Bio', detail: '2–3 sentences. Professional or industry background relevant to the article topic.' },
                { label: 'Headshot', detail: 'Optional but recommended. Real photos preferred. AI-generated headshots will be rejected.' },
              ].map((item) => (
                <div key={item.label} className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                  <h3 className="font-sans font-semibold text-slate-900 text-sm mb-1">{item.label}</h3>
                  <p className="text-slate-500 text-xs font-sans leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm font-sans">
                <strong>Important:</strong> Fabricated author profiles with AI-generated headshots are rejected and the account is flagged for future submissions. Google actively detects fake author entities.
              </p>
            </div>
          </section>

          {/* Rejection Criteria */}
          <section>
            <h2
              className="text-slate-900 text-2xl font-serif font-bold mb-4"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              5. Rejection Criteria
            </h2>
            <p className="text-slate-600 font-sans text-sm leading-relaxed mb-4">
              Articles are rejected (and the submission fee is not refunded) for the following:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                'Duplicate or previously published content',
                'AI-generated boilerplate with no substantial editing',
                'Purely promotional content with no educational value',
                'Off-topic subjects outside the 6 accepted categories',
                'Word count below 800 words',
                'Prohibited link destinations (casino, pharma, CBD, adult)',
                'More links than the package allows',
                'Fabricated statistics or factual errors',
                'Missing or fabricated author information',
                'Content already sold to another publication',
              ].map((item) => (
                <div key={item} className="flex items-start gap-2 text-sm font-sans text-slate-700">
                  <svg className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  {item}
                </div>
              ))}
            </div>
          </section>

          {/* Revision Process */}
          <section>
            <h2
              className="text-slate-900 text-2xl font-serif font-bold mb-4"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              6. Revision Process
            </h2>
            <p className="text-slate-600 font-sans text-sm leading-relaxed">
              If your article is declined for a reason that can be corrected — insufficient word count, a fixable factual error, or a promotional tone that can be adjusted — you may resubmit once within 14 days at no additional charge. Resubmissions after 14 days require a new payment.
            </p>
          </section>

          {/* CTA */}
          <div className="bg-[#0F172A] rounded-xl p-8 text-center">
            <h2
              className="text-white text-2xl font-serif font-bold mb-3"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Ready to Submit?
            </h2>
            <p className="text-slate-300 font-sans text-sm mb-6">
              Choose a package and submit your article. We&apos;ll review within your turnaround window.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-sans font-semibold text-sm rounded transition-colors duration-200 cursor-pointer"
              >
                Submit a Guest Post
              </Link>
              <Link
                href="/write-for-us"
                className="inline-flex items-center justify-center px-6 py-2.5 border border-white/30 hover:border-white/60 text-white font-sans font-medium text-sm rounded transition-colors duration-200 cursor-pointer"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
