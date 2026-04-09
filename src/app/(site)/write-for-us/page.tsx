import type { Metadata } from 'next'
import Link from 'next/link'
import { testimonials, faqs } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Write For Us',
  description:
    'Get published on The Closing Column. Reach a niche real estate audience and earn an editorial-quality backlink. Guest post packages starting at $89.',
}

const packages = [
  {
    name: 'Standard',
    price: '$89',
    turnaround: '5 business days',
    features: [
      'Up to 1,000 words',
      '1 dofollow link (rel=sponsored)',
      'Author bio with photo',
      'Category placement',
      'Internal link integration',
    ],
    cta: 'Get Started',
    highlight: false,
  },
  {
    name: 'Premium',
    price: '$139',
    turnaround: '3 business days',
    features: [
      'Up to 1,500 words',
      '2 links (rel=sponsored)',
      'Author bio with photo',
      'Social share on publication',
      'Category placement',
      'Priority review queue',
    ],
    cta: 'Get Started',
    highlight: true,
  },
  {
    name: 'Featured',
    price: '$199',
    turnaround: '2 business days',
    features: [
      'Up to 2,000 words',
      '2 links (rel=sponsored)',
      'Homepage Editor\'s Pick (7 days)',
      'Author bio with photo',
      'Social share on publication',
      'Priority review queue',
    ],
    cta: 'Get Started',
    highlight: false,
  },
]

