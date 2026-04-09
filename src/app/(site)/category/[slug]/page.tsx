import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ArticleCard from '@/components/ArticleCard'
import { sanityFetch } from '@/sanity/lib/live'
import { CATEGORY_ARTICLES_QUERY } from '@/sanity/lib/queries'
import { articles as mockArticles, categories } from '@/lib/data'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const category = categories.find((c) => c.slug === slug)
  if (!category) return {}
  return {
    title: `${category.label} — Real Estate Articles`,
    description: category.description,
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params
  const category = categories.find((c) => c.slug === slug)
  if (!category) notFound()

  const { data: liveArticles } = await sanityFetch({
    query: CATEGORY_ARTICLES_QUERY,
    params: { category: slug },
  })

  const categoryArticles = liveArticles?.length
    ? liveArticles
    : mockArticles.filter((a) => a.category === slug)

  return (
    <>
      {/* Header */}
      <section className="bg-[#0F172A] py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-4 text-slate-400 text-xs font-sans">
            <Link href="/" className="hover:text-white transition-colors cursor-pointer">Home</Link>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-slate-300">{category.label}</span>
          </div>
          <h1
            className="text-white text-4xl sm:text-5xl font-serif font-bold mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {category.label}
          </h1>
          <p className="text-slate-300 font-sans text-lg max-w-2xl leading-relaxed">
            {category.description}
          </p>
        </div>
      </section>

      {/* Category nav strip */}
      <div className="bg-slate-50 border-b border-slate-200 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 py-3 flex gap-2">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className={`flex-shrink-0 px-4 py-1.5 text-sm font-sans font-medium rounded-full transition-colors duration-200 cursor-pointer ${
                cat.slug === slug
                  ? 'bg-[#0F172A] text-white'
                  : 'text-slate-600 border border-slate-300 hover:border-slate-500 hover:text-slate-900'
              }`}
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {categoryArticles.length > 0 ? (
          <>
            <div className="flex items-baseline justify-between mb-8">
              <h2
                className="text-slate-900 text-xl font-serif font-bold"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {categoryArticles.length} {categoryArticles.length === 1 ? 'Article' : 'Articles'} in {category.label}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryArticles.map((article: any) => (
                <ArticleCard key={article.slug} article={article} size="large" />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2" />
              </svg>
            </div>
            <h2 className="text-slate-900 text-xl font-serif font-bold mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              No articles yet
            </h2>
            <p className="text-slate-500 font-sans text-sm mb-6">
              We&apos;re building out our {category.label} coverage. Check back soon.
            </p>
            <Link href="/" className="inline-flex items-center px-4 py-2 bg-[#0F172A] text-white font-sans font-semibold text-sm rounded hover:bg-slate-700 transition-colors cursor-pointer">
              Back to Homepage
            </Link>
          </div>
        )}

        {/* Contribute CTA */}
        <div className="mt-16 bg-slate-50 border border-slate-200 rounded-xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-slate-900 text-xl font-serif font-bold mb-1" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Write about {category.label}?
            </h3>
            <p className="text-slate-600 font-sans text-sm">
              Submit a guest post on this topic and get published in The Closing Column.
            </p>
          </div>
          <Link
            href="/write-for-us"
            className="flex-shrink-0 inline-flex items-center px-5 py-2.5 bg-[#0F172A] hover:bg-slate-700 text-white font-sans font-semibold text-sm rounded transition-colors duration-200 cursor-pointer"
          >
            Submit a Guest Post
          </Link>
        </div>
      </div>
    </>
  )
}
