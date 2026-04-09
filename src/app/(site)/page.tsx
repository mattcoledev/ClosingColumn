import Link from 'next/link'
import ArticleCard from '@/components/ArticleCard'
import CTABanner from '@/components/CTABanner'
import { categories, articles as mockArticles } from '@/lib/data'
import { sanityFetch } from '@/sanity/lib/live'
import {
  FEATURED_ARTICLES_QUERY,
  RECENT_ARTICLES_QUERY,
  EDITORS_PICK_QUERY,
  ARTICLE_COUNT_QUERY,
} from '@/sanity/lib/queries'

export default async function HomePage() {
  const [
    { data: featuredData },
    { data: recentData },
    { data: editorsPick },
    { data: articleCount },
  ] = await Promise.all([
    sanityFetch({ query: FEATURED_ARTICLES_QUERY }),
    sanityFetch({ query: RECENT_ARTICLES_QUERY }),
    sanityFetch({ query: EDITORS_PICK_QUERY }),
    sanityFetch({ query: ARTICLE_COUNT_QUERY }),
  ])

  // Fall back to mock data while Sanity is empty
  const featuredArticles = featuredData?.length ? featuredData : mockArticles.filter((a) => a.featured)
  const recentArticles = recentData?.length
    ? recentData.filter((a: any) => !featuredArticles.some((f: any) => f.slug === a.slug)).slice(0, 5)
    : mockArticles.filter((a) => !a.featured).slice(0, 5)

  const publishedCount = articleCount ?? 0

  return (
    <>
      {/* Hero / Masthead */}
      <section className="bg-[#0F172A] pt-12 pb-10 px-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-amber-400 text-xs font-sans font-semibold uppercase tracking-widest mb-4">
            Volume 1 &middot; April 2026
          </p>
          <h1
            className="text-white text-4xl sm:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Real Estate Insights<br className="hidden sm:block" /> That Move the Market
          </h1>
          <p className="text-slate-300 text-lg sm:text-xl font-sans max-w-2xl mx-auto mb-8 leading-relaxed">
            Editorial coverage of homebuying, investing, market analysis, and the business of real estate — written by practitioners, not press releases.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="px-4 py-1.5 text-sm font-sans font-medium text-slate-300 border border-white/20 rounded-full hover:border-amber-400 hover:text-amber-300 transition-colors duration-200 cursor-pointer"
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap justify-center sm:justify-start gap-6 sm:gap-10">
          {[
            { value: publishedCount > 0 ? `${publishedCount}+` : '40+', label: 'Articles Published' },
            { value: '6', label: 'Content Categories' },
            { value: 'DR Growing', label: 'Domain Authority' },
            { value: 'Trusted by', label: 'SEO Agencies & Real Estate Brands' },
          ].map((stat) => (
            <div key={stat.label} className="flex items-baseline gap-2">
              <span className="text-slate-900 font-sans font-bold text-sm">{stat.value}</span>
              <span className="text-slate-500 text-xs font-sans">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Featured Articles */}
            <div className="mb-10">
              <h2
                className="text-slate-900 text-2xl font-serif font-bold mb-6"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Featured
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredArticles.slice(0, 3).map((article: any) => (
                  <ArticleCard key={article.slug} article={article} size="large" />
                ))}
              </div>
            </div>

            {/* Editor's Pick Banner — only shown when toggled in Sanity */}
            {editorsPick && (
              <div className="mb-10 bg-amber-50 border border-amber-200 rounded-lg p-5 flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <div>
                  <p className="text-amber-800 text-xs font-sans font-bold uppercase tracking-wider mb-1">Editor&apos;s Pick</p>
                  <Link href={`/articles/${editorsPick.slug}`}>
                    <h3
                      className="text-slate-900 text-lg font-serif font-bold leading-snug hover:text-amber-700 transition-colors cursor-pointer"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      {editorsPick.title}
                    </h3>
                  </Link>
                  <p className="text-slate-600 text-sm mt-1 font-sans">
                    By {editorsPick.author?.name} &middot; {categories.find((c) => c.slug === editorsPick.category)?.label}
                  </p>
                </div>
              </div>
            )}

            {/* Recent Articles */}
            <div>
              <h2
                className="text-slate-900 text-2xl font-serif font-bold mb-4"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Recent Articles
              </h2>
              <div className="divide-y divide-slate-100">
                {recentArticles.map((article: any) => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-[#0F172A] text-white rounded-lg p-6 mb-8">
              <p className="text-amber-400 text-xs font-sans font-semibold uppercase tracking-wider mb-2">
                Get Published
              </p>
              <h3
                className="text-xl font-serif font-bold mb-3 leading-snug"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Get Published in The Closing Column
              </h3>
              <p className="text-slate-300 text-sm font-sans leading-relaxed mb-5">
                Reach a niche real estate audience and earn a high-quality editorial backlink. Starting at $89.
              </p>
              <Link
                href="/write-for-us"
                className="block w-full text-center px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-sans font-semibold text-sm rounded transition-colors duration-200 cursor-pointer"
              >
                Learn More
              </Link>
            </div>

            <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
              <h3
                className="text-slate-900 text-lg font-serif font-bold mb-4"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Browse by Topic
              </h3>
              <ul className="space-y-1">
                {categories.map((cat) => (
                  <li key={cat.slug}>
                    <Link
                      href={`/category/${cat.slug}`}
                      className="flex items-center justify-between py-2 px-3 rounded hover:bg-slate-100 text-slate-700 hover:text-slate-900 text-sm font-sans transition-colors cursor-pointer group"
                    >
                      <span>{cat.label}</span>
                      <svg className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>

      <CTABanner />
    </>
  )
}
