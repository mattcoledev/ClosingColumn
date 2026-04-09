'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { categories } from '@/lib/data'

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-[#0F172A] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top bar */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-tight group">
            <span
              className="text-white font-serif text-xl font-semibold tracking-tight group-hover:text-amber-300 transition-colors duration-200"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              The Closing Column
            </span>
            <span className="text-slate-400 text-xs font-sans tracking-widest uppercase">
              Real Estate Insights
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary navigation">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className={`px-3 py-1.5 text-sm font-sans font-medium rounded transition-colors duration-200 cursor-pointer
                  ${pathname === `/category/${cat.slug}`
                    ? 'text-amber-300 bg-white/10'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
              >
                {cat.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/write-for-us"
              className="hidden sm:inline-flex items-center px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white text-sm font-sans font-semibold rounded transition-colors duration-200 cursor-pointer"
            >
              Write For Us
            </Link>
            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <nav className="lg:hidden pb-4 border-t border-white/10 mt-0 pt-4" aria-label="Mobile navigation">
            <div className="flex flex-col gap-1">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  onClick={() => setMenuOpen(false)}
                  className="px-3 py-2 text-sm font-sans text-slate-300 hover:text-white hover:bg-white/10 rounded transition-colors cursor-pointer"
                >
                  {cat.label}
                </Link>
              ))}
              <Link
                href="/write-for-us"
                onClick={() => setMenuOpen(false)}
                className="mt-2 px-3 py-2 bg-amber-600 hover:bg-amber-500 text-white text-sm font-sans font-semibold rounded transition-colors cursor-pointer text-center"
              >
                Write For Us
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
