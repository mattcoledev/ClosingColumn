import Link from 'next/link'
import Image from 'next/image'
import { categories } from '@/lib/data'

interface Article {
  slug: string
  title: string
  excerpt: string
  category: string
  author: { name: string } | null
  publishedAt: string
  readTime: number
  featured?: boolean
  coverImage?: { url: string; alt?: string } | null
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
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function ArticleCard({ article, size = 'normal' }: { article: Article; size?: 'normal' | 'large' }) {
  const catLabel = categories.find((c) => c.slug === article.category)?.label ?? article.category
  const colorClass = categoryColorMap[article.category] ?? 'bg-slate-100 text-slate-800'

  if (size === 'large') {
    return (
      <article className="group bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col h-full">
        {/* Cover image or gradient placeholder */}
        <div className="relative h-48 bg-gradient-to-br from-slate-800 to-slate-900 flex items-end p-4">
          {article.coverImage?.url && (
            <Image
              src={article.coverImage.url}
              alt={article.coverImage.alt ?? article.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          )}
          <span className={`relative z-10 text-xs font-sans font-semibold px-2 py-1 rounded ${colorClass}`}>
            {catLabel}
          </span>
        </div>
        <div className="p-6 flex flex-col flex-1">
          <Link href={`/articles/${article.slug}`} className="flex-1">
            <h2
              className="font-serif text-xl font-bold text-slate-900 group-hover:text-amber-700 transition-colors duration-200 leading-tight mb-3"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {article.title}
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-4">{article.excerpt}</p>
          </Link>
          <div className="flex items-center gap-3 pt-4 border-t border-slate-100 text-xs text-slate-500 font-sans">
            <span className="font-medium text-slate-700">{article.author?.name ?? 'Guest Author'}</span>
            <span>&middot;</span>
            <span>{formatDate(article.publishedAt)}</span>
            <span>&middot;</span>
            <span>{article.readTime} min read</span>
          </div>
        </div>
      </article>
    )
  }

  return (
    <article className="group flex gap-4 py-5 border-b border-slate-100 last:border-0 cursor-pointer">
      {/* Thumbnail for list view */}
      {article.coverImage?.url && (
        <div className="relative w-20 h-20 flex-shrink-0 rounded overflow-hidden bg-slate-100">
          <Image
            src={article.coverImage.url}
            alt={article.coverImage.alt ?? article.title}
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <span className={`inline-block text-xs font-sans font-semibold px-2 py-0.5 rounded mb-2 ${colorClass}`}>
          {catLabel}
        </span>
        <Link href={`/articles/${article.slug}`}>
          <h3
            className="font-serif text-base font-bold text-slate-900 group-hover:text-amber-700 transition-colors duration-200 leading-snug mb-1.5"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {article.title}
          </h3>
        </Link>
        <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed mb-2">{article.excerpt}</p>
        <div className="flex items-center gap-2 text-xs text-slate-400 font-sans">
          <span>{article.author?.name ?? 'Guest Author'}</span>
          <span>&middot;</span>
          <span>{formatDate(article.publishedAt)}</span>
        </div>
      </div>
    </article>
  )
}
