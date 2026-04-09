import Link from 'next/link'

export default function CTABanner() {
  return (
    <section className="bg-[#0F172A] py-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-amber-400 text-sm font-sans font-semibold uppercase tracking-widest mb-3">
          Guest Post Placements
        </p>
        <h2
          className="text-white text-3xl sm:text-4xl font-serif font-bold mb-4 leading-tight"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Want to be featured in The Closing Column?
        </h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-xl mx-auto font-sans">
          Reach an engaged real estate audience. Earn a high-quality backlink from an editorial publication built for the niche.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/write-for-us"
            className="inline-flex items-center justify-center px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white font-sans font-semibold rounded transition-colors duration-200 cursor-pointer"
          >
            View Submission Guidelines
          </Link>
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center px-6 py-3 border border-white/30 hover:border-white/60 text-white font-sans font-medium rounded transition-colors duration-200 cursor-pointer"
          >
            See Pricing &amp; Submit
          </Link>
        </div>
      </div>
    </section>
  )
}
