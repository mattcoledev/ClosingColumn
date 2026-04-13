import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { sanityFetch } from '@/sanity/lib/live'
import { client } from '@/sanity/lib/client'
import { ARTICLE_QUERY, ARTICLE_SLUGS_QUERY, RELATED_ARTICLES_QUERY } from '@/sanity/lib/queries'
import { articles as mockArticles, categories } from '@/lib/data'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  // Use direct client (no draftMode) for build-time static param generation
  const data = await client.withConfig({ useCdn: false }).fetch(ARTICLE_SLUGS_QUERY)
  const sanitySlugSet = new Set((data ?? []).map((d: any) => d.slug))
  const mockSlugs = mockArticles.map((a) => ({ slug: a.slug })).filter((s) => !sanitySlugSet.has(s.slug))
  return [...(data ?? []), ...mockSlugs]
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const { data } = await sanityFetch({ query: ARTICLE_QUERY, params: { slug } })
  const mock = mockArticles.find((a) => a.slug === slug)
  const post = data ?? mock
  if (!post) return {}
  return { title: post.title, description: post.excerpt }
}

const serif = "'Playfair Display', Georgia, serif"

const bodyComponents = {
  block: {
    normal: ({ children, index }: any) =>
      index === 0 ? (
        <p className="text-slate-700 leading-[1.8] mb-6 text-[1.0625rem] [&::first-letter]:text-[3.5rem] [&::first-letter]:font-bold [&::first-letter]:float-left [&::first-letter]:leading-[0.82] [&::first-letter]:mr-[0.06em] [&::first-letter]:mt-[0.05em] [&::first-letter]:text-slate-900 [&::first-letter]:font-serif">
          {children}
        </p>
      ) : (
        <p className="text-slate-700 leading-[1.8] mb-6 text-[1.0625rem]">{children}</p>
      ),
    h2: ({ children }: any) => (
      <h2 className="text-slate-900 text-2xl sm:text-[1.625rem] font-bold mt-14 mb-4 leading-snug pb-3 border-b border-slate-100" style={{ fontFamily: serif }}>
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-slate-900 text-xl font-bold mt-10 mb-3 leading-snug" style={{ fontFamily: serif }}>
        {children}
      </h3>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="relative border-l-4 border-amber-500 pl-6 pr-4 py-3 my-10 bg-amber-50/60 rounded-r-lg">
        <p className="text-slate-700 text-lg italic leading-relaxed m-0">{children}</p>
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-semibold text-slate-900">{children}</strong>,
    em: ({ children }: any) => <em className="italic text-slate-600">{children}</em>,
    link: ({ value, children }: any) => (
      <a
        href={value?.href}
        className="text-amber-700 underline underline-offset-2 hover:text-amber-600 transition-colors"
        target={value?.blank ? '_blank' : undefined}
        rel={value?.blank ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="my-6 space-y-2 pl-6 list-disc marker:text-amber-500">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="my-6 space-y-2 pl-6 list-decimal marker:text-slate-400 marker:font-semibold">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => <li className="text-slate-700 leading-[1.75] text-[1.0625rem]">{children}</li>,
    number: ({ children }: any) => <li className="text-slate-700 leading-[1.75] text-[1.0625rem]">{children}</li>,
  },
}

const categoryColorMap: Record<string, string> = {
  homebuying: 'bg-sky-100 text-sky-800',
  investing: 'bg-emerald-100 text-emerald-800',
  'market-analysis': 'bg-orange-100 text-orange-800',
  'agents-industry': 'bg-violet-100 text-violet-800',
  'property-types': 'bg-rose-100 text-rose-800',
  'local-markets': 'bg-blue-100 text-blue-800',
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params

  const { data: article } = await sanityFetch({ query: ARTICLE_QUERY, params: { slug } })
  const mock = mockArticles.find((a) => a.slug === slug)
  const post = article ?? mock
  if (!post) notFound()

  const { data: relatedData } = await sanityFetch({
    query: RELATED_ARTICLES_QUERY,
    params: { slug, category: post.category },
  })
  const relatedArticles = relatedData?.length
    ? relatedData
    : mockArticles.filter((a) => a.slug !== slug && a.category === post.category).slice(0, 3)

  const catLabel = categories.find((c) => c.slug === post.category)?.label ?? post.category
  const colorClass = categoryColorMap[post.category] ?? 'bg-slate-100 text-slate-800'

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    author: { '@type': 'Person', name: post.author?.name },
    publisher: { '@type': 'Organization', name: 'The Closing Column', url: 'https://closingcolumn.com' },
    datePublished: post.publishedAt,
    url: `https://closingcolumn.com/articles/${slug}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Article Header */}
      <div className="bg-[#0F172A] py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-5">
            <Link href={`/category/${post.category}`} className={`text-xs font-sans font-semibold px-2.5 py-1 rounded cursor-pointer ${colorClass}`}>
              {catLabel}
            </Link>
            {post.readTime > 0 && <span className="text-slate-400 text-xs font-sans">{post.readTime} min read</span>}
          </div>
          <h1
            className="text-white text-3xl sm:text-4xl lg:text-5xl font-serif font-bold leading-tight mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {post.title}
          </h1>
          {post.excerpt && <p className="text-slate-300 font-sans text-lg leading-relaxed mb-8">{post.excerpt}</p>}
          <div className="flex items-center gap-4 pt-5 border-t border-white/10">
            <div className="w-10 h-10 rounded-full flex-shrink-0 overflow-hidden bg-slate-600">
              {post.author?.avatar ? (
                <Image src={post.author.avatar} alt={post.author.name ?? ''} width={40} height={40} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center" aria-hidden="true">
                  <svg className="w-5 h-5 text-slate-300" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>
                </div>
              )}
            </div>
            <div>
              <p className="text-white font-sans font-semibold text-sm">{post.author?.name ?? 'Guest Author'}</p>
              {post.publishedAt && <p className="text-slate-400 text-xs font-sans">{formatDate(post.publishedAt)}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Cover image */}
      {post.coverImage?.url && (
        <div className="relative w-full max-w-3xl mx-auto h-72 sm:h-96 overflow-hidden">
          <Image
            src={post.coverImage.url}
            alt={post.coverImage.alt ?? post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-14">
          <article className="min-w-0">
            {post.body ? (
              <div className="article-body">
                <PortableText value={post.body} components={bodyComponents} />
              </div>
            ) : (
              <div className="space-y-5 text-slate-700 font-sans text-base leading-relaxed">
                <p className="text-lg text-slate-800">{post.excerpt}</p>
                <p>Full article content will render here from Sanity Portable Text once the body is composed in Studio.</p>
                <h2 className="text-slate-900 text-2xl font-serif font-bold mt-8 mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Key Takeaways</h2>
                <ul className="list-disc list-inside space-y-2 pl-2">
                  <li>Market conditions vary significantly by metro — always analyze local data before making decisions</li>
                  <li>The relationship between interest rates and home prices is more nuanced than headline coverage suggests</li>
                  <li>Investors and buyers who understand the data have a structural advantage in any market cycle</li>
                </ul>
              </div>
            )}

            {/* Author bio */}
            <div className="mt-12 bg-slate-50 border border-slate-200 rounded-xl p-6 flex gap-5">
              <div className="w-14 h-14 rounded-full flex-shrink-0 overflow-hidden bg-slate-200">
                {post.author?.avatar ? (
                  <Image src={post.author.avatar} alt={post.author.name ?? ''} width={56} height={56} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center" aria-hidden="true">
                    <svg className="w-7 h-7 text-slate-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>
                  </div>
                )}
              </div>
              <div>
                <p className="text-slate-500 text-xs font-sans uppercase tracking-wider mb-0.5">About the Author</p>
                <h3 className="font-sans font-semibold text-slate-900 text-base mb-1">{post.author?.name ?? 'Guest Author'}</h3>
                <p className="text-slate-600 text-sm font-sans leading-relaxed">{post.author?.bio}</p>
              </div>
            </div>

            <div className="mt-10 bg-[#0F172A] rounded-xl p-7 text-center">
              <p className="text-white font-sans font-medium mb-1">Want to be featured in The Closing Column?</p>
              <p className="text-slate-400 text-sm font-sans mb-4">Submit your real estate content and reach our niche audience.</p>
              <Link href="/write-for-us" className="inline-flex items-center px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white font-sans font-semibold text-sm rounded transition-colors duration-200 cursor-pointer">
                See Submission Guidelines &rarr;
              </Link>
            </div>
          </article>

          <aside>
            <div className="sticky top-24 bg-slate-50 border border-slate-200 rounded-lg p-5">
              <h3 className="text-slate-900 font-serif font-bold text-base mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                More in {catLabel}
              </h3>
              {relatedArticles.length > 0 ? (
                <ul className="space-y-4">
                  {relatedArticles.map((rel: any) => (
                    <li key={rel.slug} className="border-b border-slate-200 last:border-0 pb-4 last:pb-0">
                      <Link href={`/articles/${rel.slug}`} className="group">
                        <p className="text-slate-900 font-sans text-sm font-medium group-hover:text-amber-700 transition-colors cursor-pointer leading-snug">{rel.title}</p>
                        <p className="text-slate-400 text-xs font-sans mt-1">{rel.author?.name}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-slate-500 text-sm font-sans">More articles coming soon.</p>
              )}
            </div>
          </aside>
        </div>
      </div>

      {relatedArticles.length > 0 && (
        <div className="border-t border-slate-200 bg-slate-50 py-12 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-slate-900 text-2xl font-serif font-bold mb-8" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Related Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedArticles.map((rel: any) => (
                <Link key={rel.slug} href={`/articles/${rel.slug}`} className="group bg-white border border-slate-200 rounded-lg p-5 hover:shadow-md transition-shadow cursor-pointer">
                  <span className={`inline-block text-xs font-sans font-semibold px-2 py-0.5 rounded mb-3 ${colorClass}`}>{catLabel}</span>
                  <h3 className="text-slate-900 font-serif font-bold text-base group-hover:text-amber-700 transition-colors leading-snug mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{rel.title}</h3>
                  <p className="text-slate-500 text-xs font-sans">{rel.author?.name}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