export default function WriteForUsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0F172A] py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-amber-400 text-sm font-sans font-semibold uppercase tracking-widest mb-4">
            Get Published
          </p>
          <h1
            className="text-white text-4xl sm:text-5xl font-serif font-bold leading-tight mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Write For The Closing Column
          </h1>
          <p className="text-slate-300 text-xl font-sans leading-relaxed max-w-2xl mx-auto mb-8">
            Get your content published on an editorial real estate publication. Reach a highly targeted audience and earn a legitimate, niche backlink.
          </p>
          <Link
            href="/pricing"
            className="inline-flex items-center px-8 py-3 bg-amber-600 hover:bg-amber-500 text-white font-sans font-semibold rounded transition-colors duration-200 cursor-pointer"
          >
            View Pricing & Submit
          </Link>
        </div>
      </section>

      {/* Domain Stats Bar */}
      <div className="bg-slate-900 border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 py-5 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          {[
            { label: 'Niche', value: 'Real Estate' },
            { label: 'Domain Rating', value: 'Growing' },
            { label: 'Categories', value: '6 Topics' },
            { label: 'Turnaround', value: '2–5 Days' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-white font-sans font-bold text-lg">{stat.value}</p>
              <p className="text-slate-400 text-xs font-sans uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        {/* Why publish with us */}
        <section className="mb-16">
          <h2
            className="text-slate-900 text-3xl font-serif font-bold mb-8 text-center"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Why The Closing Column?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Editorial Quality',
                body: 'Every submission goes through a real editorial review. We reject thin content — which is exactly why links from this domain carry value.',
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: 'Niche Relevance',
                body: '100% real estate content. Your link is embedded in topically relevant, category-matched editorial content — not a generic blog.',
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Fast Turnaround',
                body: 'Standard posts reviewed within 5 business days. Premium and Featured slots are prioritized even further.',
              },
            ].map((card) => (
              <div key={card.title} className="bg-slate-50 border border-slate-200 rounded-lg p-6">
                <div className="w-10 h-10 bg-[#0F172A] text-white rounded-lg flex items-center justify-center mb-4">
                  {card.icon}
                </div>
                <h3 className="text-slate-900 font-sans font-semibold text-base mb-2">{card.title}</h3>
                <p className="text-slate-600 text-sm font-sans leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="mb-16">
          <h2
            className="text-slate-900 text-3xl font-serif font-bold mb-3 text-center"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Submission Packages
          </h2>
          <p className="text-slate-500 text-center font-sans text-base mb-10 max-w-lg mx-auto">
            All packages include editorial review, publication on ClosingColumn.com, and a permanent author bio.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`rounded-lg border p-6 flex flex-col relative ${
                  pkg.highlight
                    ? 'border-amber-400 bg-amber-50 shadow-lg'
                    : 'border-slate-200 bg-white'
                }`}
              >
                {pkg.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-xs font-sans font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Most Popular
                  </span>
                )}
                <div className="mb-5">
                  <h3 className="text-slate-900 font-sans font-bold text-lg mb-1">{pkg.name}</h3>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-4xl font-sans font-bold text-slate-900">{pkg.price}</span>
                    <span className="text-slate-500 text-sm font-sans">per post</span>
                  </div>
                  <p className="text-slate-500 text-xs font-sans">{pkg.turnaround} turnaround</p>
                </div>
                <ul className="space-y-2.5 mb-6 flex-1">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm font-sans text-slate-700">
                      <svg className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/pricing?package=${pkg.name.toLowerCase()}`}
                  className={`block w-full text-center px-4 py-2.5 font-sans font-semibold text-sm rounded transition-colors duration-200 cursor-pointer ${
                    pkg.highlight
                      ? 'bg-amber-600 hover:bg-amber-500 text-white'
                      : 'bg-[#0F172A] hover:bg-slate-700 text-white'
                  }`}
                >
                  {pkg.cta}
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-slate-400 text-sm font-sans mt-6">
            Pricing reflects our current DR range. Rates increase as the domain grows.
          </p>
        </section>

        {/* Editorial Standards */}
        <section className="mb-16 bg-slate-50 rounded-xl p-8 border border-slate-200">
          <h2
            className="text-slate-900 text-2xl font-serif font-bold mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            What We Publish
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <h3 className="text-emerald-700 font-sans font-semibold text-sm uppercase tracking-wider mb-3">We Accept</h3>
              <ul className="space-y-2">
                {[
                  'Original real estate content with a clear angle',
                  'Minimum 800 words (1,200–2,000 preferred)',
                  'Articles aligned with our 6 content categories',
                  'Content with a named author and 2–3 sentence bio',
                  '1–2 links per post to real estate-adjacent destinations',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-slate-700 font-sans">
                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-red-600 font-sans font-semibold text-sm uppercase tracking-wider mb-3">We Reject</h3>
              <ul className="space-y-2">
                {[
                  'AI-generated boilerplate ("In today\'s fast-paced...")',
                  'Duplicate or previously published content',
                  'Thin promotional content with no editorial value',
                  'Off-niche topics (crypto, general finance, lifestyle)',
                  'Casino, pharma, CBD, or adult verticals — no exceptions',
                  'Posts with more than 2 links',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-slate-700 font-sans">
                    <svg className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-slate-200">
            <Link href="/guidelines" className="text-amber-700 font-sans text-sm font-semibold hover:text-amber-600 transition-colors cursor-pointer">
              Read full Guest Post Guidelines &rarr;
            </Link>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-16">
          <h2
            className="text-slate-900 text-2xl font-serif font-bold mb-8 text-center"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            What Clients Say
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white border border-slate-200 rounded-lg p-6">
                <div className="flex mb-3" aria-label={`5 out of 5 stars`}>
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-slate-700 text-sm font-sans leading-relaxed mb-4 italic">&ldquo;{t.text}&rdquo;</p>
                <div>
                  <p className="text-slate-900 font-sans font-semibold text-sm">{t.name}</p>
                  <p className="text-slate-500 text-xs font-sans">{t.company} &middot; {t.package} Package</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2
            className="text-slate-900 text-2xl font-serif font-bold mb-8 text-center"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Frequently Asked Questions
          </h2>
          <div className="max-w-2xl mx-auto divide-y divide-slate-200">
            {faqs.map((faq) => (
              <div key={faq.question} className="py-5">
                <h3 className="text-slate-900 font-sans font-semibold text-base mb-2">{faq.question}</h3>
                <p className="text-slate-600 font-sans text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="bg-[#0F172A] rounded-xl p-10 text-center">
          <h2
            className="text-white text-3xl font-serif font-bold mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Ready to Get Published?
          </h2>
          <p className="text-slate-300 font-sans text-lg mb-8 max-w-md mx-auto">
            Choose a package, submit your content, and we&apos;ll have a decision within your turnaround window.
          </p>
          <Link
            href="/pricing"
            className="inline-flex items-center px-8 py-3 bg-amber-600 hover:bg-amber-500 text-white font-sans font-semibold rounded transition-colors duration-200 cursor-pointer"
          >
            Select a Package & Submit
          </Link>
        </div>
      </div>
    </>
  )
}
