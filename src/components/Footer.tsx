import Link from 'next/link'
import { categories } from '@/lib/data'

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] text-slate-400 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="group inline-block mb-4">
              <span
                className="text-white font-serif text-2xl font-semibold group-hover:text-amber-300 transition-colors duration-200"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                The Closing Column
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              A real estate trade publication committed to editorial quality. We cover homebuying, investing, market analysis, and the business of real estate.
            </p>
            <p className="text-xs mt-4 text-slate-500">
              © {new Date().getFullYear()} The Closing Column. All rights reserved.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white text-sm font-sans font-semibold uppercase tracking-widest mb-4">
              Topics
            </h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="text-sm hover:text-white transition-colors duration-200 cursor-pointer"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Site links */}
          <div>
            <h3 className="text-white text-sm font-sans font-semibold uppercase tracking-widest mb-4">
              Publication
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/write-for-us" className="text-sm hover:text-white transition-colors duration-200 cursor-pointer">
                  Write For Us
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm hover:text-white transition-colors duration-200 cursor-pointer">
                  Pricing & Submit
                </Link>
              </li>
              <li>
                <Link href="/guidelines" className="text-sm hover:text-white transition-colors duration-200 cursor-pointer">
                  Guest Post Guidelines
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm hover:text-white transition-colors duration-200 cursor-pointer">
                  About & Editorial Policy
                </Link>
              </li>
            </ul>
            <div className="mt-8">
              <p className="text-xs text-slate-500 leading-relaxed">
                Paid placements are clearly marked and do not influence editorial content.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
