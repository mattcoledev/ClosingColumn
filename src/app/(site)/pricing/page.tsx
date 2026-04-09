import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Pricing & Submit',
  description:
    'Submit your guest post to The Closing Column. Three packages starting at $89. Fast turnaround, editorial review, and a permanent dofollow backlink.',
}

const packages = [
  {
    name: 'Standard',
    price: '$89',
    turnaround: '5 business days',
    value: 'standard',
    features: [
      'Up to 1,000 words',
      '1 link (rel=sponsored)',
      'Author bio with photo',
      'Category placement',
      'Internal link integration',
    ],
    highlight: false,
  },
  {
    name: 'Premium',
    price: '$139',
    turnaround: '3 business days',
    value: 'premium',
    features: [
      'Up to 1,500 words',
      '2 links (rel=sponsored)',
      'Author bio with photo',
      'Social share on publication',
      'Priority review queue',
    ],
    highlight: true,
  },
  {
    name: 'Featured',
    price: '$199',
    turnaround: '2 business days',
    value: 'featured',
    features: [
      'Up to 2,000 words',
      '2 links (rel=sponsored)',
      'Homepage Editor\'s Pick (7 days)',
      'Author bio with photo',
      'Social share + priority queue',
    ],
    highlight: false,
  },
]

export default function PricingPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-[#0F172A] py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-amber-400 text-sm font-sans font-semibold uppercase tracking-widest mb-4">
            Get Published
          </p>
          <h1
            className="text-white text-4xl sm:text-5xl font-serif font-bold mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Select a Package &amp; Submit
          </h1>
          <p className="text-slate-300 font-sans text-lg max-w-xl mx-auto">
            Choose your tier below, then complete the submission form. Payment is collected at submission — we begin review immediately.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14">

        {/* Step 1: Pricing cards */}
        <div className="mb-4">
          <p className="text-slate-500 text-xs font-sans font-semibold uppercase tracking-widest mb-6">
            Step 1 — Choose your package
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`rounded-xl border p-6 flex flex-col relative ${
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
                  <h2 className="text-slate-900 font-sans font-bold text-lg mb-1">{pkg.name}</h2>
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
                {/* Anchor link scrolls buyer to the form with that package pre-labelled */}
                <a
                  href={`#submission-form`}
                  data-package={pkg.value}
                  className={`block w-full text-center px-4 py-2.5 font-sans font-semibold text-sm rounded transition-colors duration-200 cursor-pointer ${
                    pkg.highlight
                      ? 'bg-amber-600 hover:bg-amber-500 text-white'
                      : 'bg-[#0F172A] hover:bg-slate-700 text-white'
                  }`}
                >
                  Select {pkg.name}
                </a>
              </div>
            ))}
          </div>

          {/* Compact comparison table as secondary reference */}
          <details className="bg-slate-50 border border-slate-200 rounded-lg">
            <summary className="px-5 py-3 text-sm font-sans font-semibold text-slate-700 cursor-pointer hover:text-slate-900 select-none">
              Compare packages in detail
            </summary>
            <div className="overflow-x-auto px-5 pb-5">
              <table className="w-full text-sm font-sans border-collapse mt-3">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-2 pr-6 font-semibold text-slate-600 text-xs uppercase tracking-wider">Feature</th>
                    <th className="text-center py-2 px-4 font-semibold text-slate-700">Standard</th>
                    <th className="text-center py-2 px-4 font-semibold text-amber-700">Premium</th>
                    <th className="text-center py-2 px-4 font-semibold text-slate-700">Featured</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    ['Word count', 'Up to 1,000', 'Up to 1,500', 'Up to 2,000'],
                    ['Links', '1', '2', '2'],
                    ['Turnaround', '5 days', '3 days', '2 days'],
                    ['Author bio', '✓', '✓', '✓'],
                    ['Social share', '—', '✓', '✓'],
                    ['Homepage feature', '—', '—', '7 days'],
                    ['Priority queue', '—', '✓', '✓'],
                  ].map(([feature, std, prem, feat]) => (
                    <tr key={feature}>
                      <td className="py-2 pr-6 text-slate-600">{feature}</td>
                      <td className="py-2 px-4 text-center text-slate-700">{std}</td>
                      <td className="py-2 px-4 text-center text-slate-700">{prem}</td>
                      <td className="py-2 px-4 text-center text-slate-700">{feat}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 my-10">
          <div className="flex-1 h-px bg-slate-200" />
          <p className="text-slate-400 text-xs font-sans font-semibold uppercase tracking-widest flex-shrink-0">
            Step 2 — Submit your content
          </p>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        {/* Step 2: Submission Form */}
        <div id="submission-form" className="bg-white border border-slate-200 rounded-xl p-8">
          <h2
            className="text-slate-900 text-2xl font-serif font-bold mb-2"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Submission Form
          </h2>
          <p className="text-slate-500 text-sm font-sans mb-8">
            Complete all required fields. Payment is processed at submission via Stripe. You&apos;ll receive a confirmation email within minutes.
          </p>

          <form className="space-y-6" action="#" method="POST" aria-label="Guest post submission form">
            {/* Package selection (radio — mirrors the cards above) */}
            <fieldset>
              <legend className="block text-slate-900 font-sans font-semibold text-sm mb-3">
                Selected Package <span className="text-red-500" aria-hidden="true">*</span>
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {packages.map((pkg) => (
                  <label
                    key={pkg.value}
                    htmlFor={`pkg-${pkg.value}`}
                    className="flex items-center gap-3 border border-slate-200 rounded-lg p-4 cursor-pointer hover:border-amber-400 hover:bg-amber-50 transition-colors duration-200 has-[:checked]:border-amber-500 has-[:checked]:bg-amber-50"
                  >
                    <input
                      type="radio"
                      id={`pkg-${pkg.value}`}
                      name="package"
                      value={pkg.value}
                      className="accent-amber-600 cursor-pointer"
                    />
                    <div>
                      <p className="font-sans font-semibold text-slate-900 text-sm">{pkg.name}</p>
                      <p className="font-sans text-slate-500 text-xs">{pkg.price} &middot; {pkg.turnaround}</p>
                    </div>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Contact info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-name" className="block font-sans font-semibold text-slate-900 text-sm mb-1.5">
                  Your Name <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="contactName"
                  required
                  autoComplete="name"
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg font-sans text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Jane Smith"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block font-sans font-semibold text-slate-900 text-sm mb-1.5">
                  Email Address <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="contactEmail"
                  required
                  autoComplete="email"
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg font-sans text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="jane@youragency.com"
                />
              </div>
            </div>

            {/* Article info */}
            <div>
              <label htmlFor="article-title" className="block font-sans font-semibold text-slate-900 text-sm mb-1.5">
                Article Title <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <input
                type="text"
                id="article-title"
                name="articleTitle"
                required
                className="w-full px-3 py-2.5 border border-slate-300 rounded-lg font-sans text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="e.g. How to Analyze a Rental Property in 2026"
              />
            </div>

            {/* Article content */}
            <div>
              <label htmlFor="article-content" className="block font-sans font-semibold text-slate-900 text-sm mb-1.5">
                Article Content <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <p className="text-slate-500 text-xs font-sans mb-2">
                Paste your article below. Use blank lines between paragraphs. Indicate headings with a leading # character (e.g., # Section Heading).
              </p>
              <textarea
                id="article-content"
                name="articleContent"
                required
                rows={14}
                className="w-full px-3 py-2.5 border border-slate-300 rounded-lg font-sans text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-y"
                placeholder="# Your First Section Heading&#10;&#10;Your first paragraph here...&#10;&#10;# Another Section&#10;&#10;Your next paragraph..."
              />
              <p className="text-slate-400 text-xs font-sans mt-1">Or upload a .docx file instead.</p>
            </div>

            {/* DOCX upload */}
            <div>
              <label htmlFor="docx-upload" className="block font-sans font-semibold text-slate-900 text-sm mb-1.5">
                Upload .docx (Optional Alternative)
              </label>
              <input
                type="file"
                id="docx-upload"
                name="docxFile"
                accept=".docx"
                className="w-full text-sm text-slate-600 font-sans file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer"
              />
            </div>

            {/* Link details */}
            <div className="bg-slate-50 rounded-lg p-5 border border-slate-200 space-y-4">
              <h3 className="font-sans font-semibold text-slate-900 text-sm">Link Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="target-url" className="block font-sans font-semibold text-slate-700 text-xs mb-1.5">
                    Target URL <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <input
                    type="url"
                    id="target-url"
                    name="targetUrl"
                    required
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-sans text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="https://yoursite.com/page"
                  />
                </div>
                <div>
                  <label htmlFor="anchor-text" className="block font-sans font-semibold text-slate-700 text-xs mb-1.5">
                    Anchor Text <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <input
                    type="text"
                    id="anchor-text"
                    name="anchorText"
                    required
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-sans text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="e.g. real estate investing tips"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="anchor-placement" className="block font-sans font-semibold text-slate-700 text-xs mb-1.5">
                  Preferred Anchor Placement (Optional)
                </label>
                <textarea
                  id="anchor-placement"
                  name="anchorPlacement"
                  rows={2}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-sans text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                  placeholder="e.g. Place in the second paragraph when discussing rental property ROI."
                />
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                required
                className="mt-0.5 accent-amber-600 cursor-pointer"
              />
              <label htmlFor="terms" className="text-slate-600 text-sm font-sans leading-relaxed cursor-pointer">
                I understand that payment is processed at submission, all links will carry <code className="bg-slate-100 px-1 rounded text-xs">rel=sponsored</code>, and refunds are not issued for editorial rejections. I have read the{' '}
                <Link href="/guidelines" className="text-amber-700 hover:text-amber-600 underline">Guest Post Guidelines</Link>.
              </label>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 bg-amber-600 hover:bg-amber-500 text-white font-sans font-semibold rounded transition-colors duration-200 cursor-pointer"
              >
                Continue to Payment &rarr;
              </button>
              <p className="text-slate-400 text-xs font-sans mt-3">
                Secure payment powered by Stripe. You&apos;ll receive a confirmation email within minutes.
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
