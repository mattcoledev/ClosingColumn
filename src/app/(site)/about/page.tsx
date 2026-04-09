import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About & Editorial Policy',
  description:
    'Learn about The Closing Column — its founding mission, editorial standards, and commitment to independent real estate journalism.',
}

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-[#0F172A] py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-amber-400 text-sm font-sans font-semibold uppercase tracking-widest mb-4">
            The Publication
          </p>
          <h1
            className="text-white text-4xl sm:text-5xl font-serif font-bold mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            About The Closing Column
          </h1>
          <p className="text-slate-300 font-sans text-lg leading-relaxed">
            Real estate coverage built for practitioners — not press releases.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 space-y-14">

        {/* Mission */}
        <section>
          <h2
            className="text-slate-900 text-2xl font-serif font-bold mb-5"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Our Mission
          </h2>
          <div className="space-y-4 text-slate-700 font-sans text-base leading-relaxed">
            <p>
              The Closing Column is a trade publication covering the business of real estate — homebuying, investing, market analysis, and the operational realities of working in the industry. We publish content that assumes readers already know what a cap rate is.
            </p>
            <p>
              We exist because most real estate content on the internet is written for two audiences: complete beginners who need to know what a mortgage is, and SEO bots that reward keyword repetition over insight. Neither is particularly useful if you&apos;re a rental investor trying to understand a shifting rate environment, or an agent navigating post-settlement commission structures.
            </p>
            <p>
              The Closing Column is built for that gap — real analysis, real data, real authors who work in the industry they write about.
            </p>
          </div>
        </section>

        {/* Content Focus */}
        <section>
          <h2
            className="text-slate-900 text-2xl font-serif font-bold mb-5"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            What We Cover
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { cat: 'Homebuying', desc: 'The full buyer journey — from financing strategy through closing. We don\'t write "here\'s how to find a real estate agent." We write about what actually matters: inspection contingencies, rate lock timing, and when to walk.' },
              { cat: 'Investing', desc: 'Rental properties, REITs, flips, and commercial. We\'re interested in the actual numbers — cap rates, cash-on-cash return, market-specific vacancy rates — not listicles about "why real estate is a good investment."' },
              { cat: 'Market Analysis', desc: 'We cover national and regional trends through the lens of data. Fed decisions, inventory analysis, regional affordability — always with a "so what?" that connects macro movements to on-the-ground decisions.' },
              { cat: 'Agents & Industry', desc: 'Commission structures, NAR developments, brokerage operations, and the tech tools agents actually use. Coverage for industry professionals, not consumers.' },
              { cat: 'Property Types', desc: 'Comparisons, trade-offs, and analysis across asset classes: single-family, multifamily, commercial, condos, land, and luxury.' },
              { cat: 'Local Markets', desc: 'Metro-level market spotlights and relocation guides grounded in actual MLS data, census information, and on-the-ground reporting from local practitioners.' },
            ].map((item) => (
              <div key={item.cat} className="bg-slate-50 border border-slate-200 rounded-lg p-5">
                <h3 className="font-sans font-semibold text-slate-900 text-sm mb-2">{item.cat}</h3>
                <p className="text-slate-600 text-sm font-sans leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Editorial Team */}
        <section>
          <h2
            className="text-slate-900 text-2xl font-serif font-bold mb-5"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Editorial Team
          </h2>
          <div className="space-y-6">
            <div className="flex gap-5 bg-white border border-slate-200 rounded-lg p-5">
              <div className="w-14 h-14 bg-slate-200 rounded-full flex-shrink-0 flex items-center justify-center">
                <svg className="w-7 h-7 text-slate-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-sans font-semibold text-slate-900 text-base mb-0.5">Matt Cole</h3>
                <p className="text-slate-500 text-xs font-sans mb-2 uppercase tracking-wider">Editor-in-Chief</p>
                <p className="text-slate-600 text-sm font-sans leading-relaxed">
                  Matt Cole is the founder of ColeWebSolutions and the editor behind The Closing Column. He launched this publication to fill a gap in real estate media — credible, data-driven content for professionals, not just first-time buyers. He oversees all editorial decisions, submission reviews, and the overall content direction of the publication.
                </p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
              <h3 className="font-sans font-semibold text-slate-900 text-sm mb-2">Contributing Authors</h3>
              <p className="text-slate-600 text-sm font-sans leading-relaxed">
                The Closing Column publishes work from verified real estate practitioners, investors, analysts, and attorneys. Contributors are listed on each article with a professional bio. We build contributor profiles from actual published authors — no fabricated personas.
              </p>
            </div>
          </div>
        </section>

        {/* Editorial Policy */}
        <section>
          <h2
            className="text-slate-900 text-2xl font-serif font-bold mb-5"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Editorial Independence Statement
          </h2>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 space-y-4 text-sm text-slate-700 font-sans leading-relaxed">
            <p>
              The Closing Column accepts paid guest post placements as part of its business model. <strong>All paid placements are clearly marked as sponsored content.</strong> Paid links carry <code className="bg-amber-100 px-1 rounded text-xs">rel=sponsored</code> attributes in compliance with Google&apos;s guidelines.
            </p>
            <p>
              Editorial content — articles researched and produced by our staff and contributors — is published independently of advertiser relationships. Paid placement does not influence editorial coverage, topic selection, or the positions taken in independent articles.
            </p>
            <p>
              We reject guest post submissions that do not meet our editorial standards, regardless of the package purchased. Payment is for access to the editorial process, not for guaranteed publication.
            </p>
          </div>
        </section>

        {/* Contact */}
        <section>
          <h2
            className="text-slate-900 text-2xl font-serif font-bold mb-5"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Contact
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
              <h3 className="font-sans font-semibold text-slate-900 text-sm mb-2">Editorial Inquiries</h3>
              <p className="text-slate-600 text-sm font-sans leading-relaxed mb-3">
                For editorial questions, corrections, or press inquiries:
              </p>
              <p className="text-amber-700 font-sans text-sm font-medium">editorial@closingcolumn.com</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
              <h3 className="font-sans font-semibold text-slate-900 text-sm mb-2">Guest Post Submissions</h3>
              <p className="text-slate-600 text-sm font-sans leading-relaxed mb-3">
                For guest post submissions and advertising inquiries:
              </p>
              <Link
                href="/pricing"
                className="inline-block text-amber-700 font-sans text-sm font-medium hover:text-amber-600 transition-colors cursor-pointer"
              >
                Submit via our pricing page &rarr;
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
